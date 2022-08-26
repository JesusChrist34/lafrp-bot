const Discord = require('discord.js')

module.exports = {
    name: 'bando-aperto',
    description: 'Apri un bando all\'interno del server',
    premium: false,
    timeout: 5000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {
        
    const bapertoembed = new Discord.MessageEmbed()
    .setTitle("**<:Approvato:874719444188934174> ┃ __Bando Aperto__**")
    .setDescription("**Annunciamo che il bando per questo lavoro è attualmente aperto. Affrettatevi a compilare il bando!**")
    .setColor("GREEN")
    .setFooter("~La Dirigenza", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg");
    message.channel.send({ embeds: [bapertoembed] })
    message.delete()
    },
};