const mongo = require("mongoose");

const Schema = new mongo.Schema({
    Guild: String,
    User: String,
    Reason: String,
    Time: String,
    Nickname: String
});

module.exports = mongo.model("afk", Schema);