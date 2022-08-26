const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'scritto',
    description: 'Accetta il background pg di un utente',
    timeout: 10000,
    premium: false,
    options: [
      {
        name: 'utente',
        description: 'Utente a cui accettare il background pg',
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

      const user = interaction.options.getMember('utente')

    const scrittoembed = new Discord.MessageEmbed()
    .setTitle("**__Esito Whitelist Scritta!__**")
    .setDescription(`**Complimenti ${user}, ha passato il modulo del background pg del server, contatti un whitelist manager quando sarà disponibile per il provino orale.**`)
    .setFooter("Buona fortuna per la whitelist orale!", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("RANDOM")
    interaction.reply({ embeds: [scrittoembed] })
    await user.roles.add("799045457779097650")
    await user.roles.remove("799045458566578176")

    },
};