const Discord = require('discord.js')

module.exports = {
    name: "liberati",
    timeout: 600000,

    async run(bot, message, args) {
        message.delete();

        var messaggi = [`Non Riuscito`, `Non Riuscito`, `Non Riuscito`, `Riuscito`, `Non Riuscito`, `Non Riuscito`, `Non Riuscito`]
        var random = Math.floor(Math.random() * messaggi.length);

        const liberatiembed = new Discord.MessageEmbed()
        .setTitle("**__Tentativo Di Liberarsi__**")
        .setDescription(`**${message.author.toString()} ha provato a liberarsi dalle manette / fascette.\n__Esito:__ \`${messaggi[random]}\`**`)
        .setColor("RANDOM")
        .setTimestamp()
        message.channel.send({ embeds: [liberatiembed] });
        }
}