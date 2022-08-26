const mongoose = require('mongoose')

module.exports = mongoose.model(
"reati",
new mongoose.Schema({
    Guild: String,
    User: String,
    Author: String,
    Reato: String,
    Timestamp: String,
  })
);