const mongoose = require("mongoose")

const Schema = new mongoose.Schema({
    Guild: String,
    Roles: Array,
});

module.exports = mongoose.model("reaction-roles", Schema);