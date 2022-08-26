const Discord = require('discord.js')
const Schema = require('../../models/reati')

module.exports = {
    name: 'list-reati',
    description: 'Mostra una lista dei reati presi di un utente',
    premium: true,
    timeout: 5000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {

        if(!message.member.roles.cache.has("959179328921415680")) return;
        
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      if(!user) return message.reply("Perfavore, specifica un utente!")

      const data = await Schema.find({ Guild: message.guild.id, User: user.id })

        if(data.length === 0) return message.reply({ content: `Questo utente non ha avuto nessun reato all'interno del server!` })
        
        const reati = data.map((reato) => {
            const author = message.guild.members.cache.get(reato.Author)

            return [
                `**ID Reato: \`${reato._id}\`**`,
                `**Autore: ${author}**`,
                `**Reato: \`${reato.Reato}\`**`,
                `**Data: <t:${reato.Timestamp}:f>**`,
            ].join("\n")
        }).join("\n\n")

        const embed = new Discord.MessageEmbed()
        .setTitle(`**Lista Reati Di ${user.user.tag}**`)
        .setDescription(reati)
        .setColor("RED")
        .setFooter(`Sistema di Reati Los Angeles Full RP Bot`, "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
        .setTimestamp()
        message.channel.send({ embeds: [embed] })
    },
};