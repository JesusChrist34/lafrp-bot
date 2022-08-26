const Discord = require('discord.js')

module.exports = {
    name: "test",
    premium: true,
    timeout: 10000,

    async run(bot, message, args) {
      if(message.author.id !== "844691950799028235") return;

    const test = new Discord.MessageEmbed()
    .setTitle("Test")
    .setDescription("Test molto bello")
    .setColor("RANDOM")
    .setTimestamp()
    message.channel.send({ embeds: [test] })
  }
};