const Discord = require('discord.js')

module.exports = {
    name: "gps",

    async run(bot, message, args) {
        message.delete();        

        if(message.member.roles.cache.has("799045421057441793")) {

        const message = args.slice(0).join(" ");
        if(!message) return message.reply("Perfavore, specifica in quale arma cercare il GPS!")

        const liberatiembed = new Discord.MessageEmbed()
        .setTitle("**__Ricerca GPS__**")
        .setDescription(`**${message.author.toString()} sta cercando un localizzatore GPS nella seguenta arma: \`${message}\`\n__Tempo Previsto:__ \`5 minuti.\`**`)
        .setFooter("Ricerca in corso")
        .setColor("RED")
        .setTimestamp()
        message.channel.send({ embeds: [liberatiembed] }).then(msg => {
      setTimeout(() => {
        const embed = new Discord.MessageEmbed()
        .setTitle("**__GPS Trovato__**")
        .setDescription(`**${message.author.toString()} ha trovato con successo un GPS nella seguente arma: \`${message}\`.**`)
        .setFooter("Ricerca finita")
        .setColor("GREEN")
        .setTimestamp()
      msg.edit({ embeds: [embed] })
      }, 300000);
    })
        } else if(message.member.roles.cache.has("799045426258903096")) {

        const message1 = args.slice(0).join(" ");
        if(!message1) return message.reply("Perfavore, specifica in quale veicolo cercare il GPS!")

        const liberatiembed = new Discord.MessageEmbed()
        .setTitle("**__Ricerca GPS__**")
        .setDescription(`**${message.author.toString()} sta cercando un localizzatore GPS nel seguente veicolo: \`${message1}\`\n__Tempo Previsto:__ \`10 minuti.\`**`)
        .setFooter("Ricerca in corso")
        .setColor("RED")
        .setTimestamp()
        message.channel.send({ embeds: [liberatiembed] }).then(msg => {
      setTimeout(() => {
        const embed = new Discord.MessageEmbed()
        .setTitle("**__GPS Trovato__**")
        .setDescription(`**${message.author.toString()} ha trovato con successo un GPS nel seguente veicolo: \`${message1}\`.**`)
        .setFooter("Ricerca finita")
        .setColor("GREEN")
        .setTimestamp()
      msg.edit({ embeds: [embed] })
      }, 600000);
    })
          }
  }
}