const mongo = require("mongoose");

const Schema = new mongo.Schema({
    Guild: String,
    Warns: Number,
    Action: String,
    Delete: String,
    Status: String,
});

module.exports = mongo.model("automod", Schema);