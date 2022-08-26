const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'unlock',
    description: 'Sblocca il canale precendemente bloccato in cui viene eseguito il comando',
    UserPermissions: ['MANAGE_CHANNELS'],
    BotPerms: ['MANAGE_CHANNELS'],
    timeout: 5000,
    premium: false,

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (bot, interaction, args) => {

    try {
        interaction.channel.permissionOverwrites.edit(interaction.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
            SEND_MESSAGES: true,
            ADD_REACTIONS: true,
            reason: "Comando Unlock"
        })
        interaction.reply("**Questo canale è stato sbloccato con successo!**")
    } catch(e) {
        console.log(e)
        interaction.reply({ content: "Si è verificato un errore durante l'esecuzione di questo comando!", ephemeral: true })
    }
    },
};