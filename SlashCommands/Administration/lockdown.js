const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'lockdown',
    description: 'Chiudi tutti i canali del server',
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
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    reason: "Comando Lockdown"
                })
            }catch(e) {
                console.log(e)
                return interaction.channel.send({ content: `**Non è stato possibile chiudere il canale ${channel}**`, ephemeral: true })
            }
        })
    
        interaction.reply({ content: "**Tutti i canali sono stati chiusi con successo.**", ephemeral: false })
    },
};