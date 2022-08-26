const Discord = require('discord.js')

module.exports = {
    name: 'email',
    description: 'Invia una email ad una determinata persona',
    timeout: 5000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {
        
    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
    if(!user) return message.reply("Perfavore, specifica un utente o un ruolo!")
    
    const msg = args.slice(1).join(" ");
    if(!msg) return message.reply("Perfavore, specifica un messaggio")

    const embed = new Discord.MessageEmbed()
    .setTitle("📧 **__Nuova Email!__** 📧")
    .addField(`**Mittente:**`, `**${message.author.toString()}**`, false)
    .addField(`**Destinatario:**`, `**${user}**`, false)
    .addField(`**Messaggio:**`, `**${msg}**`, false)
    .setFooter("Email inviata con successo")
    .setTimestamp()
    .setColor("GREEN")

   message.channel.send({ content: `${user}`, embeds: [embed] });
   message.delete()
   },
};