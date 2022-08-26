const Discord = require('discord.js')
const Schema = require("../../models/antiInvite")

const utilizzo = new Discord.MessageEmbed()
.setTitle("**__Utilizzo Del Comando:__**")
.setDescription(`
\`!anti-invite {argomento}\`

*Configura, abilita, disabilita o visiona le informazioni dell'anti-invite system all'interno del server. Il bot eliminerà ed eseguirà l'azione automaticamente in caso un link viene inviato.*

**Argomenti Disponibili:**
\`set {@ruolo}\` = per configurare il ruolo di bypass dell'anti-invite system
\`action {ban / kick / mute}\` = per configurare l'azione da eseguire
\`on\` = per abilitare l'anti-invite system
\`off\` = per disabilitare l'anti-invite system
\`info\` = per mostrare le informazioni dell'anti-invite system

**Esempi:**
\`!anti-invite set @staff
!anti-invite action ban
!anti-invite on
!anti-invite off
!anti-invite info\`
`)
.setColor("RANDOM")
.setFooter("Los Angeles Full RP Bot Help System")
.setTimestamp()

module.exports = {
    name: "anti-invite",
    timeout: 5000,
    UserPerms: ["ADMINISTRATOR"],

    async run(bot, message, args) {

      const query = args[0]
      if(!query) return message.reply({ embeds: [utilizzo] })
      if(query !== "set" && query !== "action" && query !== "on" && query !== "off" && query !== "info") return message.reply({ content: "Questo argomento non esiste. Specifica un argomento valido!", embeds: [utilizzo] })

      if(query === "set") {
      const role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
      if(!args[1]) return message.reply({ content: "Perfavore, specifica un ruolo da settare!", embeds: [utilizzo] })
      if(!role) return message.reply({ content: "Questo ruolo non esiste. Specifica un ruolo valido!" })

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if (err) throw err;
            if(data) {
                data.Status = "enable";
                data.Role = role.id || role;
                data.Action = "none";
                data.save();
            } else {
              new Schema({
                    Guild: message.guild.id,
                    Status: "enable",
                    Ruolo: role.id || role,
                    Action: "none"
                }).save();
            }
            message.channel.send({ content: "**E' stato configurato con successo l'anti-invite system per questo server!**" })
        })
      } else if(query == "on") {
        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(!data) return message.reply({ content: "Il sistema di anti-invite non è stato settato in questo server!" })

            if(data.Status === "enable") {
            message.reply({ content: "Il sistema di anti-invite è già stato attivato in questo server!" })
            } else {
             Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(data) {
                    data.Status = "enable";
                    data.save();
                    }
            message.channel.send({ content: `**Il sistema di anti-invite è stato attivato con successo in questo server!**` });
        });
        }
        })
     } else if(query == "off") {
        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(!data) return message.reply({ content: "Il sistema di anti-invite non è stato settato in questo server!" })

            if(data.Status === "disable") {
            message.reply({ content: "Il sistema di anti-invite è già stato disattivato in questo server!" })
            } else {
             Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(data) {
                    data.Status = "disable";
                    data.save();
                    }
            message.channel.send({ content: `**Il sistema di anti-invite è stato disattivato con successo in questo server!**` });
        });
        }
        })
     } else if(query === "action") {
      const action = args[1]
      if(!action) return message.reply({ content: "Perfavore, specifica l'azione che eseguirà il bot in caso un utente abbia inviato un link!\n\n**Azioni Disponibili:**\n\`ban\`\n\`kick\`\n\`mute\`\n**Nota:** va selezionato un ruolo per il mute!" })

      await Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
       if(data) {
           data.Action = action;
           data.save();

           message.channel.send({ content: "**L'azione da eseguire in caso l'utente invia un link è stata configurata con successo!**" })
   } else { 
     return message.reply({ content: "Il sistema di anti-invite non è stato settato in questo server!" })
   }
});
     } else if(query === "info") {
         const data = await Schema.findOne({ Guild: message.guild.id })
         if(data) {
           if(data.Status === "enable") {
            Status = "Attivato"
           } else {
            Status = "Disattivato"
           }
           if(data.Action !== "none") {
             azione = data.Action
           } else {
             azione = "Nessun'azione"
           }
             const embed = new Discord.MessageEmbed()
             .setTitle("**__Info Anti-Invite__**")
             .setDescription("**Ecco tutte le info settate dell'anti-invite per questo server!**")
             .addField("**Status:**", `\`${Status}\``)
             .addField("**Bypass Role:**", `<@&${data.Ruolo}>`)
             .addField("**Azione:**", `\`${azione}\``)
             .setTimestamp()
             .setColor("RANDOM")
             message.channel.send({ embeds: [embed] })
         } else {
            message.reply({ content: "Il sistema di anti-invite non è stato settato in questo server!" })
         }
     }
    }
};