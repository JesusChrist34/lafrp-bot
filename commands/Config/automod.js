const Discord = require('discord.js')
const Schema = require('../../models/automod')

const utilizzo = new Discord.MessageEmbed()
.setTitle("**__Utilizzo Del Comando:__**")
.setDescription(`
\`!auto-mod {argomento}\`

*Configura, abilita, disabilita o visiona le informazioni dell'auto-mod system all'interno del server. Il bot eseguirà l'azione o auto eliminerà un warn automaticamente!*

**Argomenti Disponibili:**
\`set {numero warn} {azione ( ban / kick / mute )}\` = per configurare l'auto-mod
\`time {tempo}\` = per configurare un tempo di auto-eliminazione dei warn
\`on\` = per abilitare l'auto-mod system
\`off\` = per disabilitare l'auto-mod system
\`info\` = per mostrare le informazioni dell'auto-mod system

**Esempi:**
\`!auto-mod set 3 ban
!auto-mod time 7d
!auto-mod on
!auto-mod off
!auto-mod info\`
`)
.setColor("RANDOM")
.setFooter("Los Angeles Full RP Bot Help System")
.setTimestamp()

module.exports = {
    name: "auto-mod",
    UserPerms: ["ADMINISTRATOR"],
    timeout: 5000,

    async run(bot, message, args) {

        const query = args[0]
        if(!query) return message.reply({ embeds: [utilizzo] })
        if(query !== "set" && query !== "time" && query !== "on" && query !== "off" && query !== "info") return message.reply({ content: "Questo argomento non esiste. Specifica un argomento valido!", embeds: [utilizzo] })

        if(query === "set") {

        const warns = await args[1];
        if(!warns) return message.reply({ embeds: [utilizzo] })
        if(isNaN(args[1])) return message.reply({ content: "E' possibile inserire soltano numeri, per esempio `6` ( `6 warns` )!" });

        const action = args[2];
        if(!action) return message.reply({ content: `Perfavore, specifica un azione che eseguirà il bot al numero impostato di warns!\n\n**Azioni Disponibili:**\n\`ban\`\n\`kick\`\n\`mute\`\n**Nota:** va selezionato un ruolo per il mute!` })

        await Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
                data.Warns = warns;
                data.Action = action;
                data.Delete = "none";
                data.Status = "enable"
                data.save();
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Warns: warns,
                    Action: action,
                    Delete: "none",
                    Status: "enable"
                }).save();
            }
            message.channel.send({ content: `**E' stato configurato con successo l'auto-mod per questo server!**` });
        });
      } else if(query === "time") {
          const time = await args[1]
          if(!time) return message.reply({ content: "Perfavore, specifica un tempo!", embeds: [utilizzo] })
          const durationMS = ms(time)
          if(!durationMS) return interaction.reply({ content: "Perfavore, specifica una durata valida!\nEsempi:\n`1m` = 1 minuto\n`1h` = 1 ora\n`1d` = 1 giorno", ephemeral: true })

          await Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
                data.Delete = durationMS;
                data.save();
    
                message.channel.send({ content: `**Da ora il bot eliminerà automaticamente i warn dopo \`${time}\` giorni!**` })
        } else { 
          return message.reply({ content: "Il sistema di auto-mod non è stato settato in questo server!" })
        }
    });
      } else if(query === "on") {
        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(!data) return message.reply({ content: "Il sistema di auto-mod non è stato settato in questo server!" })

            if(data.Status === "enable") {
            message.reply({ content: "Il sistema di auto-mod è già stato attivato in questo server!" })
            } else {
             Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(data) {
                    data.Status = "enable";
                    data.save();
                    }
            message.channel.send({ content: `**Il sistema di auto-mod è stato attivato con successo in questo server!**` });
        });
        }
        })
     } else if(query === "off") {
        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(!data) return message.reply({ content: "Il sistema di auto-mod non è stato settato in questo server!" })

            if(data.Status === "disable") {
            message.reply({ content: "Il sistema di auto-mod è già stato disattivato in questo server!" })
            } else {
             Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(data) {
                    data.Status = "disable";
                    data.save();
                    }
            message.channel.send({ content: `**Il sistema di auto-mod è stato disattivato con successo in questo server!**` });
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
             if(data.Delete === "none") {
                 Elimina = "Disabilitata"
             } else {
                 Elimina = `${data.Delete} giorni`
             }
             const embed = new Discord.MessageEmbed()
             .setTitle("**__Info Auto-Mod__**")
             .setDescription("**Ecco tutte le info settate dell'auto-mod per questo server!**")
             .addField("**Status:**", `\`${Status}\``)
             .addField("**Numero Warns:**", `\`${data.Warns}\``)
             .addField("**Azione:**", `\`${data.Action}\``)
             .addField("**Auto-Eliminazione:**", `\`${Elimina}\``)
             .setTimestamp()
             .setColor("RANDOM")
             message.channel.send({ embeds: [embed] })
         } else {
            message.reply({ content: "Il sistema di auto-mod non è stato settato in questo server!" })
         }
     }
    },
};