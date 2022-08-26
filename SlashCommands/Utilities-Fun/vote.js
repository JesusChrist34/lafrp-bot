const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "vote",
    description: "Inizia un sondaggio per bannare un'utente",
    options: [
      {
        name: "utente",
        description: "utente da voler far bannare",
        type: "USER",
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
        const user = interaction.options.getUser('utente');

    const voteembed = new Discord.MessageEmbed()
    .setTitle("**__Sondaggio Ban!__**")
    .setDescription(`**Volete che ${user} viene bannato dal server?**`)
    .setFooter("Sondaggio fatto da " + interaction.user.tag, "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setColor("RANDOM")

    await interaction.reply({ embeds: [voteembed], ephemeral: false, fetchReply: true }).then((msg) => {
      msg.react('<:Approvato:874719444188934174>')
      msg.react('<:Negato:807328110588330005>')
    })
  }
}