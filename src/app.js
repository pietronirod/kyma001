const payload = require("../mock/payload.json")
const { PubSub } = require("@google-cloud/pubsub")

require("dotenv").config()

const dataBuffer = Buffer.from(JSON.stringify(payload))

new PubSub({
    projectId: process.env.PROJECT_ID,
    credentials: {
        client_email: process.env.CLIENT_EMAIL,
        private_key: process.env.PRIVATE_KEY
    }
})
.topic(process.env.PUBSUB_TOPIC)
.publish(dataBuffer)
.then(messageId => {
    console.log(`Message ${messageId} published`)
})
.catch(err => {
    console.log('ERROR:', err)
})