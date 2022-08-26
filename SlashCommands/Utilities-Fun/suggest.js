const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js")
const Schema = require("../../models/suggest")

module.exports = {
    name: "suggest",
    description: "Crea un suggerimento all'interno del server",
    timeout: 10000,
    premium: true,
    options: [
      {
        name: "messaggio",
        description: "Suggerimento da voler inviare",
        type: "STRING",
        required: true,
      }
    ],
    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

        const suggestionQuery = interaction.options.getString('messaggio');

        await Schema.findOne({ Guild: interaction.guild.id}, async(err, data) => {
            if(!data) return;

        const canale = interaction.guild.channels.cache.get(data.Channel);
        if(!canale) return interaction.followUp({ content: "Non è stato settato nessun canale per i suggerimenti!", ephemeral: true })

        const embed = new Discord.MessageEmbed()
            .setAuthor(interaction.user.tag, interaction.user.displayAvatarURL({ dynamic: true }))
            .setDescription(`**Nuovo Suggerimento: \n\`${suggestionQuery}\`**`)
            .setColor("ORANGE")
            .setTimestamp()
            .addField("\n**__Stato Suggerimento:__**", `**\`Suggerimento Inviato\`**`)
            .setFooter("Sistema di Suggest Los Angeles Full RP Bot", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")

            interaction.reply({ content: "**Suggerimento inviato con successo! Attendi un esito.**", ephemeral: true })
            await canale.send({ embeds: [embed], ephemeral: false, fetchReply: true }).then((msg) => {
              msg.react('<:Approvato:874719444188934174>')
              msg.react('<:Negato:807328110588330005>')
            })
  })
}
};