const Discord = require('discord.js');
const backup = require('discord-backup');
const { Client, CommandInteraction } = require("discord.js");

module.exports = {
    name: "backup-info",
    description: "Mostra le informazioni su un backup",
    premium: true,
    UserPermissions: ["ADMINISTRATOR"],
    options: [
      {
        name: "id_backup",
        description: "ID backup da cui prendere le informazioni",
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

    const backupID = interaction.options.getString('id_backup')

    backup.fetch(backupID).then((backup) => {

        const date = new Date(backup.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(), mm = (date.getMonth()+1).toString(), dd = date.getDate().toString();
        const formattedDate = `${yyyy}/${(mm[1]?mm:"0"+mm[0])}/${(dd[1]?dd:"0"+dd[0])}`;

        const embed = new Discord.MessageEmbed()
            .setAuthor('Info Backup', backup.data.iconURL)
            .addField('**Nome Server:**', backup.data.name)
            .addField('**Grandezza:**', backup.size + ' kb')
            .addField('**Creato il:**', formattedDate)
            .setFooter('ID Backup: '+backup.id);

        return interaction.reply({ embeds: [embed], ephemeral: false });

    }).catch((err) => {

        if (err === 'No backup found')
            return interaction.reply({ content: `Nessun backup trovato per l'id \`${backupID}\`!`, ephemeral: true });
        else
            return interaction.reply({ content: "Si è verificato un errore interno, riprovare più tardi!", ephemeral: true });
    })
  }
}