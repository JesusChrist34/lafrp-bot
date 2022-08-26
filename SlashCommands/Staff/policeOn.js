const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'police-on',
    description: 'Concedi la possibilità di poter fare azioni criminali',
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
    .setTitle("**__Azioni Criminali Online!__**")
    .setDescription(`**Lo staff comunica che sono appena state concesse le azioni criminali. Affrettatevi a farle prima che potrebbero non essere più concesse!**`)
    .setFooter("Buona Permanenza", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("GREEN")
    interaction.reply({ embeds: [wlembed] }) 
    },
};