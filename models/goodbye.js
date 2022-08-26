const mongo = require("mongoose");

const Schema = new mongo.Schema({
    Guild: String,
    GoodbyeMsg: String,
    Channel: String,
    Status: String,
});

module.exports = mongo.model("goodbye", Schema);