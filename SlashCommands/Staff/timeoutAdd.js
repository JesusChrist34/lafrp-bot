const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const ms = require("ms")

module.exports = {
    name: 'timeout-add',
    description: 'Metti in timeout un utente all\'interno del server',
    UserPermissions: ['MODERATE_MEMBERS'],
    BotPerms: ['MODERATE_MEMBERS'],
    timeout: 5000,
    premium: false,
    options: [
      {
        name: 'utente',
        description: 'Utente da voler mettere in timeout',
        type: 'USER',
        required: true,
      },
      {
        name: 'durata',
        description: 'Durata del timeout',
        type: 'STRING',
        required: true,
      },
      {
        name: 'motivo',
        description: 'Motivo del timeout',
        type: 'STRING',
        required: false,
      },
    ],

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (bot, interaction, args) => {
        
        var server = interaction.member.guild;
        const user = interaction.options.getMember('utente')
        const duration = interaction.options.getString('durata')
        const reason = interaction.options.getString('motivo') || "Nessun motivo!"
        const owner = await server.fetchOwner()

        const durationMS = ms(duration)
        if(!durationMS) return interaction.reply({ content: "Perfavore, specifica una durata valida!\nEsempi:\n`1m` = 1 minuto\n`1h` = 1 ora\n`1d` = 1 giorno", ephemeral: true })

        if(durationMS > 2419200000) return interaction.reply({content: "La durata del timeout non può superare i 28 giorni!", ephemeral: true})

        const memberPosition = user.roles.highest.position;
        const moderationPosition = interaction.member.roles.highest.position;

        if(user.id === owner.id) return interaction.reply({ embeds: [new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`**<:Negato:807328110588330005> | __Permessi Insufficienti__**`)
          .setDescription("**Non è possibile mettere in timeout l'owner del server!**")
          .setTimestamp()], ephemeral: true });
        
          if(owner.id !== interaction.user.id) {
            if (moderationPosition <= memberPosition || moderationPosition == memberPosition)
              return interaction.reply({ embeds: [new Discord.MessageEmbed()
                .setColor("RANDOM")
                .setTitle(`**<:Negato:807328110588330005> | __Permessi Insufficienti__**`)
                .setDescription("**L'utente selezionato è di grado maggiore, o uguale al tuo!**")
                .setTimestamp()], ephemeral: true
              });
            }

        if(user.isCommunicationDisabled()) return interaction.reply({ content: `Questo utente è stato già messo in timeout!`, ephemeral: true })

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

            let embed = new Discord.MessageEmbed()
            .setTitle("**:no_entry_sign: | __Timeout__**")
            .setDescription(`\n**Utente In Timeout: ${user}\nMotivo: \`${reason}\`\nDurata: \`${tempo}\`\nAutore: ${interaction.user}**`)
            .setColor("RED")
            .setTimestamp()
            .setFooter("Sistema di Mod. Los Angeles Full RP Bot", bot.user.displayAvatarURL())
            interaction.reply({ embeds: [embed] })
            
            let mute = new Discord.MessageEmbed()
            .setTitle("**:no_entry_sign: | __Sei Stato Messo In Timeout__**")
            .setDescription(`\n**Motivo: \`${reason}\`\nDurata: \`${tempo}\`\nAutore: ${interaction.user}\nServer: \`${server.name}\`**`)
            .setColor("RED")
            .setTimestamp()
            .setFooter("Sistema di Mod. Los Angeles Full RP Bot", bot.user.displayAvatarURL())

            await user.timeout(durationMS, reason)
      
            bot.modlogs({
              Member: user.user,
              Action: 'Timeout',
              Autore: interaction.user.toString(),
              Color: 'RED',
              Reason: reason
            }, interaction)
            user.send({ embeds: [mute] })
    },
};