const backup = require('discord-backup');
const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "backup-create",
    description: "Crea un backup del server",
    premium: true,
    UserPermissions: ["ADMINISTRATOR"],
    timeout: 20000,
    type: "CHAT_INPUT",
    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

    interaction.reply({ content: "Sto creando il backup... Questa operazione richiederà un pò di tempo!", ephemeral: false })

    backup.create(interaction.guild).then((backupData) => {

        return interaction.editReply({ content: `**Ho creato con successo il backup per questo server, segui le istruzioni sotto per poterlo utilizzare!\n\n__ID Backup:__ \`${backupData.id}\`\n__Utilizzo:__\n\`/backup-load ${backupData.id}\`**`, ephemeral: false });

    }).catch(() => {

        return interaction.editReply({ content: "Si è verificato un errore, riprova più tardi o contatta un developer!", ephemeral: true });
    })
}
}