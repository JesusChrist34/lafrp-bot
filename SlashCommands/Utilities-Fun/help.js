const { Client, CommandInteraction } = require("discord.js");
const { MessageActionRow, MessageButton } = require('discord.js');
const Discord = require("discord.js")

module.exports = {
    name: "help",
    description: "Mostra tutti i comandi del bot",
    type: "CHAT_INPUT",
    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

        var button1 = new MessageButton()
            .setLabel("Normal Commands")
            .setStyle("PRIMARY")
            .setCustomId("Normal")
            .setEmoji("901404075093024798")
        var button2 = new MessageButton()
            .setLabel("Slash Commands")
            .setStyle("SECONDARY")
            .setCustomId("Slash")
            .setEmoji("916848332645744650")

        var row = new MessageActionRow()
            .addComponents(button1)
            .addComponents(button2)

        const prehome = new Discord.MessageEmbed()
        .setTitle("**__Aiuto Comandi [Pre-Home]__**")
        .setDescription(`**Hey ${interaction.user}, questa è la pre-home dell'aiuto comandi. Con i due bottoni potrai decidere se visualizzare i comandi normali, o i comandi slash del bot!**`)
        .setFooter("Los Angeles Full RP Bot Help System", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
        .setColor("RANDOM")

        interaction.reply({ embeds: [prehome], components: [row], ephemeral: true })
    }
}