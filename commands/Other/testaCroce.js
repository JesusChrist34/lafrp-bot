const Discord = require('discord.js')

module.exports = {
    name: "testa-croce",

    async run(bot, message, args) {
        message.delete();

        var messaggi = [`Testa`, `Croce`]
        var random = Math.floor(Math.random() * messaggi.length);

        const liberatiembed = new Discord.MessageEmbed()
        .setTitle("**__Testa o Croce?__**")
        .setDescription(`**Risultato: \`${messaggi[random]}\`**`)
        .setFooter("Si ringrazia Manuelito per aver creato questo meme!")
        .setColor("GREEN")
        .setTimestamp()
        message.channel.send({ content: `${message.author.toString()}`, embeds: [liberatiembed] });
        }
}