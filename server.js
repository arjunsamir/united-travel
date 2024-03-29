// 1. IMPORT REQUIRED MODULES

// Import Core Modules
const mongoose = require("mongoose")
const dotenv = require("dotenv")

// 2. IMPORT ENVIORNMENT & START SERVER

// Initialize Enviornment Variables
dotenv.config({ path: "./config.env" })

// Cron Jobs
const cron = require("./server/utils/cron")

// Import Express
const app = require("./app")

// Determine App Port
const port = process.env.PORT || 3000

// Initialize Server
const server = app.listen(port, () => {
  console.log(`✊🏾App running on port ${port}`)
})

// 3. INITIALIZE DATABASE CONNECTION
mongoose
  .connect(process.env.DB, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .catch((err) => console.log(err))
  .then(() => {
    console.log("🙏🏾DB Connection Succesful")
    cron()
  })

// Listen For Errors
process.on("unhandledRejection", (err) => {
  console.log("💥UNHANDLED REJECTION! Shutting down application...")
  console.log(err)
  server.close(() => process.exit(1))
})

// Listen For Restart
process.on("SIGTERM", () => {
  console.log("👏🏾SIGTERM REVIEVED. Shutting down gracefully")
  server.close(() => console.log("👌🏾 Process Terminated!"))
})
