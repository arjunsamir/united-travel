const Cloud = require("@google-cloud/storage")
const path = require("path")
const serviceKey = path.join(__dirname, "../../google-credentials.json")

const { Storage } = Cloud
const storage = new Storage({
  keyFilename: serviceKey,
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID
})

module.exports = storage
