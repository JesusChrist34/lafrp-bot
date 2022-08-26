const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js")
const backup = require('discord-backup');
const { MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name: "backup-load",
    description: "Carica un backup all'interno del server",
    timeout: 30000,
    premium: true,
    UserPermissions: ["ADMINISTRATOR"],
    BotPerms: ["MANAGE_CHANNELS", "MANAGE_ROLES", "MANAGE_GUILD"],
    options: [
      {
        name: "id_backup",
        description: "ID del backup da caricare",
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
        let owner = await interaction.guild.fetchOwner()

        if(interaction.user.id !== owner.id) return interaction.reply({ content: "Questo comando potrà eseguirlo soltanto il proprietario del server!", ephemeral: true })

    const backupID = interaction.options.getString('id_backup')

    var button1 = new MessageButton()
        .setStyle("SUCCESS")
        .setEmoji("874719444188934174")
        .setCustomId("Conferma")
    var button2 = new MessageButton()
        .setStyle("DANGER")
        .setEmoji("807328110588330005")
        .setCustomId("Annulla")

    var row = new MessageActionRow()
        .addComponents(button1)
        .addComponents(button2)

    await interaction.reply({ content: '**:warning: Tutti i canali del server, ruoli, impostazioni, verranno resettate. Sei sicuro di voler continuare?**', components: [row], ephemeral: false })

    const filter = i => i.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000, errors: ['time'] });

    collector.on('collect', async i => {
        if (i.customId === 'Conferma') {
            collector.stop("confirmed")
            backup.fetch(backupID).then( async() => {

            backup.load(backupID, interaction.guild).then(() => {

                return interaction.user.send({ content: '**Il backup è stato caricato con successo!**' });
        
            }).catch((err) => {
        
                if (err === 'No backup found')
        return interaction.editReply({ content: `Nessun backup trovato per l'id \`${backupID}\`!`, ephemeral: true });
    else
        return interaction.editReply({ content: "Si è verificato un errore interno, riprovare più tardi oppure utilizzare un altro backup!", ephemeral: true });
        
        });
    })

        } else if(i.customId === "Annulla") {
            await interaction.editReply({ content: `Cancellato il processo di caricare il backup!`, components: [], ephemeral: true })
            collector.stop("annulled")
        }
       });
    
    collector.on("end", async (i, reason) => {
        if(reason === "time") {
            await interaction.editReply({ content: `Non hai cliccato un bottone entro il tempo limite ( 30 secondi )! Riprova di nuovo.`, components: [], ephemeral: true })
        } else return;
      })
    }
}