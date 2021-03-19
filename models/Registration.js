const mg = require('mongoose')
const registrationSchema = new mg.Schema({
    name: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    }
})

module.exports = mg.model("Registration", registrationSchema)