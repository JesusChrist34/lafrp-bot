const Discord = require('discord.js')

module.exports = {
    name: 'lego',
    description: 'Lega un utente all\'interno del server',
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
        
    const legoembed = new Discord.MessageEmbed()
    .setTitle("**__Rapimento In Corso!__**")
    .setDescription(`**${message.author} ha messo le fascette e legato a ${user}**`)
    .setFooter("Utente Legato", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("RANDOM")
    message.channel.send({ embeds: [legoembed] })
    message.delete()
    },
};