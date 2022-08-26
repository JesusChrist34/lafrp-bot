const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'aggiunta-ruoli',
    description: 'Inoltra una richiesta allo staff per l\'aggiunzione di uno o più ruoli',
    timeout: 5000,
    premium: false,
    options: [
      {
        name: 'ruolo_1',
        description: 'Il primo ruolo da voler richiedere',
        type: 'ROLE',
        required: true,
      },
      {
        name: 'ruolo_2',
        description: 'Il secondo ruolo da voler richiedere',
        type: 'ROLE',
        required: false,
      },
      {
        name: 'ruolo_3',
        description: 'Il terzo ruolo da voler richiedere',
        type: 'ROLE',
        required: false,
      },
      {
        name: 'ruolo_4',
        description: 'Il quarto ruolo da voler richiedere',
        type: 'ROLE',
        required: false,
      },
    ],

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (bot, interaction, args) => {
        
      const role1 = interaction.options.getRole('ruolo_1') || "`Nessun Ruolo Richiesto`"
      const role2 = interaction.options.getRole('ruolo_2') || "`Nessun Ruolo Richiesto`"
      const role3 = interaction.options.getRole('ruolo_3') || "`Nessun Ruolo Richiesto`"
      const role4 = interaction.options.getRole('ruolo_4') || "`Nessun Ruolo Richiesto`"

    const embed = new Discord.MessageEmbed()
    .setTitle("**__Richiesta Aggiunzione Ruoli__**")
    .setDescription(`**La tua richesta è stata inviata con successo agli addetti ruoli del Los Angeles Full RP 3.0!**`)
    .setFooter("Ti preghiamo di avere pazienza e di non importunare lo staff!")
    .setColor("GREEN")
    .setTimestamp()
    interaction.reply({ embeds: [embed], ephemeral: true })

    const canale = bot.channels.cache.get("799045681657806878")

    const embed2 = new Discord.MessageEmbed()
    .setTitle("**__Richiesta Aggiunzione Ruoli__**")
    .setDescription(`
**E' stata appena inviata una nuova richiesta di aggiunzione ruoli.

__Autore:__ ${interaction.user.toString()}
__ID Autore:__ \`${interaction.user.id}\`
__Ruolo N°1:__ ${role1}
__Ruolo N°2:__ ${role2}
__Ruolo N°3:__ ${role3}
__Ruolo N°4:__ ${role4}**
`)
    .setColor("GREEN")
    .setTimestamp()
    canale.send({ content: `[ <@&799045325948059689>, ${interaction.user.toString()} ]`, embeds: [embed2] })

    },
};