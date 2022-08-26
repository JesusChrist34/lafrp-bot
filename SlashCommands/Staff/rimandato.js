const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'rimandato',
    description: 'Rifiuta la whitelist di un utente',
    timeout: 5000,
    premium: false,
    options: [
      {
        name: 'utente',
        description: 'Utente a cui rifiutare la whitelist',
        type: 'USER',
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

      if(!interaction.member.roles.cache.has("799045333413920858")) return interaction.reply({ content: "Non hai i permessi necessari per eseguire questo comando!", ephemeral: true });

      const user = interaction.options.getUser("utente")

    const nowlembed = new Discord.MessageEmbed()
    .setTitle("**__Esito Whitelist!__**")
    .setDescription(`**Ci dispiace annunciarle ${user}, che lei è stato/a __RIMANDATO/A__. Non è risultato idoneo a passare la whitelist del server, ritenti tra 1 ora.\n\n‼️Mi raccomando‼️ si prepari meglio sul nostro __Regolamento⬇️__**\n[Regolamento](https://1drv.ms/w/s!AsbpqH4lmhB5gQ_WxREZ2o6QdcnY)`)
    .setColor("RED")
    .setTimestamp()
    interaction.reply({ content: interaction.user.toString(), embeds: [nowlembed] }) 
    },
};