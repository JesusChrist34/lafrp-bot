const Discord = require('discord.js')
const Schema = require("../../models/reati")
var date = Math.round(new Date().getTime() / 1000)

module.exports = {
    name: 'add-reato',
    description: 'Aggiungi un reato ad un utente',
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
    
    const msg = args.slice(1).join(" ");
    if(!msg) return message.reply("Perfavore, specifica un reato!")

    new Schema({
      Guild: message.guild.id,
      User: user.id,
      Author: message.author.id,
      Reato: msg,
      Timestamp: date,
    }).save();

   message.channel.send({ content: `**E' stato aggiunto con successo il reato \`${msg}\` all'utente ${user}!**` });
    },
};