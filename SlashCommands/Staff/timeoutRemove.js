const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'timeout-remove',
    description: 'Rimuovi il timeout ad un utete all\'interno del server',
    UserPermissions: ['MODERATE_MEMBERS'],
    BotPerms: ['MODERATE_MEMBERS'],
    timeout: 5000,
    premium: false,
    options: [
      {
        name: 'utente',
        description: 'Utente a cui voler rimuovere il timeout',
        type: 'USER',
        required: true,
      },
      {
        name: 'motivo',
        description: 'Motivo della rimozione',
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
        const reason = interaction.options.getString('motivo') || "Nessun motivo!"
        const owner = await server.fetchOwner()

        const memberPosition = user.roles.highest.position;
        const moderationPosition = interaction.member.roles.highest.position;

        if(user.id === owner.id) return interaction.reply({ embeds: [new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`**<:Negato:807328110588330005> | __Permessi Insufficienti__**`)
          .setDescription("**Non è possibile rimuovere il timeout all'owner del server!**")
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

        if(!user.isCommunicationDisabled()) return interaction.reply({ content: `Questo utente non è stato messo in timeout!`, ephemeral: true })

            let embed = new Discord.MessageEmbed()
            .setTitle("**:no_entry_sign: | __Timeout Rimosso__**")
            .setDescription(`\n**Utente: ${user}\nMotivo: \`${reason}\`\nAutore: ${interaction.user}**`)
            .setColor("GREEN")
            .setTimestamp()
            .setFooter("Sistema di Mod. Los Angeles Full RP Bot", bot.user.displayAvatarURL())
            interaction.reply({ embeds: [embed] })
            
            let mute = new Discord.MessageEmbed()
            .setTitle("**:no_entry_sign: | __Sei Stato Rimosso Dal Timeout__**")
            .setDescription(`\n**Motivo: \`${reason}\`\nAutore: ${interaction.user}\nServer: \`${server.name}\`**`)
            .setColor("GREEN")
            .setTimestamp()
            .setFooter("Sistema di Mod. Los Angeles Full RP Bot", bot.user.displayAvatarURL())
            user.send({ embeds: [mute] })

            user.timeout(null, reason)
      
            bot.modlogs({
              Member: user.user,
              Action: 'Timeout Rimosso',
              Autore: interaction.user.toString(),
              Color: 'GREEN',
              Reason: reason
            }, interaction)
    },
};