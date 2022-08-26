const Discord = require('discord.js')

module.exports = {
    name: "cam",
    timeout: 30000,

    async run(bot, message, args) {

        message.delete();
        const cam = new Discord.MessageEmbed()
        .setTitle("**__Spaccando Telecamere__**")
        .setDescription(`**${message.author.toString()} sta spaccando le registrazioni delle bodycam / dashcam delle persone ferite nelle vicinanze.\n__Tempo Previsto:__ \`1 minuto\`.**`)
        .setColor("BLUE")
        .setFooter("Spaccaggio in corso")
        .setTimestamp()
        message.channel.send({ embeds: [cam] }).then(msg => {
      setTimeout(() => {
        const embed = new Discord.MessageEmbed()
        .setTitle("**__Telecamere Spaccate__**")
        .setDescription(`**${message.author.toString()} ha spaccato con successo tutte le registrazioni delle bodycam / dashcam delle persone ferite nelle vicinanze!**`)
        .setFooter("Spaccaggio finito")
        .setColor("GREEN")
        .setTimestamp()
      msg.edit({ embeds: [embed] })
      }, 60000);
    })
  }
}