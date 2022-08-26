const mongoose = require('mongoose')

const Schema = new mongoose.Schema({
    Guild: String,
    Msg: String,
    AuthorID: String,
    Author: String,
    AuthorPS4: String,
    User: String,
    UserPS4: String,
    Reason: String,
    Duration: String
})

module.exports = mongoose.model("arresti", Schema);