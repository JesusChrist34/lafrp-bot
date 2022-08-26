const ms = require("ms")
const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "remind",
    description: "Crea un promemoria che ti verrà ricordato dal bot",
    timeout: 10000,
    options: [
      {
        name: "canale",
        description: "Canale in cui mandare il promemoria",
        type: "CHANNEL",
        channelTypes: ["GUILD_TEXT"],
        required: true,
      },
      {
        name: "tempo",
        description: "Tempo che il bot rispetterà prima di mandare il messaggio",
        type: "STRING",
        required: true,
      },
      {
        name: "messaggio",
        description: "Messaggio che il bot ti ricorderà",
        type: "STRING",
        required: true,
      }
    ],
    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

        const channel = interaction.options.getChannel('canale')
        const time = interaction.options.getString('tempo')
        const msg = interaction.options.getString('messaggio')

        const durationMS = ms(time)
        if(!durationMS) return interaction.reply({ content: "Perfavore, specifica una durata valida!\nEsempi:\n`1m` = 1 minuto\n`1h` = 1 ora\n`1d` = 1 giorno", ephemeral: true })

        var tempo = ms(durationMS, { long: true });
            tempo = tempo + ""
            tempo = tempo.replace("second ", "secondo")
            tempo = tempo.replace("seconds", "secondi")
            tempo = tempo.replace("minute ", "minuto ")
            tempo = tempo.replace("minutes", "minuti")
            tempo = tempo.replace("hour ", "ora ")
            tempo = tempo.replace("hours", "ore")
            tempo = tempo.replace("day", "giorno")
            tempo = tempo.replace("days", "giorni")

    const promemoriaMain = new Discord.MessageEmbed()
    .setTitle("**__Promemoria__**")
    .setDescription(`**${interaction.user} ti ricorderò \`${msg}\` in ${channel} tra \`${tempo}\`**`)
    .setFooter("Sistema di Promemoria", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    .setTimestamp()
    .setColor("RANDOM")
    interaction.reply({ embeds: [promemoriaMain], ephemeral: true })

    setTimeout(function(){
        const promemoria = new Discord.MessageEmbed()
        .setTitle("**__Promemoria__**")
        .setDescription(`**Promemoria creato da ${interaction.user}:**\n\n${msg}`)
        .setFooter("Promemoria Creato", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
        .setColor("RANDOM")
        .setTimestamp()
        channel.send({ content: `${interaction.user}`, embeds: [promemoria] })
      }, durationMS); 
    }
}