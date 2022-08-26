const Discord = require('discord.js')

module.exports = {
    name: '911',
    description: 'Chiama un operatore del 911',
    premium: false,
    timeout: 5000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {
        
        message.delete();
        const emergenza = new Discord.MessageEmbed()

        .setTitle("**__Chiamata 911__**")
        .setDescription(`
**Salve, qui è il 911, esponga la sua emergenza e il tipo di reparto che richiede.**

**Reparti Disponibili:

1) LAPD (Police Department)

2) LASD (Sheriff Department)

3) LAFD (Fire Department)**

**Digitare \`LAPD\` per richiedere un agente di polizia.\nDigitare \`LASD\` per richiedere un agente dello sceriffato.\nDigitare \`LAFD\` per richiedere i vigili del fuoco.\nDigitare \`Annulla\` per annullare la chiamata.**
        `)
        .setFooter("Chiamata d'emergenza inviata al centralino del 911 di Los Angeles", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
        .setColor("RED")
        .setTimestamp()
        message.channel.send({ content: message.author.toString(), embeds: [emergenza] })

        const collector1 = message.channel.createMessageCollector({
            filter: (m) => m.author.id === message.author.id && m.content.includes('LAPD'),
            time: 30000,
            max: 1,
        });

collector1.on('collect', async m => {
    if(m){

        const police = new Discord.MessageEmbed()
        .setTitle("**__Chiamata 911 (LAPD)__**")
        .setDescription(`**Perfetto, Stiamo contattando gli agenti di polizia disponibili, nel mentre è pregato di scrivere la sua posizione attuale (ID PS4)**`)
        .setFooter("Chiamata inviata alla centrale di polizia più vicina alla sua posizione", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
        .setTimestamp()
        .setColor("#030df1")
        
        message.channel.send({ content: message.author.toString(), embeds: [police] })
        
        const canale = bot.channels.cache.get("1008325532204675105")
        
        const embed = new Discord.MessageEmbed()
        .setTitle("**__Chiamata 911__**")
        .setDescription(`**${message.author.toString()} ha richiesto l'intervento della polizia, guardate il canale <#799045690063585320>!**`)
        .setFooter("Chiamata Inviata")
        .setTimestamp()
        .setColor("#030df1")
        canale.send({ content: "[ <@&799045358180499496> ]", embeds: [embed] })

    }
    else {
        return
    }
})

const collector2 = message.channel.createMessageCollector({
    filter: (m) => m.author.id === message.author.id && m.content.includes('LAFD'),
    time: 30000,
    max: 1,
});

collector2.on('collect', async m => {
    if(m){

        const ems = new Discord.MessageEmbed()
        .setTitle("**__Chiamata 911 (LAFD)__**")
        .setDescription(`**Perfetto, Stiamo contattando i vigili del fuoco disponibili, nel mentre è pregato di scrivere la sua posizione attuale (ID PS4)**`)
        .setFooter("Chiamata inviata alla caserma più vicino alla sua posizione", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
        .setTimestamp()
        .setColor("#f1170b")
        
        message.channel.send({ content: message.author.toString(), embeds: [ems] })
        
        const canale = bot.channels.cache.get("1008319563231932456")
        
        const embed = new Discord.MessageEmbed()
        .setTitle("**__Chiamata 911__**")
        .setDescription(`**${message.author.toString()} ha richiesto l'intervento della LAFD, guardate il canale <#799045690063585320>!**`)
        .setFooter("Chiamata Inviata")
        .setTimestamp()
        .setColor("#f1170b")
        canale.send({ content: "[ <@&799045407178227792> ]", embeds: [embed] })

    }
    else {
        return
    }
})

const collector3 = message.channel.createMessageCollector({
    filter: (m) => m.author.id === message.author.id && m.content.includes('LASD'),
    time: 30000,
    max: 1,
});

collector3.on('collect', async m => {
    if(m){

        const police = new Discord.MessageEmbed()
        .setTitle("**__Chiamata 911 (LASD)__**")
        .setDescription(`**Perfetto, Stiamo contattando gli agenti dello sceriffato disponibili, nel mentre è pregato di scrivere la sua posizione attuale (ID PS4)**`)
        .setFooter("Chiamata inviata alla centrale LASD più vicina alla sua posizione", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
        .setTimestamp()
        .setColor("#030df1")
        
        message.channel.send({ content: message.author.toString(), embeds: [police] })
        
        const canale = bot.channels.cache.get("1008324079746564166")
        
        const embed = new Discord.MessageEmbed()
        .setTitle("**__Chiamata 911__**")
        .setDescription(`**${message.author.toString()} ha richiesto l'intervento della LASD, guardate il canale <#799045690063585320>!**`)
        .setFooter("Chiamata Inviata")
        .setTimestamp()
        .setColor("#030df1")
        canale.send({ content: "[ <@&870652105134850118> ]", embeds: [embed] })

    }
    else {
        return
    }
})

const collector4 = message.channel.createMessageCollector({
    filter: (m) => m.author.id === message.author.id && m.content.includes('Annulla'),
    time: 30000,
    max: 1,
});

collector4.on('collect', async m => {
    if(m){

       const annulla = new Discord.MessageEmbed()

        .setTitle("**__Annulamento Chiamata 911!__**")
        .setDescription('**Chiamata annullata con successo!**')
        .setFooter('Annullamento chiamata al centralino del 911 di Los Angeles', "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
        .setColor("GREEN")

        message.channel.send({ content: message.author.toString(), embeds: [annulla] })

    } else {
        return
      }
    })
  },
};