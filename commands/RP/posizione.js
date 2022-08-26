const Discord = require('discord.js')

module.exports = {
    name: "posizione",

    async run(bot, message, args) {
        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.reply("Perfavore, specifica un utente!")

        message.delete();
    const posizioneembed = new Discord.MessageEmbed()
    .setTitle("**__Invio Posizione__**")
    .setDescription(`**${message.author.toString()} ha inviato con successo la sua posizione a ${user}!**`)
    .setFooter("Posizione inviata", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("RANDOM")
    message.channel.send({ embeds: [posizioneembed] })

    const embed2 = new Discord.MessageEmbed()
    .setTitle("**__Invio Posizione__**")
    .setDescription(`**${message.author.toString()} ti ha inviato con successo la sua posizione!**`)
    .setFooter("Posizione inviata", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("RANDOM")
    user.send({ embeds: [embed2] })
    }
}