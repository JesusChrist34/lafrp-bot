const Discord = require('discord.js')

module.exports = {
    name: '999',
    description: 'Invia un segnale di emergenza a tutte le unità',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {
        
        message.delete();
        const canale1 = bot.channels.cache.get("1008319899497668608")
        const canale2 = bot.channels.cache.get("1008319563231932456")
        const posizione = args.slice(0).join(" ");
        if(!posizione) return message.reply("Sei pregato di inserire una posizione ( ID PS4 )!");

        const emergenza1 = new Discord.MessageEmbed()
        .setTitle("🚨 **__Codice 999__** 🚨")
        .setDescription(`**Agente a terra! Tutti i servizi di emergenza della Contea di Los Angeles sono stati allertati!**`)
        .setFooter("Chiamata d'emergenza inviata a tutti i servizi di emergenza di Los Angeles", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
        .setColor("RED")
        .setTimestamp()
        message.channel.send({ content: `<@${message.author.id}>`, embeds: [emergenza1] })

        const emergenza = new Discord.MessageEmbed()
        .setTitle("🚨 **__Codice 999__** 🚨")
        .setDescription(`**A tutte le unità presenti in città, abbiamo un codice 999, ripeto, abbiamo un triplo 9, codice rosso. La posizione dell'agente a terra è: <@${message.author.id}> ( \`${posizione}\` ), tutte le unità devono intervenire immediatamente.**`)
        .setFooter("Chiamata d'emergenza inviata a tutti i servizi di emergenza di Los Angeles", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
        .setColor("RED")
        .setTimestamp()
        canale1.send({ content: "[ <@&959179328921415680>, <@&799045358180499496>, <@&870652105134850118> ]", embeds: [emergenza] })
        canale2.send({ content: "[ <@&799045407178227792> ]", embeds: [emergenza] })
  },
};