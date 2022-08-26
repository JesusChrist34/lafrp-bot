const mongo = require("mongoose");

const Schema = new mongo.Schema({
    Guild: String,
    Status: String,
    Log: String,
    Action: String,
    Bypass: String,
});

module.exports = mongo.model("anti-bot", Schema);