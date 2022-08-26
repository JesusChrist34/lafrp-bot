const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const Schema = require("../../models/ticket")
const discordTranscripts = require('discord-html-transcripts');

module.exports = {
    name: 'ticket-transcript',
    description: 'Salva un transcript di un ticket',
    timeout: 5000,
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

        if(!interaction.member.roles.cache.has(data.Role)) return interaction.reply({ content: "Non hai i permessi necessari per poter salvare il transcript del ticket!", ephemeral: true })

        if(!data.Transcript) return interaction.reply({ content: "Non è stato possibile salvare il transcript per questo ticket perchè non è stato configurato nessun canale dei transcript!", ephemeral: true })
        
        const attachment = await discordTranscripts.createTranscript(interaction.channel, {
            limit: 10000000,
            returnBuffer: false,
            fileName: 'transcript.html'
        });

        const canale = bot.channels.cache.get(data.Transcript)
        const embed = new Discord.MessageEmbed()
        .setTitle("Transcript Salvato")
        .addField("Autore:", "<@" + interaction.user.id + ">")
        .addField("Categoria:", "<#" + data.Category + ">")
        .addField("Ticket:", "`" + interaction.channel.name + "`")
        .setColor("RANDOM")
        .setFooter("Sistema di Tickets Los Angeles Full RP Bot", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
        canale.send({ embeds: [embed], files: [attachment] })
    
        interaction.reply({ content: "**Il transcript per questo ticket è stato salvato con successo!**" })
    
        if(data.Logs !== "none") {
            const canale = bot.channels.cache.get(data.Logs)
            const embed = new Discord.MessageEmbed()
            .setTitle("Transcript Salvato")
            .setDescription(`**Transcript salvato ed inviato in: <#${data.Transcript}>**`)
            .addField("Autore:", "<@" + interaction.user.id + ">")
            .addField("Categoria:", "<#" + data.Category + ">")
            .addField("Ticket:", "`" + interaction.channel.name + "`")
            .setColor("RANDOM")
            .setFooter("Sistema di Tickets Los Angeles Full RP Bot", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
            canale.send({ embeds: [embed] })
        }
    },
};