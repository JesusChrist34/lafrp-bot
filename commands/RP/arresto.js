const Discord = require('discord.js')

module.exports = {
    name: 'arresto',
    description: 'Arresta un utente all\'interno del server',
    timeout: 5000,
    premium: false,

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} message
     * @param {String[]} args
     */

    run: async (bot, message, args) => {

      if(!message.member.roles.cache.has("959179328921415680")) return;
    
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      if(!user) return message.reply("Perfavore, specifica un utente!")

    const arrestoembed = new Discord.MessageEmbed()
    .setTitle("**__Arresto In Corso!__**")
    .setDescription(`**${message.author.toString()} ha ammanettato e arrestato a ${user}!**`)
    .setFooter("Arresto Eseguito", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("RANDOM")
    message.channel.send({ embeds: [arrestoembed] })
    message.delete()
    },
};