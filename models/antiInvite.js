const mongo = require("mongoose");

const Schema = new mongo.Schema({
    Guild: String,
    Status: String,
    Ruolo: String,
    Action: String,
});

module.exports = mongo.model("anti-invite", Schema);