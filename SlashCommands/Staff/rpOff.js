const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'rpoff',
    description: 'Manda la sessione di RP offline',
    timeout: 5000,
    premium: false,

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (bot, interaction, args) => {
        
      if(!interaction.member.roles.cache.has("799045332742438952")) return interaction.reply({ content: "Non hai i permessi necessari per eseguire questo comando!", ephemeral: true });
      
    const embedrpoff = new Discord.MessageEmbed()
    .setTitle("<:wumpus_meccanico:875013756650921985> **__RP OFF__!** <:wumpus_meccanico:875013756650921985>")
    .setDescription(`**<a:Negato_gif:885156534647140383> Vi ricordiamo di finire il turno su <#960545934805176340> con il comando:** \`!fine-turno @grado\` **del lavoro e di compilare il modulo su <#799045635239706654>. <a:Negato_gif:885156534647140383>**`)
    .setColor("RED")
    .setImage("https://media.discordapp.net/attachments/844701498116931604/862254861238927370/giphy_2.gif")
    .setFooter("Lo staff vi augura un ottima permanenza", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    interaction.reply({ content: "[ <@&799045453462503445> ]", embeds: [embedrpoff] })
    },
};