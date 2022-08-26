const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    Guild: String,
    Author: String,
    Orario: String,
    Msg: String,
    Partecipanti: Array
})

module.exports = mongoose.model("sondaggi", Schema);