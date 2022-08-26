const Discord = require('discord.js')

module.exports = {
    name: "image",

    async run(bot, message, args) {
      const msg = args.slice(0).join(" ")
        if(!msg) return message.reply("Perfavore, specifica un URL di un'immagine per poter pubblicarla!")
        
        message.delete();
    const image = new Discord.MessageEmbed()
    .setTitle("**__Nuova Immagine Pubblicata__**")
    .setDescription(`**${message.author.toString()} ha pubblicato la seguente immagine:**`)
    .setFooter("Foto Pubblicata", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setImage(msg)
    .setTimestamp()
    message.channel.send({ embeds: [image] })
    }
}