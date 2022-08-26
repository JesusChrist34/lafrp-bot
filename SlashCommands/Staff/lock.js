const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'lock',
    description: 'Blocca il canale in cui viene eseguito il comando',
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
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            reason: "Comando Lock"
        })
        interaction.reply({ content: "**Canale bloccato con successo!**", ephemeral: false })
    }catch(e) {
        console.log(e)
    }
    },
};