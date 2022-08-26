const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "user-info",
    description: "Mostra le informazioni su un utente",
    options: [
      {
        name: "utente",
        description: "Utente da cui prendere le info",
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

        const utente = interaction.options.getMember('utente');
        
        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " giorno" : " giorni") + " fa";
        };

        const embed = new Discord.MessageEmbed()
        .setTitle(utente.user.tag)
        .setDescription("**Tutte le info di questo utente**")
        .setThumbnail(utente.avatarURL())
        .addField("**ID Utente:**", `\`${utente.id}\``, true)
        .addField("**Status:**", `\`${utente.presence.status}\``, true)
        .addField("**Ruolo Più Alto:**", `<@&${utente.roles.highest.id}>`)
        .addField("**E' Un Bot?**", `\`${utente.user.bot ? "Si" : "No"}\``, true)
        .addField("**Account Creato:**", `\`${utente.user.createdAt.toUTCString().substr(0, 16)}\` ( \`${checkDays(utente.user.createdAt)}\` )`, true)
        .addField("**Entrato Nel Server:**", `\`${utente.joinedAt.toUTCString().substr(0, 16)}\` ( \`${checkDays(utente.joinedAt)}\` )`, true)
        .addField("**Ruoli:**", `\`${utente.roles.cache.map(ruolo => ruolo.name).join("\n")}\``, false)

      interaction.reply({ embeds: [embed], ephemeral: false })
    }
}