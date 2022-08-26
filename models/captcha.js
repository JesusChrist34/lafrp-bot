const mongo = require("mongoose");

const Schema = new mongo.Schema({
    Guild: String,
    Channel: String,
    AddRole: String,
    RemoveRole: String,
    Mode: String,
    Action: String,
    Time: String,
    Status: String,
});

module.exports = mongo.model("captcha", Schema);