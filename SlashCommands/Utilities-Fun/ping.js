const { Client, CommandInteraction } = require("discord.js");
const Discord = require('discord.js')
var uptime = Math.round(new Date().getTime() / 1000)
const db = require("../../models/premium")

module.exports = {
    name: "ping",
    description: "Mostra i ping del bot",
    type: "CHAT_INPUT",
    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {
        let time = Date.now();
        await db.findOne({ Guild: interaction.guild.id })

        const pingembed = new Discord.MessageEmbed()
    .setTitle("**__Ping Generali__**")
    .setDescription(``)
    .addField(`**Ping Bot:**`, `**\`${Date.now() - interaction.createdTimestamp} ms\`**`, true)
    .addField(`**Latenza API:**`, `**\`${Math.round(bot.ws.ping)} ms\`**`, true)
    .addField(`**Ping Database:**`, `**\`${Date.now()-time} ms\`**`, true)
    .addField(`**Avvio Bot:**`, `<t:${uptime}:R>`, true)
    .setColor("RANDOM")
    .setFooter("Ping Calcolati")
    .setTimestamp()
    interaction.reply({ embeds: [pingembed], ephemeral: false })
    }
}