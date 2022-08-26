const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'tell',
    description: 'Fai ripetere al bot un messaggio in formato embed',
    UserPermissions: ['MANAGE_MESSAGES'],
    timeout: 5000,
    premium: false,
    options: [
      {
        name: 'titolo',
        description: 'Titolo dell\'embed',
        type: 'STRING',
        required: true,
      },
      {
        name: 'descrizione',
        description: 'Descrizione dell\'embed',
        type: 'STRING',
        required: true,
      },
      {
        name: 'colore',
        description: 'Colore dell\'embed (hex code)',
        type: 'STRING',
        required: false,
      },
      {
        name: 'footer',
        description: 'Footer dell\'embed',
        type: 'STRING',
        required: false,
      },
      {
        name: 'timestamp',
        description: 'Scegliere se mettere il timestamp o meno',
        type: 'BOOLEAN',
        required: false,
      },
    ],

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (bot, interaction, args) => {

      const titolo = interaction.options.getString('titolo')
      const descrizione = interaction.options.getString('descrizione')
      const colore = interaction.options.getString('colore') || "RANDOM"
      const footer = interaction.options.getString('footer')
      const timestamp = interaction.options.getBoolean('timestamp')

      const embed = new Discord.MessageEmbed()
      .setTitle(titolo)
      .setDescription(descrizione)
      .setColor(colore)

      if(footer) {
        embed.setFooter(footer)
      }
      if(timestamp) {
        embed.setTimestamp()
      }
      interaction.reply({ embeds: [embed] })
    },
};
