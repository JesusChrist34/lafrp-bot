const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'wl-off',
    description: 'Manda offline le whitelist orali',
    timeout: 10000,
    premium: false,

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (bot, interaction, args) => {

      if(!interaction.member.roles.cache.has("799045333413920858")) return interaction.reply({ content: "Non hai i permessi necessari per eseguire questo comando!", ephemeral: true });

      const embed = new Discord.MessageEmbed()
      .setTitle("**__Whitelist Orali Chiuse__**")
      .setDescription("**I whitelist manager del Los Angeles Full RP 3.0 comunicano che in questo momento non sono disponibili per le whitelist orali!**")
      .setFooter("Appena qualcuno sarà disponibile le whitelist riapriranno!")
      .setTimestamp()
      .setColor("RED")
      interaction.reply({ content: "[ <@&799045457779097650> ]", embeds: [embed] })
        
    },
};