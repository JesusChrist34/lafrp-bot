const Discord = require('discord.js');

module.exports = {
    name: "bsor",

    async run(bot, message, args) {

    if(!message.member.roles.cache.has("799045330548686868")) return message.reply('Non hai i permessi necessari per eseguire questo comando!');

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const voto = args[1]
    if(isNaN(voto)) return message.reply("E' possibile inserire soltanto numeri per il voto dell'utente!")
    let ruoli = ["799045331005734953", "799045332007780402"]

    if(voto >= 5) {
    message.delete()
    const embed = new Discord.MessageEmbed()
    .setTitle("**__Esito Bando Staff Orale__**")
    .setDescription(`**Il bando staff orale di ${user} è stato __rifiutato__ dagli addetti assunzioni del Los Angeles Full RP 3.0!\n__Voto:__ \`${voto}\`**`)
    .setFooter("Potrai ritentare un altra volta!")
    .setTimestamp()
    .setColor("RED")
    await message.channel.send({ embeds: [embed] })
    }
    if(voto < 5) {
    message.delete()
    const embed = new Discord.MessageEmbed()
    .setTitle("**__Esito Bando Staff Orale__**")
    .setDescription(`**Il bando staff orale di ${user} è stato __rifiutato__ dagli addetti assunzioni del Los Angeles Full RP 3.0!\n__Voto:__ \`${voto}\`**`)
    .setFooter("L'utente non potrà più ritentare il provino orale!")
    .setTimestamp()
    .setColor("RED")
    await message.channel.send({ embeds: [embed] })
    await user.roles.remove(ruoli)
    }
  }
};
