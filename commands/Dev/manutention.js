const Discord = require('discord.js')
const Schema = require("../../models/manutention")

module.exports = {
    name: 'manutention',
    description: 'Abilita o disabilita la modalità della manutenzione',
    premium: false,
    timeout: 5000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {
        if(message.author.id !== "844691950799028235") return;

        const query = args[0]
        if(query !== "on" && query !== "off") return message.reply({ content: "Questo argomento non esiste. Specifica un argomento valido!" })

        if(query == "on") {
        const data = await Schema.findOne({ Author: message.author.id })

        if(!data) {
            new Schema({
                Author: message.author.id,
                Status: "enable"
            }).save()
            message.reply("**La modalità della manutenzione è stata abilitata con successo!**")
        } else if(data) {
          if(data.Status == "enable") return message.reply("La modalità della manutenzione del bot è già stata abilitata!")

          data.Author = message.author.id,
          data.Status = "enable"
          data.save()

          message.reply("**La modalità della manutenzione è stata abilitata con successo!**")
        }
      } else if(query == "off") {
        const data = await Schema.findOne({ Author: message.author.id })

        if(!data) {
            new Schema({
                Author: message.author.id,
                Status: "disable"
            }).save()
            message.reply("**La modalità della manutenzione è stata disabilitata con successo!**")
        } else if(data) {
          if(data.Status == "disable") return message.reply("La modalità della manutenzione del bot è già stata disattivata!")

          data.Author = message.author.id,
          data.Status = "disable"
          data.save()

          message.reply("**La modalità della manutenzione è stata disabilitata con successo!**")
        }
      }
    },
};