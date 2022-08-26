const Discord = require('discord.js')

module.exports = {
    name: 'market',
    description: 'Inizia una rapina ad un mini-market',
    premium: false,
    timeout: 5000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {
        
    const marketembed = new Discord.MessageEmbed()
    .setTitle("**__Rapina Al Mini-Market__**")
    .setDescription("**Agenti è in corso un 2-11 ad un market, dovete intervenire!**")
    .setFooter("Rapina Al Market", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    message.channel.send({ content: "[ <@&799045358180499496>, <@&870652105134850118> ]", embeds: [marketembed] })
    message.delete()
    },
};