const Discord = require('discord.js')
const Schema = require("../../models/captcha")
const ms = require("ms")

const utilizzo = new Discord.MessageEmbed()
.setTitle("**__Utilizzo Del Comando:__**")
.setDescription(`
\`!captcha {argomento}\`

*Configura, abilita, disabilita o visiona le informazioni del captcha system all'interno del server. Il bot manderà automaticamente un codice captha agli utenti che entreranno nel server, eseguendo la modalità e l'azione!*

**Argomenti Disponibili:**
\`set {#canale} {@ruolo da aggiungere}\` = per configurare il captcha system
\`remove-role {@ruolo da rimuovere}\` = per configurare il ruolo da rimuovere
\`time {tempo}\` = per configurare il tempo a disposizione
\`action {ban / kick / mute}\` = per configurare l'azione da eseguire
\`mode {tempo}\` = per configurare la modalità del captcha (solo giorni)
\`on\` = per abilitare il captcha system
\`off\` = per disabilitare il captcha system
\`info\` = per mostrare le informazioni del captcha system

**Esempi:**
\`!captcha set #captcha-logs @utente
!captcha remove-role @non verificato
!captcha time 5m
!captcha action ban
!captcha mode 60d
!captcha on
!captcha off
!captcha info\`
`)
.setColor("RANDOM")
.setFooter("Los Angeles Full RP Bot Help System")
.setTimestamp()

module.exports = {
    name: "captcha",
    UserPerms: ["ADMINISTRATOR"],
    timeout: 5000,

    async run(bot, message, args) {

        const query = args[0]
        if(!query) return message.reply({ embeds: [utilizzo] })
        if(query !== "set" && query !== "remove-role" && query !== "time" && query !== "action" && query !== "mode" && query !== "on" && query !== "off" && query !== "info") return message.reply({ content: "Questo argomento non esiste. Specifica un argomento valido!", embeds: [utilizzo] })

        if(query === "set") {
        const Channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        if(!args[1]) return message.reply({ content: "Perfavore, specifica un canale da settare!", embeds: [utilizzo] })
        if(!Channel) return message.reply({ content: "Questo canale non esiste. Specifica un canale valido!" })

        const addRole = await message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
        if(!args[2]) return message.reply({ content: "Perfavore, specifica un ruolo da settare!", embeds: [utilizzo] })
        if(!addRole) return message.reply({ content: "Questo ruolo non esiste. Specifica un ruolo valido!" })

         await Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
                data.Channel = Channel.id || Channel;
                data.AddRole = addRole.id || addRole;
                data.RemoveRole = "none";
                data.Mode = "all";
                data.Action = "kick";
                data.Time = "1m"
                data.Status = "enable"
                data.save();
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Channel: Channel.id || Channel,
                    AddRole: addRole.id || addRole,
                    RemoveRole: "none",
                    Mode: "all",
                    Action: "kick",
                    Time: "1m",
                    Status: "enable"
                }).save();
            }
            message.channel.send({ content: `**E' stato configurato con successo il captcha system per questo server!**`});
        })
      } else if(query === "remove-role") {
        const removeRole = await message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
        if(!args[1]) return message.reply({ content: "Perfavore, specifica un ruolo da settare!", embeds: [utilizzo] })
        if(!removeRole) return message.reply({ content: "Questo ruolo non esiste. Specifica un ruolo valido!" })

        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(!data) return message.reply({ content: "Il sistema di captcha non è stato settato in questo server!" })

          if(data) {
            data.RemoveRole = removeRole.id || removeRole
            data.save()
          }
          message.channel.send({ content: "**E' stato configurato con successo il ruolo da rimuovere!**" })
        })
      } else if(query === "on") {
        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(!data) return message.reply({ content: "Il sistema di captcha non è stato settato in questo server!" })

            if(data.Status === "enable") {
            message.reply({ content: "Il sistema di captcha è già stato attivato in questo server!" })
            } else {
             Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(data) {
                    data.Status = "enable";
                    data.save();
                    }
            message.channel.send({ content: `**Il sistema di captcha è stato attivato con successo in questo server!**` });
        });
        }
        })
     } else if(query === "off") {
        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(!data) return message.reply({ content: "Il sistema di captcha non è stato settato in questo server!" })

            if(data.Status === "disable") {
            message.reply({ content: "Il sistema di captcha è già stato disattivato in questo server!" })
            } else {
             Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(data) {
                    data.Status = "disable";
                    data.save();
                    }
            message.channel.send({ content: `**Il sistema di captcha è stato disattivato con successo in questo server!**` });
        });
        }
        })
     } else if(query === "action") {
       const action = args[1]
       if(!action) return message.reply({ content: "Perfavore, specifica l'azione che eseguirà il bot in caso un utente abbia finito il tempo a disposizione del captcha!\n**Default:** `Kick`\n\n**Azioni Disponibili:**\n\`ban\`\n\`kick\`\n\`mute\`\n**Nota:** va selezionato un ruolo per il mute!" })

       await Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
        if(data) {
            data.Action = action;
            data.save();

            message.channel.send({ content: "**L'azione da eseguire in caso l'utente finisce il tempo a disposizione è stata configurata con successo!**" })
    } else { 
      return message.reply({ content: "Il sistema di captcha non è stato settato in questo server!" })
    }
});
     } else if(query === "time") {
      const time = await args[1];
      if(!time) return message.reply({ embeds: [utilizzo] })
      const durationMS = ms(time)
      if(!durationMS) return interaction.reply({ content: "Perfavore, specifica una durata valida!\nEsempi:\n`1m` = 1 minuto\n`1h` = 1 ora\n`1d` = 1 giorno", ephemeral: true })

      await Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
        if(data) {
            data.Time = time;
            data.save();

            message.channel.send({ content: "**Il tempo a disposizione del captcha è stato configurato con successo!**" })
    } else { 
      return message.reply({ content: "Il sistema di captcha non è stato settato in questo server!" })
    }
});
     } else if(query === "mode") {
         const mode = args[1]
         if(!mode) return message.reply({ content: "Perfavore, specifica su quali utenti il bot deve eseguire la verifica, per esempio `30d` ( `30 giorni` ), se si vuole far verificare tutti gli utenti che entrano andrà scritto `all`!" })

        await Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
                data.Mode = mode;
                data.save();
        } else { 
          return message.reply({ content: "Il sistema di captcha non è stato settato in questo server!" })
        }
        if(data.Mode === "all") {
          message.channel.send({ content: `**Da ora la verifica captcha influirà tutti gli utenti che entreranno nel server!**` })
        } else {
        message.channel.send({ content: `**Da ora la verifica captcha influirà soltanto gli utenti che hanno un account creato da meno di ${mode} giorni!**` });
        }
    });
     } else if(query === "info") {
         const data = await Schema.findOne({ Guild: message.guild.id })
         if(data) {
           if(data.Mode === "all") {
             mode = "Tutti"
           } else {
             mode = `${data.Mode} Giorni`
           }
           if(data.Status === "enable") {
            Status = "Attivato"
           } else {
            Status = "Disattivato"
           }
           if(data.RemoveRole === "none") {
             RemoveRole = "`Nessun Ruolo Configurato`"
           } else {
             RemoveRole = `<@&${data.RemoveRole}>`
           }

           const durationMS = ms(data.Time)
           var tempo = ms(durationMS, { long: true });
            tempo = tempo + ""
            tempo = tempo.replace("second ", "secondo")
            tempo = tempo.replace("seconds", "secondi")
            tempo = tempo.replace("minute ", "minuto ")
            tempo = tempo.replace("minutes", "minuti")
            tempo = tempo.replace("hour ", "ora ")
            tempo = tempo.replace("hours", "ore")
            tempo = tempo.replace("day", "giorno")
            tempo = tempo.replace("days", "giorni")

             const embed = new Discord.MessageEmbed()
             .setTitle("**__Info Captcha__**")
             .setDescription("**Ecco tutte le info settate del captcha per questo server!**")
             .addField("**Status:**", `\`${Status}\``)
             .addField("**Canale Log:**", `<#${data.Channel}>`)
             .addField("**Ruolo Da Aggiungere:**", `<@&${data.AddRole}>`)
             .addField("**Ruolo Da Rimuovere:**", RemoveRole)
             .addField("**Modalità:**", `\`${mode}\``)
             .addField("**Azione:**", `\`${data.Action}\``)
             .addField("**Tempo:**", `\`${tempo}\``)
             .setTimestamp()
             .setColor("RANDOM")
             message.channel.send({ embeds: [embed] })
         } else {
            message.reply({ content: "Il sistema di captcha non è stato settato in questo server!" })
         }
     }
    },
};