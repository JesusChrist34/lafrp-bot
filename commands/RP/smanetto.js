const Discord = require('discord.js')

module.exports = {
    name: 'smanetto',
    description: 'Smanetta un utente',
    premium: false,
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

    const smanettoembed = new Discord.MessageEmbed()
    .setTitle("**__Utente Smanettato!__**")
    .setDescription(`**${message.author} ha tolto le manette a ${user}!**`)
    .setFooter("Utente Smanettato", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("RANDOM")
    message.channel.send({ embeds: [smanettoembed] })
    message.delete()
    },
};