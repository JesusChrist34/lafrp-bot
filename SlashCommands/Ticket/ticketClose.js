const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const Schema = require("../../models/ticket")

module.exports = {
    name: 'ticket-close',
    description: 'Chiudi un ticket',
    timeout: 5000,
    BotPerms: ["MANAGE_CHANNELS"],
    premium: false,

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (bot, interaction, args) => {

        const topic = interaction.channel.topic

        if(!topic) return interaction.reply({ content: "Questo comando può essere utilizzato soltanto all'interno di un ticket!", ephemeral: true })

        if(!topic.startsWith('ID Utente:')) return interaction.reply({ content: "Questo comando può essere utilizzato soltanto all'interno di un ticket!", ephemeral: true })

        const panelID = topic.slice(44)

        const data = await Schema.findOne({ ID: panelID, Guild: interaction.guild.id });
        if(!data) return;

        if(!interaction.member.roles.cache.has(data.Role)) return interaction.reply({ content: "Non hai i permessi necessari per poter chiudere il ticket!", ephemeral: true })

        interaction.reply(`**Il ticket verrà eliminato tra 10 secondi.**`)
        setTimeout(() => interaction.channel.delete("Ticket Chiuso"), 10000)
    
        if(data.Logs !== "none") {
        const canale = bot.channels.cache.get(data.Logs)
        const embed = new Discord.MessageEmbed()
        .setTitle("Ticket Chiuso")
        .addField("Autore:", "<@" + interaction.user.id + ">")
        .addField("Categoria:", "<#" + data.Category + ">")
        .addField("Ticket:", "`" + interaction.channel.name + "`")
        .setColor("RANDOM")
        .setFooter("Sistema di Tickets Los Angeles Full RP Bot", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
        canale.send({ embeds: [embed] })
      }
    },
};