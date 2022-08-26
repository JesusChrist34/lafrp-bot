const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const Schema = require("../../models/suggest");

module.exports = {
    name: 'deny-suggest',
    description: 'Rifiuta un suggerimento di un utente',
    UserPermissions: ['MANAGE_MESSAGES'],
    timeout: 5000,
    premium: true,
    options: [
      {
        name: 'id_messaggio',
        description: 'ID del messaggio del suggerimento da rifiutare',
        type: 'STRING',
        required: true,
      },
      {
        name: 'motivo',
        description: 'Motivo del rifiutamento',
        type: 'STRING',
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

        await Schema.findOne({ Guild: interaction.guild.id}, async(err, data) => {
        if(!data) return;
        
        const msg = interaction.options.getString('id_messaggio')
        const grund = interaction.options.getString('motivo') || "`Nessun commento!`"
        const suggestionChannel = interaction.guild.channels.cache.get(data.Channel);

        try {
            const suggestedEmbed = await suggestionChannel.messages.fetch(msg);
            const data = suggestedEmbed.embeds[0];

            const acceptEmbed = new Discord.MessageEmbed()
            .setAuthor(data.author.name, data.author.iconURL)
            .setDescription(data.description)
            .setColor("RED")
            .addField(`**__Stato Suggerimento:__**`, `**\`Suggerimento Rifiutato\`**`)
            .addField(`**__Commento Autore:__**`, grund)
            .setFooter("Sistema di Suggest Los Angeles Full RP Bot", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
            .setTimestamp();
    
            suggestedEmbed.reactions.removeAll()
            suggestedEmbed.edit({ embeds: [acceptEmbed] })
            interaction.reply({ content: "**Suggerimento rifiutato con successo!**" });
    
            const user = await bot.users.cache.find(
                (u) => u.tag === data.author.name
            );
            user.send({ content: `**Il tuo suggerimento è stato rifiutato!**\n**Autore: ${interaction.user}**\n**Commento Autore: \`${grund}\`**` });
        } catch (err) {
            console.log(err)
            interaction.reply({ content: "Hai provvisto un ID del messaggio errato! Questo suggerimento non esiste.", ephemeral: true })
            }
       })
    },
};