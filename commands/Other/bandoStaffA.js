const Discord = require('discord.js');

module.exports = {
    name: "bsa",

    async run(bot, message, args) {

    if(!message.member.roles.cache.has("799045330548686868")) return message.reply('Non hai i permessi necessari per eseguire questo comando!');

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    let ruoli = ["799045331005734953", "799045332007780402"]

    message.delete()
    const embed = new Discord.MessageEmbed()
    .setTitle("**__Esito Bando Staff Scritto__**")
    .setDescription("**Siamo lieti di annunciarti che il tuo bando staff scritto è stato __accettato__ dagli addetti assunzioni del Los Angeles Full RP 3.0! All'interno del canale <#799045649122721802> troverai tutte le informazioni necessarie per poter svolgere il provino orale.**")
    .setFooter("Buona fortuna!")
    .setTimestamp()
    .setColor("GREEN")
    await user.send({ embeds: [embed] })
    await user.roles.add(ruoli)
  }
};
