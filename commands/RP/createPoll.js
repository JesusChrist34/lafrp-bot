const Discord = require('discord.js')
const Schema = require("../../models/sondaggi")
const { MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name: "create-poll",
    timeout: 5000,

    async run(bot, message, args) {
      if(message.channel.id !== "971648594727829504") return message.reply("Questo comando può essere utilizzato soltanto in <#971648594727829504>")

        if(!message.member.roles.cache.has("799045332742438952")) return message.reply("Non hai i permessi necessari per poter utilizzare questo comando!")

        const button1 = new MessageButton()
        .setLabel("Partecipa")
        .setStyle("SUCCESS")
        .setEmoji("875017696834625609")
        .setCustomId("Partecipa")

        const button2 = new MessageButton()
        .setLabel("Partecipanti")
        .setStyle("PRIMARY")
        .setEmoji("875019111921500201")
        .setCustomId("Partecipanti")

        const button3 = new MessageButton()
        .setLabel("Elimina")
        .setStyle("DANGER")
        .setEmoji("875017627058204763")
        .setCustomId("Elimina-Sondaggio")

        const row = new MessageActionRow()
        .addComponents(button1)
        .addComponents(button2)
        .addComponents(button3)

        const orario = args[0]
        if(!orario) return message.reply("Perfavore, specifica un orario in cui verrà startata la sessione!")

        const pollembed = new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setTitle('<:Voto:874719480469655623> **__Sondaggio RP__** <:Voto:874719480469655623>')
        .setDescription(`
**Nuovo sondaggio per RP!

__Host Previsto:__ ${message.author.toString()}
__Orario:__ \`${orario}\`
__Partecipanti:__ \`1\`

Clicca sul bottone \`Partecipa\` per poter prenotare la tua partecipazione nella sessione di RP!**
`)
        .setTimestamp()
        .setFooter("Sondaggio Creato", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")

        const data = await Schema.findOne({ Guild: message.guild.id })

        if(data) {
            const msgURL = await message.channel.messages.fetch(data.Msg)
            const embed = new Discord.MessageEmbed()
            .setTitle("**__Sondaggio In Corso__**")
            .setDescription(`
**E' già in corso un altro sondaggio per l'RP, annulla prima [questo sondaggio](${msgURL.url}) per poterne creare un altro!**            
`)
            .setColor("RED")
            .setTimestamp()
            return message.reply({ embeds: [embed] })
        } else {
            const msg = await message.channel.send({ content: "[ <@&799045453462503445> ]", embeds: [pollembed], components: [row] })
            msg.pin()
            
            new Schema({
                Guild: message.guild.id,
                Author: message.author.id,
                Orario: orario,
                Msg: msg.id,
                Partecipanti: [{
                  User: message.author.id
                }]
            }).save();
        }

        message.delete()
    }
}