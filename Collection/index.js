const { Collection } = require("discord.js");

const antijoin = new Collection(); // key: guildid | value: userid[]

module.exports = { antijoin };