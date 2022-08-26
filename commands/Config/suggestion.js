const Discord = require('discord.js')
const Schema = require('../../models/suggest')

const utilizzo = new Discord.MessageEmbed()
.setTitle("**__Utilizzo Del Comando:__**")
.setDescription(`
\`!suggest {argomento}\`

*Configura o visiona le informazioni del suggest system all'interno del server. Il bot creerà un sondaggio avanzato nel canale configurato!*

**Argomenti Disponibili:**
\`set {#canale}\` = per configurare il canale dei suggerimenti
\`info\` = per mostrare le informazioni del suggest system

**Esempi:**
\`!suggest set #canale-idee
!suggest info\`
`)
.setColor("RANDOM")
.setFooter("Los Angeles Full RP Bot Help System")
.setTimestamp()

module.exports = {
    name: "suggestion",
    UserPerms: ["ADMINISTRATOR"],
    timeout: 5000,
    premium: true,

    async run(bot, message, args) {

        const query = args[0]
        if(!query) return message.reply({ embeds: [utilizzo] })
        if(query !== "set" && query !== "info") return message.reply({ content: "Questo argomento non esiste. Specifica un argomento valido!", embeds: [utilizzo] })

        if(query === "set") {
        const channel = await message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        if(!args[1]) return message.reply({ content: "Perfavore, specifica un canale da settare!", embeds: [utilizzo] })
        if(!channel) return message.reply({ content: "Questo canale non esiste. Specifica un canale valido!" })

        await Schema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(data) {
                data.Channel = channel.id || channel;
                data.save();
            } else {
                new Schema({
                    Guild: message.guild.id,
                    Channel: channel.id || channel,
                }).save();
            }
            message.channel.send({ content: `**E' stato configurato con successo il suggest system in questo server!**` });
        });
      } else if(query === "info") {
         const data = await Schema.findOne({ Guild: message.guild.id })
         if(data) {
             const embed = new Discord.MessageEmbed()
             .setTitle("**__Info Suggestion__**")
             .setDescription("**Ecco tutte le info settate del sistema di suggerimenti per questo server!**")
             .addField("**Canale Suggerimenti:**", `<#${data.Channel}>`)
             .setTimestamp()
             .setColor("RANDOM")
             message.channel.send({ embeds: [embed] })
         } else {
            message.reply({ content: "Il sistema di suggest non è stato settato in questo server!" })
         }
     }
    },
};