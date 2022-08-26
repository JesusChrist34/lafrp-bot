const Discord = require('discord.js')

module.exports = {
    name: "suburban",

    async run(bot, message, args) {
        message.delete();
    const rapina = new Discord.MessageEmbed()
    .setTitle("**__Rapina Al Suburban__**")
    .setDescription(`**Agenti, è in corso un 2-11 ad un negozio di vestiti (suburban), dovete intervenire!**`)
    .setFooter("Rapina in corso (Suburban)", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    message.channel.send({ content: "[ <@&799045358180499496>, <@&870652105134850118> ]", embeds: [rapina] })
    }
}