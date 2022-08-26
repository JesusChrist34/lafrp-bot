const Discord = require('discord.js')
const { antijoin } = require("../../Collection")

const utilizzo = new Discord.MessageEmbed()
.setTitle("**__Utilizzo Del Comando:__**")
.setDescription(`
\`!anti-raid {argomento}\`

*Attiva, disabilita o ricevi una lista dei membri espulsi dall'anti-raid system all'interno del server. Il bot espellerà tutti i membri che entreranno se attivo!*

**Argomenti Disponibili:**
\`on\` = per abilitare l'anti-raid system
\`off\` = per disabilitare l'anti-raid system
\`list\` = per mostrare tutti gli utenti espulsi dall'anti-raid system

**Esempi:**
\`!anti-raid on
!anti-raid off
!anti-raid list\`
`)
.setColor("RANDOM")
.setFooter("Los Angeles Full RP Bot Help System")
.setTimestamp()

module.exports = {
    name: "anti-raid",
    UserPerms: ["ADMINISTRATOR"],
    timeout: 5000,

    async run(bot, message, args) {

        const query = args[0]
        if(!query) return message.reply({ embeds: [utilizzo] })
        if(query !== "on" && query !== "off" && query !== "list") return message.reply({ content: "Questo argomento non esiste. Specifica un argomento valido!", embeds: [utilizzo] })

        const getCollection = antijoin.get(message.guild.id)
        if(query === "on") {
            if(getCollection) return message.reply({ content: "Il sistema di anti raid è già stato attivato in questo server!" })

            antijoin.set(message.guild.id, [])
            message.channel.send({ content: "**Il sistema di anti raid è stato attivato con successo in questo server!**" })
        } else if(query === "off") {
            if(!getCollection) return message.reply({ content: "Il sistema di anti raid è già stato disabilitato in questo server!" })

            antijoin.delete(message.guild.id)
            message.channel.send({ content: "**Il sistema di anti raid è stato disabilitato con successo in questo server!**" })
        } else if(query === "list") {
            if(!getCollection) return message.reply({ content: "Il sistema di anti raid è disabilitato in questo server, per cui non è possibile eseguire questo comando!" })
            message.channel.send({ content:
                `**__Utenti Espulsi:__** ${getCollection.map((value) => {
                    return `\`${value.tag}\` ( \`${value.id}\` )`
                })}`
            }).join("\n\n")
        }
    }
};