const Discord = require('discord.js')

module.exports = {
    name: 'curo',
    description: 'Cura te stesso o qualcun\'altro all\'interno dell\'ospedale',
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
        .setDescription(`**${message.author.toString()} sta curando tutte le ferite di ${user} in ospedale.\n__Tempo Previsto:__ \`1 minuto\`.**`)
        .setColor("ORANGE")
        .setFooter("Cura In Corso")
        .setTimestamp()
        message.channel.send({ embeds: [cam] }).then(msg => {
      setTimeout(() => {
        const embed = new Discord.MessageEmbed()
        .setTitle("**__Medi-Kit__**")
        .setDescription(`**${message.author.toString()} ha curato con successo tutte le ferite di ${user} in ospedale!**`)
        .setFooter("Cura Finita")
        .setColor("GREEN")
        .setTimestamp()
      msg.edit({ embeds: [embed] })
      }, 60000);
     })
        } else {
        const cam = new Discord.MessageEmbed()
        .setTitle("**__Medi-Kit__**")
        .setDescription(`**${message.author.toString()} si sta facendo curare le ferite dai medici in ospedale.\n__Tempo Previsto:__ \`1 minuto\`.**`)
        .setColor("ORANGE")
        .setFooter("Cura In Corso")
        .setTimestamp()
        message.channel.send({ embeds: [cam] }).then(msg => {
      setTimeout(() => {
        const embed = new Discord.MessageEmbed()
        .setTitle("**__Medi-Kit__**")
        .setDescription(`**${message.author.toString()} è stato curato con successo dai medici in ospedale!**`)
        .setFooter("Cura Finita")
        .setColor("GREEN")
        .setTimestamp()
      msg.edit({ embeds: [embed] })
      }, 60000);
     })
     }
    },
};