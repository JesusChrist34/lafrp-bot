const Discord = require('discord.js')

module.exports = {
    name: 'pacific',
    description: 'Inizia una rapina alla pacific bank',
    premium: false,
    timeout: 5000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {
        
    const pacificembed = new Discord.MessageEmbed()
    .setTitle("**__Rapina Alla Pacific__**")
    .setDescription("**A TUTTI GLI AGENTI, E' IN CORSO UN 2-11 ALLA PACIFIC BANK, DOVETE INTERVENIRE ORA!**")
    .setFooter("Rapina Alla Pacific Bank", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    message.channel.send({ content: "[ <@&799045358180499496>, <@&870652105134850118> ]", embeds: [pacificembed] })
    message.delete()
    },
};