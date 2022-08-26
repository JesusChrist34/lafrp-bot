const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    Guild: String,
    User: String,
    Roles: Array,
})

module.exports = mongoose.model('mute', Schema)