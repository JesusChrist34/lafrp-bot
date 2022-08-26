const Discord = require('discord.js')
const Schema = require("../../models/blacklistWords")

const utilizzo = new Discord.MessageEmbed()
.setTitle("**__Utilizzo Del Comando:__**")
.setDescription(`
\`!blacklist {argomento}\`

*Configura, abilita, disabilita o visiona le informazioni del blacklist-words system all'interno del server. Il bot eliminerà automaticamente le parole blacklistate!*

**Argomenti Disponibili:**
\`set {parola} {@ruolo}\` = per configurare una parola e il bypass role del blacklist-words system
\`add {parola}\` = per aggiungere una parola vietata
\`remove {numero parola}\` = per rimuovere una parola vietata
\`on\` = per abilitare il blacklist-words system
\`off\` = per disabilitare il blacklist-words system
\`info\` = per mostrare le informazioni del blacklist-words system

**Esempi:**
\`!blacklist set merda @staff
!blacklist add cazzo
!blacklist remove merda
!blacklist on
!blacklist off
!blacklist info\`
`)
.setColor("RANDOM")
.setFooter("Los Angeles Full RP Bot Help System")
.setTimestamp()

module.exports = {
    name: "blacklist",
    UserPerms: ["ADMINISTRATOR"],
    timeout: 5000,

    async run(bot, message, args) {

        const query = args[0]
        if(!query) return message.reply({ embeds: [utilizzo] })
        if(query !== "set" && query !== "add" && query !== "remove" && query !== "on" && query !== "off" && query !== "info") return message.reply({ content: "Questo argomento non esiste. Specifica un argomento valido!", embeds: [utilizzo] })

        if(query === "set") {
        const word = args[1]
        if(!word) return message.reply({ content: "Perfavore, specifica una parola da settare!", embeds: [utilizzo] })

        const role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
        if(!args[2]) return message.reply({ content: "Perfavore, specifica un ruolo da settare!", embeds: [utilizzo] })
        if(!role) return message.reply({ content: "Questo ruolo non esiste. Specifica un ruolo valido!" })

        await Schema.findOne({
            Guild: message.guild.id
        }, async (err, data) => {
            if (err) throw err;
            if (!data) {
                data = new Schema({
                    Guild: message.guild.id,
                    Role: role.id || role,
                    Status: "enable",
                    Words: [{
                        Author: message.author.id,
                        Word: word
                    }]
                })
            }
            data.save()
            message.channel.send({ content: "**E' stato configurato con successo il sistema di blacklist-words!**" })
        })
      } else if(query === "add") {
        const word = args.slice(1).join(" ");
        if(!word) return message.reply({ content: "Perfavore, specifica una parola da aggiungere!", embeds: [utilizzo] })

        await Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
                const object = {
                    Author: message.author.id,
                    Word: word
                }
                data.Words.push(object)
        } else { 
            return message.reply({ content: "Il sistema di blacklist-words non è stato configurato in questo server!" }) 
        }
        data.save()
        message.channel.send({ content: "**E' stata aggiunta con successo questa parola alla blacklist!**" })
        })
      } else if(query === "remove") {
          const number1 = args[1]
          if(!number1) return message.reply({ content: "Perfavore, specifica un numero che equivale alla parola da rimuovere!", embeds: [utilizzo] })
          
        await Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(!data) return message.reply({ content: "Il sistema di blacklist-words non è stato configurato in questo server!" })

            if(data) {
                    let number = parseInt(args[1]) - 1
                    data.Words.splice(number, 1)
                    data.save()
        } else {
            return message.reply({ content: "Questa parola non è stata blacklistata!" })
        }
        message.channel.send({ content: "**E' stata rimossa con successo questa parola alla blacklist!**" })
        })
       } else if(query === "on") {
        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(!data) return message.reply({ content: "Il sistema di blacklist-words non è stato settato in questo server!" })

            if(data.Status === "enable") {
            message.reply({ content: "Il sistema di blacklist-words è già stato attivato in questo server!" })
            } else {
             Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(data) {
                    data.Status = "enable";
                    data.save();
                    }
            message.channel.send({ content: `**Il sistema di blacklist-words è stato attivato con successo in questo server!**` });
        });
        }
        })
     } else if(query === "off") {
        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(!data) return message.reply({ content: "Il sistema di blacklist-words non è stato settato in questo server!" })

            if(data.Status === "disable") {
            message.reply({ content: "Il sistema di blacklist-words è già stato disattivato in questo server!" })
            } else {
             Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(data) {
                    data.Status = "disable";
                    data.save();
                    }
            message.channel.send({ content: `**Il sistema di blacklist-words è stato disattivato con successo in questo server!**` });
        });
        }
        })
    } else if(query === "info") {
        const data = await Schema.findOne({ Guild: message.guild.id })
        if(data) {
           if(data.Status === "enable") {
               Status = "Attivato"
           } else {
               Status = "Disattivato"
           }
            const embed = new Discord.MessageEmbed()
            .setTitle("**__Info Blacklist System__**")
            .setDescription("**Ecco tutte le info settate del blacklist-words per questo server!**")
            .addField("**Status**", `\`${Status}\``)
            .addField("**Bypass:**", `<@&${data.Role}>`)
            .addField("**Parole Blacklistate:**", data.Words.map((w, i) => 
`**\`${i + 1})\` Autore: \`${message.guild.members.cache.get(w.Author).user.tag} ( ${message.guild.members.cache.get(w.Author).user.id} )\`\nParola: \`${w.Word}\`**`))
            .setTimestamp()
            .setColor("RANDOM")
            message.channel.send({ embeds: [embed] })
        } else {
           message.reply({ content: "Il blacklist-words system non è stato configurato in questo server!" })
        }
     }
   },
};