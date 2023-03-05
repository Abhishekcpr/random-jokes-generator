const mongoose = require('mongoose')
const validator = require('validator')

const jokesSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,

        },

        email: {
            type: String,
            required: true
        },

        joke: {
            type: String,
            required: true
        }
    }
)

const Jokes = new mongoose.model('joke', jokesSchema);
module.exports = Jokes;