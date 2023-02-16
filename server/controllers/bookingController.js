// Import Node Modules
const fs = require("fs")
const path = require("path")

// Import Models
const Quote = require("../models/quote")
const Credit = require("../models/credit")
const Vehicle = require("../models/vehicle")
const Settings = require("../models/settings")
const Reservation = require("../models/reservation")

// Import Utilities
const send = require("../utils/sendResponse")
const catchAsync = require("../utils/catchAsync")
const sendEmail = require("../utils/sendEmail")
const APIFeatures = require("../utils/apiFeatures")
const uniqid = require("uniqid")
const dayjs = require("dayjs")
require("dayjs/locale/es")

// Initialize Maps Client
const { Client } = require("@googlemaps/google-maps-services-js")
const client = new Client({})

// Initialize Stripe
const stripe = require("stripe")(process.env.STRIPE_SECRET)

// Get Settings on App Load
const settings = {
  promise: Settings.findOne({ active: true }).then((res) => {
    settings.data = res.toObject()
  }),
  fetched: Date.now()
}

// Refresh Settings
const refreshSettings = async () => {
  await settings.promise

  if (Date.now() - settings.fetched > 60000 * 30) {
    settings.promise = Settings.findOne({ active: true }).then(
      (res) => (settings.data = res.toObject())
    )
    await settings.promise
  }

  return settings.data
}

// Geocode Location to retrieve zip codes
const geocode = async (place_id) => {
  const res = await client.geocode({
    params: {
      place_id,
      key: process.env.GOOGLE_MAPS_API_KEY
    }
  })

  if (
    !res ||
    !res.data ||
    !res.data.results ||
    !res.data.results[0] ||
    !res.data.results[0].address_components ||
    !res.data.results[0].address_components.length
  )
    return {
      zip: "99999",
      data: {}
    }

  const zip = res.data.results[0].address_components.filter((c) => {
    if (!c.types || !c.types.length) return null
    const postalType = c.types.find((type) => type === "postal_code")
    return postalType ? c : null
  })[0]

  return {
    zip: zip ? zip.long_name : "99999",
    data: res.data.results[0]
  }
}

// Check if zip is whitelisted
const checkZipList = (origin, destination) => {
  return (
    settings.data.touristZips.filter(
      (zip) => zip === origin || zip === destination
    ).length === 2
  )
}

// Calculate cost of trip
const calculateCost = (vehicle, distance, isTouristZip) => {
  // Destructure Values
  const {
    thresholds: { extended, tourist },
    baseMpg
  } = settings.data
  const { rates, mpg } = vehicle

  // Set Up Variables
  let d = distance
  const multiplier = baseMpg / mpg

  // Set Up Miles Counter
  const miles = {
    total: d,
    under: 0,
    tourist: 0,
    extended: 0
  }

  if (d >= extended) {
    miles.extended = d - extended
    d = extended
  }

  if (d >= tourist) {
    miles.tourist = d - tourist
    d = tourist
  }

  miles.under = d

  const variableCost =
    miles.under * (isTouristZip ? rates.tourist : rates.base) +
    miles.tourist * rates.tourist +
    miles.extended * rates.extended

  const cost = Math.ceil(variableCost * multiplier + rates.fee)

  return {
    cents: cost,
    dollars: (cost / 100).toFixed(2)
  }
}

// Get Stripe User
const getStripeUser = async (user) => {
  // Initialize Mutable variables
  let customer,
    paymentMethods = []

  // Create or Retrieve Customer
  if (user && user.stripeID) {
    customer = await stripe.customers.retrieve(user.stripeID)
  } else if (user) {
    customer = await stripe.customers.create({
      name: user.name,
      email: user.email
    })

    user.stripeID = customer.id
    await user.save()
  }

  // Retrieve Saved Payment Methods
  if (customer) {
    const list = await stripe.paymentMethods.list({
      customer: customer.id,
      type: "card"
    })

    paymentMethods = list.data.map((item) => {
      const { card } = item
      return {
        id: item.id,
        brand: card.brand,
        digits: card.last4,
        expiration: {
          month: card.exp_month,
          year: card.exp_year
        }
      }
    })
  }

  return [customer, paymentMethods]
}

// Get User Credits
const getUserCredits = async (user, cost) => {
  return [0, cost, []]
}

// Determine Refund Eligiblity
const isRefundable = async (date, status) => {
  const settings = await refreshSettings()

  if (!settings.cancellation.allowed || status !== "ready") return false

  const time = dayjs(date, "MM-DD-YYYY H:mm")
  const now = dayjs()

  return now.isBefore(time)
}

// Send Confirmation Email
const sendConfirmationEmail = async (reservation) => {
  const { contact } = await refreshSettings()

  const { user, code, schedule, origin, destination, passengers, payment } =
    reservation
  const locale = user.preferredLocale || "en"

  let pickup = dayjs(schedule.pickup, "MM-DD-YYYY H:mm")
  let dropoff = dayjs(schedule.dropoff, "MM-DD-YYYY H:mm")
  let date

  if (locale === "es") {
    pickup = pickup.locale("es")
    dropoff = dropoff.locale("es")
  }

  await sendEmail({
    to: user.email,
    template: "confirmation",
    locale,
    data: {
      name: user.preferredName || user.name,
      code,
      date: pickup.format("dddd MMMM D, YYYY"),
      pickup: pickup.format("h:mm A"),
      dropoff: dropoff.format("h:mm A"),
      origin: origin.name,
      destination: destination.name,
      passengers: passengers.total,
      total: `$${(payment.total / 100).toFixed(2)}`
    }
  })

  await sendEmail({
    to: contact.notificationEmail,
    template: "confirmation",
    locale: "en",
    data: {
      name: user.preferredName || user.name,
      fullName: user.name,
      email: user.email,
      code,
      date: pickup.format("dddd MMMM D, YYYY"),
      pickup: pickup.format("h:mm A"),
      dropoff: dropoff.format("h:mm A"),
      origin: origin.name,
      destination: destination.name,
      passengers: passengers.total,
      total: `$${(payment.total / 100).toFixed(2)}`
    }
  })
}

// Called By Webhook. Charge Payment
exports.confirmPayment = catchAsync(async (req, res, next) => {
  // Immediately Send Response
  send(res, {
    recieved: true
  })

  if (!req.body.data || !req.body.data.object)
    return console.log("Stripe Webhook failed")

  // Get Intent
  const intent = req.body.data?.object

  // Get Reservation
  const reservation = await Reservation.findOne({
    "payment.intent": intent.id
  }).populate("user")
  if (!reservation) return console.log("No reservation found for this payment")

  // Destructure Shit
  const {
    payment_method_details: { card, type: wallet },
    billing_details: billing,
    payment_method: stripe_id
  } = intent.charges.data[0]

  // Update Reservation
  reservation.payment.status = "paid"
  reservation.payment.method = {
    stripe_id,
    brand: card.brand,
    last4: card.last4,
    wallet: wallet
  }
  reservation.payment.biilling = {
    name: billing.name,
    zip: billing.address.postal_code
  }
  reservation.status = "ready"

  // Update Credits
  await Promise.all(
    reservation.payment.applied_credits.map((credit_id) => {
      return Credit.findByIdAndUpdate(credit_id, { status: "redeemed" })
    })
  )

  // Finally Save Reservation
  await reservation.save()

  // Send The Email
  await sendConfirmationEmail(reservation)
})

// Create Exports
exports.getQuote = catchAsync(async (req, res, next) => {
  // In case settins isn't loaded wait for it
  await refreshSettings()

  // Destructure Params
  const { passengers, origin, destination, distance: meters } = req.body

  // If Params are missing then return
  if (!origin || !destination || !passengers || !meters)
    return res.json({
      status: "ERROR",
      message: "Missimg request data"
    })

  // Retrtieve Vehicles From Database
  const eligibleVehicles = await Vehicle.find({
    active: true,
    seats: { $gte: passengers }
  })

  // Convert Distance To Miles
  const distance = Math.ceil(meters / 1609.34)

  // Geocode Locations
  const geocoded = {}
  await Promise.all([
    geocode(origin).then((data) => (geocoded.origin = data)),
    geocode(destination).then((data) => (geocoded.destination = data))
  ])

  // Check if Zip Codes are Whitelisted
  const isTouristZip = checkZipList(
    geocoded.origin.zip,
    geocoded.destination.zip
  )

  // Get Cost for each Vehicle
  const vehicles = eligibleVehicles.map((vehicle) => {
    return {
      ...vehicle.toObject(),
      cost: calculateCost(vehicle, distance, isTouristZip)
    }
  })

  // Create Quote
  const quote = await Quote.create({
    origin,
    destination,
    distance: meters,
    passengers,
    vehicles: vehicles.map((v) => ({
      vehicle_id: v._id,
      cost: v.cost.cents
    }))
  })

  // Return Response
  res.json({
    status: "SUCCESS",
    vehicles,
    quote: quote.id
  })
})

// Create Reservation & Payment
exports.createPayment = catchAsync(async (req, res, next) => {
  // Destructure Request Object
  const { user, body: r } = req

  // Retrieve Quote
  const quote = await Quote.findById(r.quote)

  // Retrieve Vehicle
  const vehicle = quote.vehicles.find(
    (v) => v.vehicle_id.toString() === r.vehicle
  )

  // Handle Errors
  if (!vehicle) throw new Error("No vehicle found!")

  // Retrieve Cost
  const { cost: sub_total } = vehicle

  // Retrieve Stripe User
  const [customer, paymentMethods] = await getStripeUser(user)

  // Retrieve Credits
  const [credits_total, total, applied_credits] = await getUserCredits(
    user,
    sub_total
  )

  // Prepare Payment Intent Data
  const intentData = {
    amount: total,
    currency: "USD",
    statement_descriptor: "Black Car Service",
    payment_method_types: ["card"]
  }

  // Append Customer
  if (customer) intentData.customer = customer.id

  // Create Payment Intent
  const paymentIntent = await stripe.paymentIntents.create(intentData)

  // Create Reservation
  const reservation = await Reservation.create({
    ...r,
    user: user._id,
    payment: {
      intent: paymentIntent.id,
      status: "pending",
      total,
      sub_total,
      credits_total,
      applied_credits
    },
    status: "pending",
    code: uniqid.time(),
    created_at: Date.now(),
    reminderSent: false
  })

  // Send Response
  send(res, {
    status: "SUCCESS",
    secret: paymentIntent.client_secret,
    paymentMethods,
    sub_total,
    total,
    credits: credits_total,
    code: reservation.code
  })
})

// Issue Refunds
exports.issueRefund = catchAsync(async (req, res, next) => {
  const {
    cancellation: { fees },
    contact
  } = await refreshSettings()

  // Find Reservation
  const reservation = await Reservation.findById(req.body.id).populate(
    "vehicle"
  )

  // Handle Errors
  if (!reservation)
    return send(res, {
      status: "NOT FOUND",
      message: "Reservation not found"
    })

  // Determine Refund Eligibility
  const eligible = await isRefundable(
    reservation.schedule.pickup,
    reservation.status
  )

  // Handle Errors
  if (!eligible)
    return send(res, {
      status: "INELIGIBLE",
      message: "This reservation is not eligible for a refund"
    })

  // Calculate REfund Amount
  const amount = reservation.payment.total * (1 - fees.percent) - fees.flat

  // Create Refund
  const refund = await stripe.refunds.create({
    payment_intent: reservation.payment.intent,
    amount
  })

  // Update Reservation
  reservation.status = "cancelled"
  reservation.payment.status = "refunded"
  reservation.payment.refund = {
    id: refund.id,
    status: refund.status,
    amount: refund.amount,
    date: dayjs().format("MM-DD-YYYY H:mm")
  }

  // TODO: REFUND CREDITS

  // Save Reservation
  await reservation.save()

  // Send Email
  await sendEmail({
    to: req.body.email,
    locale: req.body.locale,
    template: "refund",
    data: {
      name: req.body.name,
      code: reservation.code,
      date: req.body.date
    }
  })

  // Send Response
  send(res, {
    status: "SUCCESS",
    reservation,
    refund
  })

  // TODO: Send Email To Admin
  // sendEmail({
  //     to: contact.notificationEmail,
  //     locale: 'en',
  //     template: 'refund_notification',
  //     data: {

  //     }
  // })
})

// Retrieve Reservations For User
exports.listReservations = catchAsync(async (req, res, next) => {
  const reservations = await Reservation.find({
    user: req.user._id,
    status: { $ne: "pending" }
  })

  send(res, {
    status: "SUCCESS",
    reservations
  })
})

// Get Single Reservation
exports.getReservation = catchAsync(async (req, res, next) => {
  if (!req.user || !req.user._id || !req.params.code)
    return send(res, {
      status: "ERROR"
    })

  const code = req.params.code.replaceAll("-", "")

  const reservation = await Reservation.findOne({
    user: req.user._id,
    code
  }).populate("vehicle")

  send(res, {
    status: "SUCCESS",
    reservation
  })
})

// List Payment Methods
exports.listPaymentMethods = catchAsync(async (req, res, next) => {
  // Get Customer
  const [customer, paymentMethods] = await getStripeUser(req.user)

  // Handle Errors
  if (!customer || !paymentMethods)
    return send(res, {
      status: "ERROR"
    })

  // Return Response
  send(res, {
    status: "SUCCESS",
    paymentMethods,
    credits: req.user.credits
  })
})

// Remove/Detach A Payment Method
exports.deletePaymentMethod = catchAsync(async (req, res, next) => {
  // Detach Payment Method
  const paymentMethod = await stripe.paymentMethods.detach(req.params.method)

  // Retrieve New List of Payment methods
  const [customer, paymentMethods] = await getStripeUser(req.user)

  // Handle Errors
  if (!customer)
    return send(res, {
      status: "ERROR"
    })

  // Send Response
  send(res, {
    status: "SUCCESS",
    paymentMethods,
    paymentMethod
  })
})

// Admin Reservations
exports.getReservations = catchAsync(async (req, res, next) => {
  // Retrieve
  const api = new APIFeatures(Reservation.find({}), req.query)
    .filter()
    .sort()
    .limit()
    .paginate()

  // Wait For Query
  const reservations = await api.query

  // Send Response
  send(res, {
    status: "SUCCESS",
    page: api.page,
    limit: api.docsPerPage,
    reservations
  })
})

// Get Singe Reservation
exports.getOneReservation = catchAsync(async (req, res, next) => {
  const reservation = await Reservation.findById(req.params.id)
    .populate("vehicle")
    .populate("user")

  send(res, {
    status: "SUCCESS",
    reservation
  })
})
