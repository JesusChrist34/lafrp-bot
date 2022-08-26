const Discord = require('discord.js')

module.exports = {
    name: 'bando-accettato',
    description: 'Accetta un bando ad un utente',
    premium: false,
    timeout: 5000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {
        
        const user = message.mentions.users.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.reply("Perfavore, specifica un utente!")

        const lavoro = message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
        if(!lavoro) return message.reply("Perfavore, specifica un lavoro!")

        const grado = args[2]
        if(!grado) return message.reply("Perfavore, specifica un grado!")

        const motivo = args.slice(3).join(" ") || "Nessun motivo!"

        const embed = new Discord.MessageEmbed()
        .setTitle("**__Accettazione Bando__**")
        .setDescription(`
**${message.author.toString()} ha accettato un bando lavorativo!

__Utente:__ ${user}
__Lavoro:__ ${lavoro}
__Grado:__ ${grado}
__Motivo:__ \`${motivo}\`**
`)
        .setFooter("Bando Accettato", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
        .setTimestamp()
        .setColor("GREEN")

        message.delete()
        message.channel.send({ embeds: [embed] })
    },
};