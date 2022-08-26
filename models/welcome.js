const mongo = require("mongoose");

const Schema = new mongo.Schema({
    Guild: String,
    WelcomeMsg: String,
    Channel: String,
    Status: String,
});

module.exports = mongo.model("welcome", Schema);