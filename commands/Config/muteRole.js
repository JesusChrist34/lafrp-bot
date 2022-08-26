const Discord = require('discord.js')
const muteSchema = require('../../models/muterole')

const utilizzo = new Discord.MessageEmbed()
.setTitle("**__Utilizzo Del Comando:__**")
.setDescription(`
\`!mute-role {argomento}\`

*Configura o visiona le informazioni del mute-role all'interno del server. Il bot aggiungerà in modo automatico il ruolo agli utenti che verranno mutati!*

**Argomenti Disponibili:**
\`set {@ruolo}\` = per configurare il ruolo per i mutati
\`info\` = per mostrare le informazioni del mute-role

**Esempi:**
\`!mute-role set @mutato
!mute-role info\`
`)
.setColor("RANDOM")
.setFooter("Los Angeles Full RP Bot Help System")
.setTimestamp()

module.exports = {
    name: "mute-role",
    UserPerms: ["ADMINISTRATOR"],
    timeout: 5000,

    async run(bot, message, args) {

        const query = args[0]
        if(!query) return message.reply({ embeds: [utilizzo] })
        if(query !== "set" && query !== "info") return message.reply({ content: "Questo argomento non esiste. Specifica un argomento valido!", embeds: [utilizzo] })

        if(query === "set") {
        const role = await message.mentions.roles.first() || message.guild.roles.cache.get(args[1])
        if(!args[0]) return message.reply({ content: "Perfavore, specifica un ruolo da settare!", embeds: [utilizzo] })
        if(!role) return message.reply({ content: "Questo ruolo non esiste. Specifica un ruolo valido!" })

        await muteSchema.findOne({ Guild: message.guild.id }, async(err, data) => {
            if(err) throw err
            if(data) {
                data.Role = role.id || role,
                data.save()

                message.channel.send({ content: `**Il mute-role è stato settato con successo in questo server!**` })
            } else {
                data = new muteSchema({
                    Guild: message.guild.id,
                    Role: role.id || role,
                })
                await data.save()
                message.channel.send({ content: `**Il mute-role è stato settato con successo in questo server!**` })
            }
        })
      } else if(query === "info") {
         const data = await muteSchema.findOne({ Guild: message.guild.id })
         if(data) {
             const embed = new Discord.MessageEmbed()
             .setTitle("**__Info Mute-Role__**")
             .setDescription("**Ecco tutte le info settate del mute-role per questo server!**")
             .addField("**Ruolo:**", `<@&${data.Role}>`)
             .setTimestamp()
             .setColor("RANDOM")
             message.channel.send({ embeds: [embed] })
         } else {
            message.reply({ content: "Non è stato configurato nessun mute-role in questo server!" })
         }
     }
    }
}