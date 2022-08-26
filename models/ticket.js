const mongo = require("mongoose");

const Schema = new mongo.Schema({
    ID: String,
    Number: Number,
    Name: String,
    Guild: String,
    Category: String,
    Role: String,
    Description: String,
    Transcript: String,
    Logs: String,
});

module.exports = mongo.model("ticket", Schema);