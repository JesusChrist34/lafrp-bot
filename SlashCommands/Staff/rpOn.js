const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const Schema = require("../../models/sondaggi")

module.exports = {
    name: 'rpon',
    description: 'Manda la sessione di RP online',
    timeout: 10000,
    premium: false,

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (bot, interaction, args) => {
        
        if(!interaction.member.roles.cache.has("799045332742438952")) return interaction.reply({ content: "Non hai i permessi necessari per eseguire questo comando!", ephemeral: true });

    const data = await Schema.findOne({ Guild: interaction.guild.id });
    if(!data) return;

    const embedrpon = new Discord.MessageEmbed()
    .setTitle("<:wumpus_meccanico:875013756650921985> **__RP ON__!** <:wumpus_meccanico:875013756650921985>")
    .setDescription(`**<a:Accettato:875017575216603136> Per unirsi alla sessione seguite questi passaggi:** \`"options" -> "crew" -> "le mie crew" -> "premete x sulla nostra crew" -> "visualizza membri"\` **e vi unite da ${interaction.user}  in questo caso. In mancanza del creatore della sessione fate gli stessi passaggi ma provate ad unirvi da un membro della crew. Ricordiamo di iniziare il turno lavorativo su <#960545934805176340> con il comando:** \`!inizio-turno @grado\` **del lavoro. <a:Accettato:875017575216603136>
__Host Sessione__**: ${interaction.user}`)
    .setColor("GREEN")
    .setImage("https://media.discordapp.net/attachments/844701498116931604/862254861819183124/giphy_3.gif")
    .setFooter("Lo staff vi augura un ottima permanenza", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    interaction.reply({ content: "[ <@&799045453462503445> ]", embeds: [embedrpon] })

    const canale = await interaction.guild.channels.cache.get("971648594727829504")

    const msg = await canale.messages.fetch(data.Msg)

    await data.delete()
    await msg.delete()
    },
};