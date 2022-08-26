const Discord = require('discord.js')

module.exports = {
    name: 'gioielleria',
    description: 'Inizia una rapina alla gioielleria',
    premium: false,
    timeout: 5000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {
        
    const gioiaembed = new Discord.MessageEmbed()
    .setTitle("**__Rapina Alla Gioielleria__**")
    .setDescription("**A TUTTI GLI AGENTI, E' IN CORSO UN 2-11 ALLA GIOIELLERIA, DOVETE INTERVENIRE IMMEDIATAMENTE!**")
    .setFooter("Rapina Alla Gioielleria", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    message.channel.send({ content: "[ <@&799045358180499496>, <@&870652105134850118> ]", embeds: [gioiaembed] })
    message.delete()
    },
};