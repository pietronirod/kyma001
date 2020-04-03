const dotenv = require("dotenv").config()
console.log(dotenv)

const { produceMessage } = require("./kafka")

const event = {
    data: {
        status: 'created',
        message: 'we have a message'
    }
}

produceMessage(event)