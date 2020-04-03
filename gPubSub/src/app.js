const event = require("../mock/payload.json")
require("dotenv").config()

const { PubSub } = require("@google-cloud/pubsub")
const dataBuffer = Buffer.from(JSON.stringify(event.data))

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