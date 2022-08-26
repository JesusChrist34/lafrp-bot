const Discord = require('discord.js')

module.exports = {
    name: 'bando-chiuso',
    description: 'Chiudi un bando all\'interno del server',
    premium: false,
    timeout: 5000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {
        
    const embed = new Discord.MessageEmbed()
    .setTitle("**<:Negato:807328110588330005> ┃ __Bando Chiuso__**")
    .setDescription("**Annunciamo che il bando per questo lavoro è attualmente chiuso. Verrete avvisati quando il bando verrà riaperto!**")
    .setColor("RED")
    .setFooter("~ La Dirigenza", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg");
    message.channel.send({ embeds: [embed] })
    message.delete()
    },
};