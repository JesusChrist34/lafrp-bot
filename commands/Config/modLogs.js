const Discord = require('discord.js')
const Schema = require("../../models/modLogs")

const utilizzo = new Discord.MessageEmbed()
.setTitle("**__Utilizzo Del Comando:__**")
.setDescription(`
\`!mod-logs {argomento}\`

*Configura o visiona le informazioni dei mod-logs all'interno del server. Il bot manderà automaticamente tutti i log della moderazione (ban, kick etc..) nel canale configurato!*

**Argomenti Disponibili:**
\`set {#canale}\` = per configurare il canale dei mod-logs
\`info\` = per mostrare le informazioni dei mod-logs

**Esempi:**
\`!mod-logs set #mod-logs
!mod-logs info\`
`)
.setColor("RANDOM")
.setFooter("Los Angeles Full RP Bot Help System")
.setTimestamp()

module.exports = {
    name: "mod-logs",
    UserPerms: ["ADMINISTRATOR"],
    timeout: 5000,

    async run(bot, message, args) {

        const query = args[0]
        if(!query) return message.reply({ embeds: [utilizzo] })
        if(query !== "set" && query !== "info") return message.reply({ content: "Questo argomento non esiste. Specifica un argomento valido!", embeds: [utilizzo] })

        if(query === "set") {
        const channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        if(!args[1]) return message.reply({ content: "Perfavore, specifica un canale da settare!", embeds: [utilizzo] })
        if(!channel) return message.reply({ content: "Questo canale non esiste. Specifica un canale valido!" })

        await Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) data.delete();
            new Schema({
                Guild: message.guild.id,
                Channel: channel.id || channel,
            }).save();
            message.channel.send({ content: `**E' stato configurato con successo il canale dei mod-logs**` })
        })
      } else if(query === "info") {
         const data = await Schema.findOne({ Guild: message.guild.id })
         if(data) {
             const embed = new Discord.MessageEmbed()
             .setTitle("**__Info Mod-Logs__**")
             .setDescription("**Ecco tutte le info settate dei mod-logs per questo server!**")
             .addField("**Canale Log:**", `<#${data.Channel}>`)
             .setTimestamp()
             .setColor("RANDOM")
             message.channel.send({ embeds: [embed] })
         } else {
            message.reply({ content: "Il sistema di mod-logs non è stato settato in questo server!" })
         }
     }
    }
};