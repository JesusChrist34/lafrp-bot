const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const ms = require("ms")

module.exports = {
    name: 'slowmode',
    description: 'Imposta lo slowmode ad un canale',
    UserPermissions: ['MANAGE_CHANNELS'],
    BotPerms: ['MANAGE_CHANNELS'],
    timeout: 5000,
    premium: false,
    options: [
      {
        name: 'tempo',
        description: 'Tempo da impostare',
        type: 'STRING',
        required: true,
      },
    ],

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (bot, interaction, args) => {
        
        const tempo1 = interaction.options.getString('tempo')

        const time = ms(tempo1)
        if(!time) return interaction.reply({ content: "Perfavore, specifica un tempo valido!\nEsempi:\n`1m` = 1 minuto\n`1h` = 1 ora\n`1d` = 1 giorno", ephemeral: true })

        if (time) {

            if (time > 21600000) {
                return interaction.reply({ content: "Puoi impostare uno slowmode massimo di 6 ore!", ephemeral: true })
            }

            var tempo = ms(time, { long: true });
            tempo = tempo + ""
            tempo = tempo.replace("second ", "secondo")
            tempo = tempo.replace("seconds", "secondi")
            tempo = tempo.replace("minute ", "minuto ")
            tempo = tempo.replace("minutes", "minuti")
            tempo = tempo.replace("hour ", "ora ")
            tempo = tempo.replace("hours", "ore")
        }

        interaction.channel.setRateLimitPerUser(parseInt(time) / 1000)

        interaction.reply(`**Ho impostato con successo la slowmode per questo canale di \`${tempo}\`!**`)
    },
};