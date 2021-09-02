const cron = require('node-cron');

// Import Models
const Reservation = require('../models/reservation');

// Import Helpers
const dayjs = require('dayjs');
const sendEmail = require('./sendEmail');


// Mark Reservations As Complete
const updateReservations = async () => {

    try {

        await Reservation.updateMany({
            status: 'ready',
            scheduledComplete: { $lt: dayjs().add(2, 'hour').toDate() }
        }, {
            $set: { status: 'complete' }
        });


        await Reservation.deleteMany({
            status: 'pending',
            created_at: { $lt: dayjs().subtract(1, 'day').toDate() }
        })

        console.log('Reservations Updated');

    }

    catch(err) {
        console.log(err);
    }

}


// Send Reminder Emails
const sendReminderEmails = async () => {

    try {
        const reservations = await Reservation.find({
            status: 'ready',
            reminderSent: false,
            scheduledComplete: { $gt: dayjs().subtract(2, 'hour').subtract(1, 'day').toDate() }
        }).populate('user');
    }

    catch(err) {
        console.log(err);
    }


};


// Send Daily Admin Report
const sendDailyReport = async () => {

    try {

        const reservations = await Reservation.find({
            status: 'ready',
            scheduledComplete: { $lt: dayjs().add(2, 'hour').add(1, 'day').toDate() }
        })

    }

    catch (err) {
        console.log(err);
    }


};


module.exports = () => {

    // Schedule By The Hour
    cron.schedule('0 * * * *', updateReservations);

}