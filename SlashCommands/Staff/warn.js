const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'warn',
    description: 'Inserisci un warn ad un utente',
    timeout: 10000,
    premium: false,
    options: [
      {
        name: 'utente',
        description: 'Utente da voler warnare',
        type: 'USER',
        required: true,
      },
      {
        name: 'motivo',
        description: 'Motivo/i per la quale warnare l\'utente',
        type: 'STRING',
        required: true,
      },
      {
        name: 'prove',
        description: 'Prove per inserire il warn',
        type: 'STRING',
        required: true,
      },
      {
        name: 'quantità',
        description: 'Quantità di warn da voler inserire',
        type: 'STRING',
        required: true,
        choices: [
          {
            name: "warn 1",
            value: "Warn N°1"
          },
          {
            name: "warn 2",
            value: "Warn N°2"
          },
          {
            name: "warn 3",
            value: "Warn N°3"
          },
          {
            name: "ban 1 giorno",
            value: "Ban 1 Giorno"
          },
          {
            name: "ban 3 giorni",
            value: "Ban 3 Giorni"
          },
          {
            name: "ban 1 settimana",
            value: "Ban 1 Settimana"
          },
          {
            name: "permaban",
            value: "Ban Perma"
          },
        ],
      },
      {
        name: 'id_ps4',
        description: 'Nickname PS4 dell\'utente',
        type: 'STRING',
        required: true,
      },
      {
        name: 'id_socialclub',
        description: 'Nickname social club dell\'utente',
        type: 'STRING',
        required: true,
      },
    ],

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (bot, interaction, args) => {

      if(!interaction.member.roles.cache.has("870667019442339840")) return interaction.reply({ content: "Non hai i permessi necessari per eseguire questo comando!", ephemeral: true });

      const user = interaction.options.getUser('utente')
      const motivo = interaction.options.getString('motivo')
      const prove = interaction.options.getString('prove')
      const quantità = interaction.options.getString('quantità')
      const idps4 = interaction.options.getString('id_ps4')
      const idsocialclub = interaction.options.getString('id_socialclub')

      const embed = new Discord.MessageEmbed()
      .setTitle("**<:Warn:875015411547140156> | __Warn / Ban__**")
      .setDescription(`
**1) Utente Punito:
-> ${user} \`( ${user.id} )\`
2) Motivo/i Warn / Ban:
-> \`${motivo}\`
3) Prove Warn / Ban:
-> \`${prove}\`
4) Quantità Warn / Ban:
-> \`${quantità}\`
5) Nick PS4 Utente:
-> \`${idps4}\`
6) Nick Social Club Utente:
-> \`${idsocialclub}\`
7) Autore Warn / Ban:
-> ${interaction.user} \`( ${interaction.user.id} )\`**
`)
      .setColor("RED")
      .setTimestamp()
      .setFooter("Lo staff vi ringrazia per l'attenzione!", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
      .setThumbnail(user.displayAvatarURL({ dynamic: true }))

      const canale = bot.channels.cache.get("1008373952189563001")
        
      interaction.reply({ content: "**Warn / Ban inserito con successo!**" })
      canale.send({ embeds: [embed] })
    },
};