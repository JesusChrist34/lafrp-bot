const Discord = require('discord.js')

module.exports = {
    name: 'licenzio',
    description: 'Licenzia un utente da un lavoro',
    premium: false,
    timeout: 5000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {
        
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    if(!user) return message.reply("Perfavore, specifica un utente!")
    const msg = message.mentions.roles.first() || message.guild.members.cache.get(args[0])
    if(!msg) return message.reply("Perfavore, specifica un lavoro!")

    const licenzioembed = new Discord.MessageEmbed()
    .setTitle("**__Licenziamento In Corso!__**")
    .setDescription(`**${message.author} ha licenziato con successo a ${user} dal seguente lavoro: ${msg}**`)
    .setFooter("Utente Licenziato", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("RANDOM")
    message.channel.send({ embeds: [licenzioembed] })
    message.delete()
    },
};