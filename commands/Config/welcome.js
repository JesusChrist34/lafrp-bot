const Discord = require('discord.js')
const Schema = require('../../models/welcome')

const utilizzo = new Discord.MessageEmbed()
.setTitle("**__Utilizzo Del Comando:__**")
.setDescription(`
\`!welcome {argomento}\`

*Configura, abilita, disabilita o visiona le informazioni del welcome system all'interno del server. Il bot darà in modo automatico il benvenuto a tutti gli utenti che entreranno nel server basandosi sul canale e sul messaggio configurato!*

**Argomenti Disponibili:**
\`set {#canale} {messaggio}\` = per configurare il welcome system
\`on\` = per abilitare il welcome system
\`off\` = per disabilitare il welcome system
\`info\` = per mostrare le informazioni del welcome system

**Lista Variabili:**
\`{user_mention}\` = per poter menzionare l'utente
\`{user_name}\` = per avere il nome ed il tag dell'utente
\`{user_id}\` = per avere l'id dell'utente
\`{server_name}\` per avere il nome del server
\`{member_count}\` = per avere il numero degli utenti nel server

**Esempi:**
\`!welcome set #benvenuto Benvenuto all'interno del server {user_mention}
!welcome on
!welcome off
!welcome info\`
`)
.setColor("RANDOM")
.setFooter("Los Angeles Full RP Bot Help System")
.setTimestamp()

module.exports = {
    name: "welcome",
    UserPerms: ["ADMINISTRATOR"],
    timeout: 5000,

    async run(bot, message, args) {

        const query = args[0]
        if(!query) return message.reply({ embeds: [utilizzo] })
        if(query !== "set" && query !== "info" && query !== "on" && query !== "off") return message.reply({ content: "Questo argomento non esiste. Specifica un argomento valido!", embeds: [utilizzo] })

        if(query === "set") {

        const channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        if(!args[1]) return message.reply({ content: "Perfavore, specifica un canale da settare!", embeds: [utilizzo] })
        if(!channel) return message.reply({ content: "Questo canale non esiste. Specifica un canale valido!" })

        const msg = args.slice(2).join(" ");
        if(!msg) return message.reply({ content: "Perfavore, specifica un messaggio da settare!", embeds: [utilizzo] })

        await Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
                data.Channel = channel.id || channel;
                data.WelcomeMsg = msg;
                data.Status = "enable"
                data.save();
            } else {
                new Schema({
                    Guild: message.guild.id,
                    WelcomeMsg: msg,
                    Channel: channel.id || channel,
                    Status: "enable"
                }).save();
            }
            message.channel.send({ content: `**E' stato configurato con successo il welcome system all'interno del server!**` });
        });
      } else if(query === "on") {
        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(!data) return message.reply({ content: "Il sistema di welcome non è stato settato in questo server!" })

            if(data.Status === "enable") {
            message.reply({ content: "Il sistema di welcome è già stato attivato in questo server!" })
            } else {
             Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(data) {
                    data.Status = "enable";
                    data.save();
                    }
            message.channel.send({ content: `**Il sistema di welcome è stato attivato con successo in questo server!**` });
        });
        }
        })
     } else if(query === "off") {
        Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
          if(!data) return message.reply({ content: "Il sistema di welcome non è stato settato in questo server!" })

            if(data.Status === "disable") {
            message.reply({ content: "Il sistema di welcome è già stato disattivato in questo server!" })
            } else {
             Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
                if(data) {
                    data.Status = "disable";
                    data.save();
                    }
            message.channel.send({ content: `**Il sistema di welcome è stato disattivato con successo in questo server!**` });
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
             .setTitle("**__Info Welcome__**")
             .setDescription("**Ecco tutte le info settate del welcome per questo server!**")
             .addField("**Status:**", `\`${Status}\``)
             .addField("**Canale Benvenuto:**", `<#${data.Channel}>`)
             .addField("**Messaggio Di Benvenuto:**", `\`\`\`${data.WelcomeMsg}\`\`\``)
             .setTimestamp()
             .setColor("RANDOM")
             message.channel.send({ embeds: [embed] })
         } else {
            message.reply({ content: "Il sistema di welcome non è stato settato in questo server!" })
         }
     }
    },
};