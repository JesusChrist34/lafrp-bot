const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'police-off',
    description: 'Non concedere più la possibilità di fare azioni criminali',
    timeout: 5000,
    premium: false,

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (bot, interaction, args) => {
        
    const wlembed = new Discord.MessageEmbed()
    .setTitle("**__Azioni Criminali Offline!__**")
    .setDescription(`**Lo staff comunica che per il momento non sono più concesse le azioni criminali. Restate aggiornati per scoprire quando verranno nuovamente concesse!**`)
    .setFooter("Buona Permanenza", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("RED")
    interaction.reply({ embeds: [wlembed] }) 
    },
};