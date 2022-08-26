const Discord = require('discord.js');

module.exports = {
    name: "bsoa",

    async run(bot, message, args) {

    if(!message.member.roles.cache.has("799045330548686868")) return message.reply('Non hai i permessi necessari per eseguire questo comando!');

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const voto = args[1]
    let ruoli = ["799045321279406100", "870667019442339840", "799045321937518644", "799045333413920858", "799045332742438952", "799045334134423602", "799045334482813010", "799045335518281800"]

    message.delete()
    const embed = new Discord.MessageEmbed()
    .setTitle("**__Esito Bando Staff Orale__**")
    .setDescription(`**Il bando staff orale di ${user} è stato __accettato__ dagli addetti assunzioni del Los Angeles Full RP 3.0!\n__Voto:__ \`${voto}\`**`)
    .setFooter("Buona fortuna!")
    .setTimestamp()
    .setColor("GREEN")
    await message.channel.send({ embeds: [embed] })
    await user.roles.add(ruoli)
    await user.roles.remove("799045331005734953")
  }
};
