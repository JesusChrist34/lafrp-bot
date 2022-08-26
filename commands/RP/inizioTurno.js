const Discord = require('discord.js')

module.exports = {
    name: 'inizio-turno',
    description: 'Inizia il turno di un lavoro',
    premium: false,
    timeout: 5000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {
        
    const lavoro = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if(!lavoro) return message.reply("Perfavore, specifica un lavoro!")

    const iturnoembed = new Discord.MessageEmbed()
    .setTitle("**__Turno Lavorativo Iniziato__**")
    .setDescription(`**${message.author} ha iniziato il turno lavorativo del seguente lavoro: ${lavoro}**`)
    .setFooter("Turno iniziato", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("RANDOM")
    message.channel.send({ embeds: [iturnoembed] })
    message.delete()
    },
};