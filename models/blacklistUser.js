const mongoose = require('mongoose')

let Schema = new mongoose.Schema({
    User: String
})

module.exports = mongoose.model('blacklist-user', Schema)