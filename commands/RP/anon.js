const Discord = require('discord.js')

module.exports = {
    name: 'anon',
    description: 'Manda un messaggio anonimo all\'interno della chat',
    timeout: 5000,
    premium: false,

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} message
     * @param {String[]} args
     */

    run: async (bot, message, args) => {

      if(message.reference) {
        const msg = await message.fetchReference()
    
        const azione = args.slice(0).join(" ");
        if(!azione) return message.reply("Perfavore, specifica un messaggio!")
    
        const anonembed = new Discord.MessageEmbed()
    .setTitle("<:Anonimo:837033922600763412> **__Messaggio Anonimo__** <:Anonimo:837033922600763412>")
    .setDescription(azione)
    .setFooter("Nella Chat Anonima", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    message.delete()
        msg.reply({ embeds: [anonembed] })
        message.delete()
        } else {
        const msg = args.slice(0).join(" ");
        if(!msg) return message.reply("Perfavore, specifica un messaggio!")
    
        const anonembed = new Discord.MessageEmbed()
    .setTitle("<:Anonimo:837033922600763412> **__Messaggio Anonimo__** <:Anonimo:837033922600763412>")
    .setDescription(msg)
    .setFooter("Nella Chat Anonima", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    message.channel.send({ embeds: [anonembed] })
        message.delete()
        }
    },
};