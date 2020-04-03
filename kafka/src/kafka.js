const { KafkaClient, Producer } = require("kafka-node")

const produceMessage = (evt) => {
    const client = new KafkaClient({
        kafkaHost: process.env.KAFKA_HOSTNAME,
        idleConnection: 5000,
        sslOptions: {
            rejectUnauthorized: false
        },
        sasl: {
            mechanism: "plain",
            username: process.env.KAFKA_USERNAME,
            password: process.env.KAFKA_PASSWORD
        },
        requestTimeout: 5000,
    })

    const payloads = [{
        topic: process.env.KAFKA_TOPIC,
        partition:1,
        messages: JSON.stringify(evt.data)
    }]

    const producer = new Producer(client, {
        requireAcks: 0,
        partitionerType: 2
    })
    .on('ready', () => {
        producer.send(payloads, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log(`Message sent.`)
            }
            process.exit()
        })
    })
    .on('error', (err) => {
        console.log(err)
    })
}

exports.produceMessage = produceMessage