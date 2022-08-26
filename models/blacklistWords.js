const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    Guild: String,
    Role: String,
    Status: String,
    Words: Array
})

module.exports = mongoose.model('blacklist-word', Schema)