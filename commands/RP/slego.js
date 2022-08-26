const Discord = require('discord.js')

module.exports = {
    name: 'slego',
    description: 'Slega un utente precedentemente legato',
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

    const slegoembed = new Discord.MessageEmbed()
    .setTitle("**__Utente Slegato!__**")
    .setDescription(`**${message.author} ha tolto le fascette e slegato a ${user}!**`)
    .setFooter("Utente Slegato", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("RANDOM")
    message.channel.send({ embeds: [slegoembed] })
    message.delete()
    },
};