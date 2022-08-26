const Discord = require('discord.js')

module.exports = {
    name: 'medikit',
    description: 'Cura in modo parziale le tue ferite subite o quelle di qualcun\'altro per non perdere conoscienza',
    premium: false,
    timeout: 300000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        message.delete()

        if(user) {
        const cam = new Discord.MessageEmbed()
        .setTitle("**__Medi-Kit__**")
        .setDescription(`**${message.author.toString()} sta provando a curare le ferite più gravi di ${user}.\n__Tempo Previsto:__ \`15 secondi\`.**`)
        .setColor("ORANGE")
        .setFooter("Cura In Corso")
        .setTimestamp()
        message.channel.send({ embeds: [cam] }).then(msg => {
      setTimeout(() => {
        const embed = new Discord.MessageEmbed()
        .setTitle("**__Medi-Kit__**")
        .setDescription(`**${message.author.toString()} ha curato con successo le ferite gravi di ${user}!**`)
        .setFooter("Cura Finita")
        .setColor("GREEN")
        .setTimestamp()
      msg.edit({ embeds: [embed] })
      }, 15000);
     })
        } else {
        const cam = new Discord.MessageEmbed()
        .setTitle("**__Medi-Kit__**")
        .setDescription(`**${message.author.toString()} sta provando a curarsi le sue ferite più gravi.\n__Tempo Previsto:__ \`15 secondi\`.**`)
        .setColor("ORANGE")
        .setFooter("Cura In Corso")
        .setTimestamp()
        message.channel.send({ embeds: [cam] }).then(msg => {
      setTimeout(() => {
        const embed = new Discord.MessageEmbed()
        .setTitle("**__Medi-Kit__**")
        .setDescription(`**${message.author.toString()} si è curato con successo le sue ferite gravi!**`)
        .setFooter("Cura Finita")
        .setColor("GREEN")
        .setTimestamp()
      msg.edit({ embeds: [embed] })
      }, 15000);
     })
     }
    },
};