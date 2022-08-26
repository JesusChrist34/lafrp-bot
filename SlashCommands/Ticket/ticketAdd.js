const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const Schema = require("../../models/ticket")

module.exports = {
    name: 'ticket-add',
    description: 'Aggiungi un utente ad un ticket',
    timeout: 5000,
    BotPerms: ["MANAGE_CHANNELS"],
    premium: false,
    options: [
      {
        name: 'utente',
        description: 'Utente da voler aggiungere',
        type: 'USER',
        required: true,
      },
    ],

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (bot, interaction, args) => {
        const user = interaction.options.getMember('utente')

        const topic = interaction.channel.topic

        if(!topic) return interaction.reply({ content: "Questo comando può essere utilizzato soltanto all'interno di un ticket!", ephemeral: true })

        if(!topic.startsWith('ID Utente:')) return interaction.reply({ content: "Questo comando può essere utilizzato soltanto all'interno di un ticket!", ephemeral: true })

        const panelID = topic.slice(44)

        const data = await Schema.findOne({ ID: panelID, Guild: interaction.guild.id });
        if(!data) return;

        if(!interaction.member.roles.cache.has(data.Role)) return interaction.reply({ content: "Non hai i permessi necessari per poter aggiungere un utente ad un ticket!", ephemeral: true })

        interaction.channel.permissionOverwrites.create(user.id, { VIEW_CHANNEL: true, SEND_MESSAGES: true }, "Utente aggiunto al ticket", 1)
        interaction.reply(`**Ho aggiunto con successo ${user} al ticket!**`)
    },
};