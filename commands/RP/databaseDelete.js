const Discord = require('discord.js')
const Schema = require("../../models/database")

module.exports = {
    name: "database-delete",

    async run(bot, message, args) {

      if(!message.member.roles.cache.has("959179328921415680")) return;

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.reply("Perfavore, specifica un utente da voler rimuovere dal database!")

        const data = await Schema.findOne({ UserID: user.id })
        if(!data) return message.reply("Questo utente non è stato registrato all'interno del database!")

        if(data) {
            await data.delete()
            await message.channel.send(`**${message.author.toString()} ha eliminato con successo il file del database di ${user}!**`)
          }
    },
};