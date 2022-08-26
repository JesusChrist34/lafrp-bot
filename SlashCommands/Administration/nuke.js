const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const { MessageButton, MessageActionRow } = require("discord.js")

module.exports = {
    name: 'nuke',
    description: 'Elimina e ricrea il canale in cui viene eseguito il comando',
    UserPermissions: ['MANAGE_CHANNELS'],
    BotPerms: ['MANAGE_CHANNELS'],
    timeout: 6500,
    premium: false,

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (bot, interaction, args) => {

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
    
    interaction.reply({ content: "**Sei sicuro di voler nukkare questo canale? Questa azione cancellerà e ricreerà il canale. L'azione non potrà essere annullata!**", components: [row], ephemeral: false })

    const filter = i => i.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({ filter, time: 30000, errors: ['time'] });

collector.on('collect', async i => {
	if (i.customId === 'Conferma') {
	var channel = bot.channels.cache.get(interaction.channel.id)
    
    var posisi = channel.position
    
    channel.clone().then((channel2) => {
        
        channel2.setPosition(posisi)
    
        channel.delete()
    })
    collector.stop("confirmed")
	} else if(i.customId === "Annulla") {
        await interaction.editReply({ content: `Processo di nuke del canale annullato con successo!`, components: [], ephemeral: true })
        collector.stop("annulled")
    }
   });

collector.on("end", async (i, reason) => {
    if(reason === "time") {
        await interaction.editReply({ content: `Non hai cliccato un bottone entro il tempo limite (30 secondi)! Riprova di nuovo.`, components: [], ephemeral: true })
    } else return;
  })
 },
};