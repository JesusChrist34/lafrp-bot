const Discord = require('discord.js')

module.exports = {
    name: 'sex',
    description: 'Fai un azione RP sex',
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

    const azionesexembed = new Discord.MessageEmbed()
    .setTitle(":underage: **__Azione RP Sex__** :underage:")
    .setDescription(`**${message.author} = *${azione}***`)
    .setColor("RANDOM")
    .setTimestamp()
    msg.reply({ embeds: [azionesexembed] })
    message.delete()
    } else {
    const msg = args.slice(0).join(" ");
    if(!msg) return message.reply("Perfavore, specifica un messaggio!")

    const azionesexembed = new Discord.MessageEmbed()
    .setTitle(":underage: **__Azione RP Sex__** :underage:")
    .setDescription(`**${message.author} = *${msg}***`)
    .setColor("RANDOM")
    .setTimestamp()
    message.channel.send({ embeds: [azionesexembed] })
    message.delete()
    }
  },
};