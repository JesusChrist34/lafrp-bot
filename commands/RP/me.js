const Discord = require('discord.js')

module.exports = {
    name: 'me',
    description: 'Fai un azione RP',
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

    const azionembed = new Discord.MessageEmbed()
    .setTitle("<:Azione:837033978418036787> **__Azione RP__** <:Azione:837033978418036787>")
    .setDescription(`**${message.author} = *${azione}***`)
    .setColor("RANDOM")
    .setTimestamp()
    msg.reply({ embeds: [azionembed] })
    message.delete()
    } else {
    const msg = args.slice(0).join(" ");
    if(!msg) return message.reply("Perfavore, specifica un messaggio!")

    const azionembed = new Discord.MessageEmbed()
    .setTitle("<:Azione:837033978418036787> **__Azione RP__** <:Azione:837033978418036787>")
    .setDescription(`**${message.author} = *${msg}***`)
    .setColor("RANDOM")
    .setTimestamp()
    message.channel.send({ embeds: [azionembed] })
    message.delete()
    }
  },
};