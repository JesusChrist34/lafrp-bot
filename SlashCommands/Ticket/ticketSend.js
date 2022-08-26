const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const Schema = require("../../models/ticket")
const { MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name: 'ticket-send',
    description: 'Invia un pannello di un ticket',
    UserPermissions: ['ADMINISTRATOR'],
    timeout: 10000,
    premium: false,
    options: [
      {
        name: 'id_pannello',
        description: 'ID del pannello da voler inviare',
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
        
        var button1 = new MessageButton()
        .setLabel("Crea Ticket")
        .setStyle("PRIMARY")
        .setEmoji("📩")
        .setCustomId("Ticket")
        var row = new MessageActionRow()
        .addComponents(button1)

        const id = interaction.options.getString('id_pannello')

        const data = await Schema.findOne({ ID: id, Guild: interaction.guild.id })
        if(!data?.ID) return interaction.reply({ content: "Hai provvisto un ID del pannello errato! Questo pannello non esiste.", ephemeral: true });

        var embed = new Discord.MessageEmbed()
        .setTitle(data.Name)
        .setDescription("**Clicca il bottone qui di seguito per poter aprire un ticket!**")
        .setColor("#0bf0e0")
        .setFooter("Sistema di Tickets Los Angeles Full RP Bot", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")

        const panel = await interaction.channel.send({ embeds: [embed], components: [row] })
            if(data) {
                data.ID = panel.id;
                data.save();
            }
            interaction.reply({ content: `**E' stato ri-inviato con successo il pannello dei tickets!\n__ID Pannello:__ \`${data.ID}\`**`, ephemeral: true });
    },
};