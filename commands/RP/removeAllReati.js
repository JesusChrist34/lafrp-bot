const Discord = require('discord.js')
const Schema = require("../../models/reati")

module.exports = {
    name: 'remove-all-reati',
    description: 'Rimuovi tutti i reati di un utente',
    premium: true,
    timeout: 5000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {

      if(!message.member.roles.cache.has("959179328921415680")) return;
        
      const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      if(!user) return message.reply("Perfavore, specifica un utente!")

      await Schema.deleteMany({ Guild: message.guild.id, User: user.id})
      
      message.channel.send({ content: `**Ho eliminato tutti i reati di ${user} ( \`${user.id}\` )!**` })
    },
};