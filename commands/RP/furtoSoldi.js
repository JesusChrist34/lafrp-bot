const Discord = require('discord.js')

module.exports = {
    name: 'furto-soldi',
    description: 'Ruba una quantità di soldi ad un utente',
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
    const msg = args.slice(1).join(" ");
    if(!msg) return message.reply("Perfavore, specifica una quantità di soldi!")

    const furtosoldiembed = new Discord.MessageEmbed()
    .setTitle("**__Furto Di Soldi!__**")
    .setDescription(`**${message.author} ha rubato \`${msg}\` dollari / euro dal portafoglio di ${user}!**`)
    .setFooter("Furto avvenuto", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("RANDOM")
    message.channel.send({ embeds: [furtosoldiembed] })
    message.delete()
    },
};