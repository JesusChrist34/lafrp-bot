const Discord = require('discord.js')
const Schema = require("../../models/antiBot")

const utilizzo = new Discord.MessageEmbed()
.setTitle("**__Utilizzo Del Comando:__**")
.setDescription(`
\`!anti-bot {argomento}\`

*Configura, abilita, disabilita o visiona le informazioni dell'anti-bot system all'interno del server. Il bot eseguirà l'azione in modo automatico all'autore e al bot!*

**Argomenti Disponibili:**
\`set {#canale}\` = per configurare il canale log dell'anti-bot system
\`bypass {@ruolo}\` = per configurare un ruolo di bypass
\`action {ban / kick}\` = per configurare l'azione da eseguire
\`on\` = per abilitare l'anti-bot system
\`off\` = per disabilitare l'anti-bot system
\`info\` = per mostrare le informazioni dell'anti-bot system

**Esempi:**
\`!anti-bot set #antibot-log
!anti-bot bypass @founder
!anti-bot action ban
!anti-bot on
!anti-bot off
!anti-bot info\`
`)
.setColor("RANDOM")
.setFooter("Los Angeles Full RP Bot Help System")
.setTimestamp()

module.exports = {
    name: "anti-bot",
    timeout: 5000,

    async run(bot, message, args) {
        let owner = await message.guild.fetchOwner()

        if(message.author.id !== owner.id) return message.reply({ content: "Questo comando potrà eseguirlo soltanto il proprietario del server!" })

        const query = args[0]
        if(!query) return message.reply({ embeds: [utilizzo] })
        if(query !== "set" && query !== "bypass" && query !== "action" && query !== "on" && query !== "off" && query !== "info") return message.reply({ content: "Questo argomento non esiste. Specifica un argomento valido!", embeds: [utilizzo] })

        if(query === "set") {
        const log = await message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        if(!args[1]) return message.reply({ content: "Perfavore, specifica un canale da settare!", embeds: [utilizzo] })
        if(!log) return message.reply({ content: "Questo canale non esiste. Specifica un canale valido!" })

         await Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
                data.Status = "enable";
                data.Log = log;
                data.Action = "none";
                data.Bypass = "none";
                data.save();
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Status: "enable",
                    Log: log,
                    Action: "none",
                    Bypass: "none",
                }).save();
            }
            message.channel.send({ content: `**Tutti i settaggi riguardanti l'anti-bot sono stati salvati con successo!**` });
        })
      } else if(query === "on") {
        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(!data) return message.reply({ content: "Il sistema di anti-bot non è stato settato in questo server!" })

            if(data.Status === "enable") {
            message.reply({ content: "Il sistema di anti-bot è già stato attivato in questo server!" })
            } else {
             Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(data) {
                    data.Status = "enable";
                    data.save();
                    }
            message.channel.send({ content: `**Il sistema di anti-bot è stato attivato con successo in questo server!**` });
        });
        }
        })
     } else if(query === "off") {
        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(!data) return message.reply({ content: "Il sistema di anti-bot non è stato settato in questo server!" })

            if(data.Status === "disable") {
            message.reply({ content: "Il sistema di anti-bot è già stato disattivato in questo server!" })
            } else {
             Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(data) {
                    data.Status = "disable";
                    data.save();
                    }
            message.channel.send({ content: `**Il sistema di anti-bot è stato disattivato con successo in questo server!**` });
        });
        }
        })
     } else if(query === "action") {
       const action = args[1]
       if(!action) return message.reply({ content: "Perfavore, specifica l'azione che eseguirà il bot in caso un utente abbia aggiunto un bot!\n**Default:** `Kick`\n\n**Azioni Disponibili:**\n\`ban\`\n\`kick\`" })

       await Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
        if(data) {
            data.Action = action;
            data.save();

            message.channel.send({ content: "**L'azione da eseguire in caso viene aggiunto un bot è stata configurata con successo!**" })
    } else { 
      return message.reply({ content: "Il sistema di anti-bot non è stato settato in questo server!" })
    }
});
     } else if(query === "bypass") {
      const bypass = await message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
      if(!bypass) return message.reply({ content: "Perfavore, specifica un bypass role!" });

      await Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
        if(data) {
            data.Bypass = bypass;
            data.save();

            message.channel.send({ content: "**Il bypass role dell'anti-bot è stato configurato con successo!**" })
    } else { 
      return message.reply({ content: "Il sistema di anti-bot non è stato settato in questo server!" })
    }
});
     } else if(query === "info") {
         const data = await Schema.findOne({ Guild: message.guild.id })
         if(data) {
             if(data.Action === "none") {
                 azione = "Nessun'azione"
             } else {
                 azione = data.Action
             }
             if(data.Bypass === "none") {
                 bypass = "`Nessun ruolo`"
             } else {
                 bypass = data.Bypass
             }
             if(data.Status === "enable") {
                 Status = "Attivato"
             } else {
                 Status = "Disattivato"
             }
             const embed = new Discord.MessageEmbed()
             .setTitle("**__Info Anti-Bot__**")
             .setDescription("**Ecco tutte le info settate dell'anti-bot per questo server!**")
             .addField("**Status:**", `\`${Status}\``)
             .addField("**Canale Log:**", `${data.Log}`)
             .addField("**Azione:**", `\`${azione}\``)
             .addField("**Bypass:**", `${bypass}`)
             .setTimestamp()
             .setColor("RANDOM")
             message.channel.send({ embeds: [embed] })
         } else {
            message.reply({ content: "Il sistema di anti-bot non è stato settato in questo server!" })
         }
     }
    },
};