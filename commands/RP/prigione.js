const Discord = require('discord.js')

module.exports = {
    name: 'prigione',
    description: 'Inizia un assalto alla prigione',
    premium: false,
    timeout: 5000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {
        
    const prigioneembed = new Discord.MessageEmbed()
    .setTitle("**__Assalto Alla Prigione__**!")
    .setDescription(`
**Agenti è in corso un assalto alla prigione di Sandy Shores, le guardie richiedono rinforzi immediati.**
`)
    .setFooter("Assalto Alla Prigione Principale", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("BLACK")
    message.channel.send({ content: "[ <@&799045358180499496>, <@&870652105134850118> ]", embeds: [prigioneembed] })
    message.delete()
    },
};