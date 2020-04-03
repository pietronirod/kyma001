const { KafkaClient, Consumer } = require("kafka-node")

const consumer = (messages) => {
    const client = new KafkaClient({
        kafkaHost: process.env.KAFKA_HOSTNAME,
        idleConnection: 5000,
        requestTimeout: 5000,
        sslOptions: {
            rejectUnauthorized: false
        },
        sasl: {
            mechanism: "plain",
            username: process.env.KAFKA_USERNAME,
            password: process.env.KAFKA_PASSWORD
        }
    })

    messages = []
    const topics = [{
        topic: process.env.KAFKA_TOPIC,
        partition: 1
    }]

    const cons = new Consumer(client, topics)

    cons.on('message', (message) => {
        messages.push(message)
        if(message.offset == (message.highWaterOffset - 1)){
            console.log(messages)
        }
    })

    cons.on('error', (err) => {
        console.log(err)
    })
}
module.exports.consumer = consumer