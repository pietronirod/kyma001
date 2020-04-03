const dotenv = require("dotenv").config()
console.log(dotenv)

const { producer } = require("./producer")
const { consumer } = require("./consumer")

const event = {
    data: {
        status: 'created',
        message: 'we have a message'
    }
}

// producer(event)
consumer()
console.log('....')
