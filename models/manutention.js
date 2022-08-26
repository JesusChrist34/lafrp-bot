const mongo = require("mongoose");

const Schema = new mongo.Schema({
    Author: String,
    Status: String,
});

module.exports = mongo.model("manutention", Schema);