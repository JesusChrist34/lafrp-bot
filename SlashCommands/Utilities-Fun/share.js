const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'share',
    description: 'Condividi il tuo nick social club',
    timeout: 10000,
    premium: false,
    options: [
      {
        name: 'nickname',
        description: 'Nickname del tuo account social club',
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
        
      const nick = interaction.options.getString('nickname')

      const share = new Discord.MessageEmbed()
        .setTitle("**__Invito Crew__**")
        .setDescription(`**<a:Caricamento:875018966676955227> Staffer invitate in crew: <a:Caricamento:875018966676955227>\n\n\`${nick}\`**`)
        .setFooter('Sii paziente finchè uno staff non visioni la tua richiesta!', "https://cdn.discordapp.com/attachments/844701498116931604/844856930282242109/1608993751600.png")
        .setColor("GREEN")

        interaction.reply({ embeds: [share], fetchReply: true }).then(msg => {
          msg.react("<a:Caricamento:875018966676955227>")
          msg.channel.send("<@&870667019442339840>")
      setTimeout(() => {
      msg.channel.bulkDelete(1, true) 
      }, 2000);
    })
    },
};