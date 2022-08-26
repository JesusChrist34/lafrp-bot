const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'wl-on',
    description: 'Manda online le whitelist orali',
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
      .setTitle("**__Whitelist Orali Aperte__**")
      .setDescription("**I whitelist manager del Los Angeles Full RP 3.0 comunicano che da ora sono disponibili per le whitelist orali. Recatevi in <#870489627868426311> e attendete che un whitelist manager vi sposti per poter svolgere il provino!**")
      .setFooter("Buona fortuna a tutti!")
      .setTimestamp()
      .setColor("GREEN")
      interaction.reply({ content: "[ <@&799045457779097650> ]", embeds: [embed] })
        
    },
};