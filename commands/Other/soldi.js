const Discord = require('discord.js');

module.exports = {
    name: 'soldi',

   run: async (bot, message, args) => {
    if(!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Non hai i permessi necessari per eseguire il comando!\nPermessi Necessari: `Amministratore`");

    const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
    const soldi = args[1]
    if(isNaN(soldi)) return message.reply("E' possibile inserire soltanto numeri per il ringraziamento della donazione!")
    let ruoli = ["799045344486359070", "799045348340793415"]

    const embed = new Discord.MessageEmbed()
    .setTitle("**__Donazione__**")
    .setDescription(`L'amministrazione, e lo staff del Los Angeles Full RP 3.0 ringrazia tantissimo ${user} per averci donato ${soldi} euro!`)
    .setFooter("Lo staff vi ringrazia tantissimo per tutto il vostro supporto!")
    .setTimestamp()
    .setColor("GREEN")
    message.channel.send({ embeds: [embed] })
    await user.roles.add(ruoli)
  }
}