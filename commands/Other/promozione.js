const Discord = require('discord.js')

module.exports = {
    name: "promozione",

    async run(bot, message, args) {
      if(!message.member.roles.cache.has("870667019442339840")) return message.reply("Non hai i permessi necessari per eseguire questo comando!");

      const motivi = args.slice(0).join(" ");
        if(!motivi) return message.reply("Perfavore, specifica uno o più motivi per la quale richiedi una promozione!")

    message.delete();
    const embed = new Discord.MessageEmbed()
    .setTitle("**__Richiesta Promozione__**")
    .setDescription(`**La tua richiesta di promozione è stata inviata con successo all'amministrazione del Los Angeles Full RP 3.0!**`)
    .setColor("GREEN")
    .setTimestamp()
    message.channel.send({ content: message.author.toString(), embeds: [embed] }).then(msg => {
      setTimeout(() => {
      msg.delete()
      }, 5000);
    })

    const canale = bot.channels.cache.get("799045656747966538")

    const embed2 = new Discord.MessageEmbed()
    .setTitle("**__Richiesta Promozione__**")
    .setDescription(`**Lo staffer ${message.author} ha richiesto una promozione.\n__Motivo/i:__ \`${motivi}\`**`)
    .setFooter("Con le due reazioni sottostanti potrete decidere l'esito della sua richiesta!")
    .setColor("GREEN")
    .setTimestamp()
    canale.send({ embeds: [embed2], content: "[ <@&799045311245844530> ]" }).then(msg => {
      msg.react("<:Approvato:874719444188934174>")
      msg.react("<:Negato:807328110588330005>")
    })
  }
};