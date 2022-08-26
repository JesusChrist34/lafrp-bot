const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "role-info",
    description: "Mostra le informazioni su un ruolo",
    options: [
      {
        name: "ruolo",
        description: "Ruolo da cui prendere le informazioni",
        type: "ROLE",
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

        const ruolo = interaction.options.getRole('ruolo');

        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " giorno" : " giorni") + " fa";
        };

        var memberCount = interaction.guild.members.cache.filter(member => member.roles.cache.find(role => role == ruolo)).size;

        var embed = new Discord.MessageEmbed()
            .setTitle("**Informazioni Ruolo**")
            .setDescription("**Tutte le info su questo ruolo**")
            .addField("**Nome Ruolo:**", `\`${ruolo.name}\``, true)
            .addField("**ID Ruolo:**", `\`${ruolo.id}\``, true)
            .addField("**Membri:**", `\`${memberCount}\``, true)
            .addField("**Colore:**", `\`${ruolo.hexColor}\``, true)
            .addField("**Posizione:**", `\`${ruolo.position}\``, true)
            .addField("**Ruolo Creato:**", `\`${ruolo.createdAt.toUTCString().substr(0, 16)}\` ( \`${checkDays(ruolo.createdAt)}\` )`, true)
            .addField("**Separato?**", `\`${ruolo.hoist ? "Si" : "No"}\``, true)
            .addField("**Menzionabile?**", `\`${ruolo.mentionable ? "Si" : "No"}\``, true)

        interaction.reply({ embeds: [embed], ephemeral: false })
    }
}