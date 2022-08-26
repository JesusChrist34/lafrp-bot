const Discord = require('discord.js')

module.exports = {
    name: 'annuncio',
    description: 'Crea un annuncio all\'interno del server',
    premium: false,
    timeout: 5000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {
        
      const msg = args.slice(0).join(" ");
      if(!msg) return message.reply("Perfavore, specifica un messaggio!")

    const annuncioembed = new Discord.MessageEmbed()
    .setTitle("**__Annuncio__**")
    .setDescription(`**${message.author.toString()} ha pubblicato il seguente annuncio:** ${msg}`)
    .setFooter("Annuncio Pubblicato", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("RANDOM")
    message.channel.send({ embeds: [annuncioembed] })
    message.delete()
    },
};