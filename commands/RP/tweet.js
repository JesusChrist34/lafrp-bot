const Discord = require('discord.js')

module.exports = {
    name: 'tweet',
    description: 'Crea un post di tweet',
    premium: false,
    timeout: 5000,

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

    const tweetembed = new Discord.MessageEmbed()
    .setTitle("<:Twitter:901404385140162590> | **__Post Su Twitter__**")
    .setDescription(`**${message.author} = *${azione}***`)
    .setFooter("Post Pubblicato", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("RANDOM")
    msg.reply({ embeds: [tweetembed] })
    message.delete()
    } else {
    const msg = args.slice(0).join(" ");
    if(!msg) return message.reply("Perfavore, specifica un messaggio!")

    const tweetembed = new Discord.MessageEmbed()
    .setTitle("<:Twitter:901404385140162590> | **__Post Su Twitter__**")
    .setDescription(`**${message.author} = *${msg}***`)
    .setFooter("Post Pubblicato", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("RANDOM")
    message.channel.send({ embeds: [tweetembed] })
    message.delete()
    }
  },
};