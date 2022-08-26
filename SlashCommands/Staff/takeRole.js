const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'take-role',
    description: 'Rimuovi un ruolo ad un utente',
    UserPermissions: ['MANAGE_ROLES'],
    BotPerms: ['MANAGE_ROLES'],
    timeout: 5000,
    premium: false,
    options: [
      {
        name: 'utente',
        description: 'Utente a cui voler rimuovere il ruolo',
        type: 'USER',
        required: true,
      },
      {
        name: 'ruolo',
        description: 'Ruolo da voler rimuovere',
        type: 'ROLE',
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
      
      const user = interaction.options.getMember('utente')
      const role = interaction.options.getRole('ruolo')
      const grund = interaction.options.getString('motivo') || "Nessun motivo!"
      const owner = await interaction.guild.fetchOwner()

      const memberPosition = user.roles.highest.position;
      const moderationPosition = interaction.member.roles.highest.position;

      if(user.id === owner.id) return interaction.reply({ embeds: [new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`**<:Negato:807328110588330005> | __Permessi Insufficienti__**`)
        .setDescription("**Non è possibile gestire i ruoli dell'owner del server!**")
        .setTimestamp()], ephemeral: true });

        if(owner.id !== interaction.user.id) {
          if (moderationPosition <= memberPosition || moderationPosition == memberPosition)
            return interaction.reply({ embeds: [new Discord.MessageEmbed()
              .setColor("RANDOM")
              .setTitle(`**<:Negato:807328110588330005> | __Permessi Insufficienti__**`)
              .setDescription("**L'utente selezionato è di grado maggiore, o uguale al tuo!**")
              .setTimestamp()], ephemeral: true
            });

        if (moderationPosition <= rolePosition || moderationPosition == rolePosition)
      return interaction.reply({ embeds: [new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`**<:Negato:807328110588330005> | __Permessi Insufficienti__**`)
        .setDescription("**Il ruolo selezionato è di grado maggiore, o uguale al tuo!**")
        .setTimestamp()], ephemeral: true });
          }
  
        let embed = new Discord.MessageEmbed()
          .setTitle(`**__Ruolo Rimosso__**`)
          .setDescription(`
**Autore: ${interaction.user}
Utente: ${user}
Ruolo: ${role}
Motivo: \`${grund}\`**
`)
          .setColor('RED')
          .setThumbnail(user.displayAvatarURL({ dynamic: true }))
          .setTimestamp()

          return user.roles.remove(role).then(() => interaction.reply({ embeds: [embed] }));
    },
};