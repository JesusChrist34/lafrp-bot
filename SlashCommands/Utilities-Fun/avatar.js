const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "avatar",
    description: "Mostra l'avatar di un utente",
    options: [
      {
        name: "utente",
        description: "Utente da cui prendere l'avatar",
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

        var utente = interaction.options.getMember('utente')

        const embed = new Discord.MessageEmbed()
            .setTitle("**__Avatar__**")
            .setDescription(`**Avatar di ${utente.toString()}**\n\n**Altri formati:** **[.gif](${utente.displayAvatarURL({ dynamic: true, size: 1024, format: `gif` })})** | **[.jpeg](${utente.displayAvatarURL({ dynamic: false, size: 1024, format: `jpeg` })})** | **[.webp](${utente.displayAvatarURL({ dynamic: false, size: 1024, format: `webp` })})** | **[.png](${utente.displayAvatarURL({ dynamic: false, size: 1024, format: `png` })})**`)
            .setImage(utente.displayAvatarURL({
                dynamic: true,
                format: "png",
                size: 1024
            }))

        interaction.reply({ embeds: [embed], ephemeral: false })
    },
};