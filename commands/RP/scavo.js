const Discord = require('discord.js')

module.exports = {
    name: "scavo",
    timeout: 300000,

    async run(bot, message, args) {
    if(!message.member.roles.cache.has("799045419418124318")) return message.reply("Finchè non diventi un minatore non potrai eseguire questo comando!");

        message.delete();
      var pezzi = [
        `1`,
        `1`,
        `1`,
        `2`,
        `2`,
        `2`,
        `3`,
        `3`,
        `3`,
        `4`,
        `4`,
        `5`,
        `6`,
        `7`,
        `8`,
        `9`,
        `10`
      ]
      var minerali = [
        `alluminio`,
        `alluminio`,
        `alluminio`,
        `argento`,
        `argento`,
        `ferro`,
        `ferro`,
        `ferro`,
        `ferro`,
        `grafite`,
        `grafite`,
        `grafite`,
        `grafite`,
        `grafite`,
        `grafite`,
        `diamante`,
        `oro`,
        `piombo`,
        `piombo`,
        `piombo`,
        `piombo`,
        `piombo`,
        `rame`,
        `rame`,
        `rame`,
        `rame`,
        `rame`,
        `rame`,
        `titanio`,
        `titanio`,
        `polvere da sparo`,
        `polvere da sparo`,
        `polvere da sparo`
      ]
        var random1 = Math.floor(Math.random() * pezzi.length);
        var random2 = Math.floor(Math.random() * minerali.length);

        const scavo = new Discord.MessageEmbed()
        .setTitle("**__Miniera__**")
        .setDescription(`**${message.author.toString()} sta scavando in miniera in cerca di minerali.\n__Tempo Previsto:__ \`5 minuti\`.**`)
        .setColor("BLUE")
        .setFooter("Scavando in miniera")
        .setTimestamp()
        message.channel.send({ embeds: [scavo] }).then(msg => {
      setTimeout(() => {
        const embed = new Discord.MessageEmbed()
        .setTitle("**__Miniera__**")
        .setDescription(`**Scavando hai trovato \`${pezzi[random1]}\` pezzo/i di \`${minerali[random2]}\`!**`)
        .setFooter("Scavato in miniera")
        .setColor("GREEN")
        .setTimestamp()
      msg.edit({ content: `${message.author.toString()}`, embeds: [embed] })
      }, 300000);
    })
  }
}