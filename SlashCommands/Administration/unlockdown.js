const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'unlockdown',
    description: 'Sblocca tutti i canali precendemente bloccati',
    UserPermissions: ['ADMINISTRATOR'],
    BotPerms: ['MANAGE_CHANNELS'],
    timeout: 10000,
    premium: true,

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (bot, interaction, args) => {

    interaction.guild.channels.cache.forEach(channel => {
        try {
            channel.permissionOverwrites.edit(interaction.guild.roles.cache.find(e => e.name.toLowerCase().trim() == "@everyone"), {
                SEND_MESSAGES: true,
                ADD_REACTIONS: true,
                reason: "Comando Unlockdown"
            })
            interaction.reply({ content: "**Tutti i canali del server sono stati sbloccati con successo!**", ephemeral: false })
        }catch(e) {
            console.log(e)
            return interaction.channel.send({ content: `Non è stato possibile sbloccare il canale ${channel}!`, ephemeral: true })
        }
    })
    },
};