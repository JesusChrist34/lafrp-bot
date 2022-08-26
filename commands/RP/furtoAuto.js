const Discord = require('discord.js')

module.exports = {
    name: 'furto-veicolo',
    description: 'Ruba un veicolo',
    premium: false,
    timeout: 5000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {
        
    const msg = args.slice(0).join(" ")
    if(!msg) return message.reply("Perfavore, specifica un veicolo!")

    const furtoautoembed = new Discord.MessageEmbed()
    .setTitle("**__Furto Di Veicoli!__**")
    .setDescription(`**${message.author} ha rubato il seguente veicolo: \`${msg}\`**`)
    .setFooter("Furto avvenuto", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("RANDOM")
    message.channel.send({ embeds: [furtoautoembed] })
    message.delete()
    },
};