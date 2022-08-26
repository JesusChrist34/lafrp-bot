const Discord = require('discord.js')
const Schema = require("../models/sondaggi")
const bot = require("../index")
const { MessageButton, MessageActionRow } = require("discord.js")

bot.on("interactionCreate", async (interaction) => {

    if (!interaction.isButton()) return;

    const data = await Schema.findOne({ Guild: interaction.guild.id });
    if(!data) return;

    try{
  
    if(interaction.user.bot) return console.log("hey, un bot ci ha provato")

    if (interaction.customId == "Partecipa") {

        for (let object of data.Partecipanti) {
            if(interaction.user.id == object.User) return interaction.reply({ content: "Hai già registrato la tua partecipazione a questo sondaggio!", ephemeral: true })
        }

        if(data) {
            const object = {
                User: interaction.user.id
            }
            data.Partecipanti.push(object)
        }
        data.save()

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
        .setEmoji("875053045325643806")
        .setCustomId("Elimina-Sondaggio")

        const row = new MessageActionRow()
        .addComponents(button1)
        .addComponents(button2)
        .addComponents(button3)

        interaction.reply({ content: `**La tua partecipazione per questo sondaggio è stata registrata con successo!**`, ephemeral: true })

        const msg = await interaction.channel.messages.fetch(data.Msg)

        const embed = new Discord.MessageEmbed()
        .setColor("ORANGE")
        .setTitle('<:Voto:874719480469655623> **__Sondaggio RP__** <:Voto:874719480469655623>')
        .setDescription(`
**Nuovo sondaggio per RP!

__Host Previsto:__ <@${data.Author}>
__Orario:__ \`${data.Orario}\`
__Partecipanti:__ \`${data.Partecipanti.length}\`

Clicca sul bottone \`Partecipa\` per poter prenotare la tua partecipazione nella sessione di RP!**
`)
        .setTimestamp()
        .setFooter("Sondaggio Creato", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")

        msg.edit({ embeds: [embed], components: [row] })
    }

    if(interaction.customId == "Partecipanti") {
        const embed = new Discord.MessageEmbed()
        .setTitle("**__Lista Partecipanti__**")
        .setDescription(`**Ecco la lista di tutti i partecipanti per questo sondaggio:**\n\n` + data.Partecipanti.map(
        (w, i) => 
        `**\`${i + 1})\` Utente: <@${interaction.guild.members.cache.get(w.User).id}>**`).join("\n\n")
        )
        .setColor("BLUE")
        .setTimestamp()

        interaction.reply({ embeds: [embed], ephemeral: true })
    }

    if(interaction.customId == "Elimina-Sondaggio") {
        if(!interaction.member.roles.cache.has("870667019442339840")) return interaction.reply({ content: "Soltanto gli staffer possono eliminare i sondaggi dell'rp!", ephemeral: true })

        const msg = await interaction.channel.messages.fetch(data.Msg)

        interaction.reply(`**<@${interaction.user.id}> questo sondaggio è stato eliminato con successo!**`)

        await data.delete()
        await msg.delete()
    }

  } catch(err) {
      console.log(err)
  }
});