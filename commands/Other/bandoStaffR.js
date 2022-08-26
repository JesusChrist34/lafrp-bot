const Discord = require('discord.js');

module.exports = {
    name: "bsr",

    async run(bot, message, args) {

    if(!message.member.roles.cache.has("799045330548686868")) return message.reply('Non hai i permessi necessari per eseguire questo comando!');

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    message.delete()
    const embed = new Discord.MessageEmbed()
    .setTitle("**__Esito Bando Staff Scritto__**")
    .setDescription("**Ci dispiace annunciarti che il tuo bando staff scritto è stato __rifiutato__ dagli addetti assunzioni del Los Angeles Full RP 3.0.**")
    .setFooter("Potrai ritentare una prossima volta!")
    .setTimestamp()
    .setColor("GREEN")
    await user.send({ embeds: [embed] })
  }
};
