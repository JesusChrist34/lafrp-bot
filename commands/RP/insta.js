const Discord = require('discord.js')

module.exports = {
    name: 'insta',
    description: 'Crea un post di instagram',
    premium: false,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {

    if(message.reference) {
    const msg = await message.fetchReference()

    const azione = args.slice(0).join(" ");
    if(!azione) return message.reply("Perfavore, specifica un messaggio!")

    const instaembed = new Discord.MessageEmbed()
    .setTitle("**__<:Instagram:816944529352949770> | Commento Di Instagram__**")
    .setDescription(`**${message.author} = *${azione}***`)
    .setFooter("Post Pubblicato", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("RANDOM")
    msg.reply({ embeds: [instaembed] })
    message.delete()
    } else {
    const msg = args.slice(0).join(" ");
    if(!msg) return message.reply("Perfavore, specifica un messaggio!")

    const instaembed = new Discord.MessageEmbed()
    .setTitle("**__<:Instagram:816944529352949770> | Post Di Instagram__**")
    .setDescription(`**${message.author} = *${msg}***`)
    .setFooter("Post Pubblicato", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("RANDOM")
    message.channel.send({ embeds: [instaembed] })
    message.delete()
    }
  },
};