const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'say',
    description: 'Fai ripetere al bot un messaggio',
    UserPermissions: ['MANAGE_MESSAGES'],
    timeout: 5000,
    premium: false,
    options: [
      {
        name: 'messaggio',
        description: 'Messaggio da voler far ripetere',
        type: 'STRING',
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
        
      const msg = interaction.options.getString('messaggio')

      interaction.reply({ content: msg, ephemeral: false })
    },
};