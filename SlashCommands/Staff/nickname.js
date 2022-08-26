const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'nickname',
    description: 'Cambia il nickname del server ad un utente',
    UserPermissions: ['MANAGE_NICKNAMES'],
    BotPerms: ['MANAGE_NICKNAMES'],
    timeout: 10000,
    premium: false,
    options: [
      {
        name: 'utente',
        description: 'Utente a cui cambiare il nickname',
        type: 'USER',
        required: true,
      },
      {
        name: 'nickname',
        description: 'Nickname da voler mettere all\'utente',
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

      const user = interaction.options.getMember('utente')
      const nickname = interaction.options.getString('nickname')
        
      const memberPosition = user.roles.highest.position;
      const moderationPosition = interaction.member.roles.highest.position;
      const owner = await interaction.guild.fetchOwner()

      if(user.id === owner.id) return interaction.reply({ embeds: [new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`**<:Negato:807328110588330005> | __Permessi Insufficienti__**`)
        .setDescription("**Non è possibile gestire il nickname dell'owner del server!**")
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
  
      await user.setNickname(nickname);
  
      const embed = new Discord.MessageEmbed()
      .setTitle("**__Nickname Cambiato__**")
      .setDescription(`**Cambiato con successo il nickname di <@${user.id}> in: \`${nickname}\`**`)
      .setColor('RANDOM')
      .setTimestamp()
      interaction.reply({ embeds: [embed] })
    },
};