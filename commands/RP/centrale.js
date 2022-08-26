const Discord = require('discord.js')

module.exports = {
    name: 'centrale',
    description: 'Fai un assalto alla centrale di polizia',
    premium: false,
    timeout: 5000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {

    const centraleembed = new Discord.MessageEmbed()
    .setTitle("**__Assalto Alla Centrale!__**")
    .setDescription(`
**Agenti, è in corso un assalto alla centrale di polizia, dovete intervenire immediatamente, all'interno della centrale ci sono dei civili, procedete con cautela.**
`)
    .setFooter("Assalto Centrale", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("BLACK")
    message.channel.send({ content: "[ <@&799045358180499496>, <@&870652105134850118> ]", embeds: [centraleembed] })
    message.delete()
    },
};