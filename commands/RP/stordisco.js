const Discord = require('discord.js')

module.exports = {
    name: 'stordisco',
    description: 'Stordisci un utente',
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

    const stordiscoembed = new Discord.MessageEmbed()
    .setTitle("**__Stordimento In Corso!__**")
    .setDescription(`**${message.author} ha stordito con successo a ${user}!**`)
    .setFooter("L'utente è stato stordito con successo", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("RANDOM")
    message.channel.send({ embeds: [stordiscoembed] })
    message.delete()
    },
};