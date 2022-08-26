const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'report',
    description: 'Segnala un utente allo staff del server',
    timeout: 10000,
    premium: false,
    options: [
      {
        name: 'utente',
        description: 'Utente da voler segnalare',
        type: 'USER',
        required: true,
      },
      {
        name: 'motivi',
        description: 'Motivi per la quale segnalare l\'utente',
        type: 'STRING',
        required: true,
      },
    ],

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (bot, interaction, args) => {

      const user = interaction.options.getUser('utente')
      const motivi = interaction.options.getString('motivi')

    const embed = new Discord.MessageEmbed()
    .setTitle("**__Segnalazione Utente__**")
    .setDescription(`**La tua segnalazione è stata inviata con successo allo staff del Los Angeles Full RP 3.0!**`)
    .setFooter("Gli staffer analizzeranno la tua segnalazione e ti contatteranno il prima possibile in dm!")
    .setColor("RED")
    .setTimestamp()
    interaction.reply({ embeds: [embed], ephemeral: true })

    const canale = bot.channels.cache.get("799045682551324712")

    const embed2 = new Discord.MessageEmbed()
    .setTitle("**__Segnalazione Utente__**")
    .setDescription(`
**E' stato appena inviato un nuovo report.

__Autore:__ ${interaction.user.toString()}
__ID Autore:__ \`${interaction.user.id}\`
__Utente Segnalato:__ ${user}
__ID Utente Segnalato:__ \`${user.id}\`
__Motivo/i:__ \`${motivi}\`**
`)
    .setColor("RED")
    .setTimestamp()
    canale.send({ content: "[ <@&870667019442339840> ]", embeds: [embed2] })
        
    },
};