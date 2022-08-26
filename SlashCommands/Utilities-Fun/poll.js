const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "poll",
    description: "Crea un sondaggio all'interno del server",
    options: [
      {
        name: "messaggio",
        description: "Messaggio inerente al sondaggio",
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

        const msg = interaction.options.getString('messaggio');
        const user = interaction.user.tag

        const poll = new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle('<:Voto:874719480469655623>**__Sondaggio!__**<:Voto:874719480469655623>')
        .setDescription(msg)
        .setTimestamp()
        .setFooter("Sondaggio fatto da " + user, "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
        
        await interaction.reply({ embeds: [poll], ephemeral: false, fetchReply: true }).then((msg) => {
          msg.react("874719444188934174")
          msg.react("807328110588330005")
        })
    }
}