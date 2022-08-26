const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js');

module.exports = {
    name: 'kick',
    description: 'Espelli un utente dal server',
    UserPermissions: ['KICK_MEMBERS'],
    BotPerms: ['KICK_MEMBERS'],
    timeout: 5000,
    premium: false,
    options: [
      {
        name: 'utente',
        description: 'Utente da voler espellere',
        type: 'USER',
        required: true,
      },
      {
        name: 'motivo',
        description: 'Motivo dell\'espulsione',
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
      const grund = interaction.options.getString('motivo') || "Nessun motivo!"
      var server = interaction.member.guild;
      const owner = await server.fetchOwner()

      const memberPosition = user.roles.highest.position;
      const moderationPosition = interaction.member.roles.highest.position;

      if(user.id === owner.id) return interaction.reply({ embeds: [new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`**<:Negato:807328110588330005> | __Permessi Insufficienti__**`)
        .setDescription("**Non è possibile espellere l'owner del server!**")
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

          const embed = new Discord.MessageEmbed()
          .setTitle(`**:no_entry_sign: | __Kick__**`)
          .setDescription(`\n**Utente Epulso: ${user}\nMotivo: \`${grund}\`\nAutore: ${interaction.user}**`)
          .setColor("RED")
          .setTimestamp()
          .setFooter(bot.user.tag, bot.user.displayAvatarURL())
          interaction.reply({ embeds: [embed] })
        
        let warnembed = new Discord.MessageEmbed()
          .setTitle("**:no_entry_sign: | __Sei Stato Epulso__**")
          .setDescription(`\n**Motivo: \`${grund}\`\nAutore: ${interaction.user}\nServer: \`${server.name}\`**`)
          .setColor("RED")
          .setTimestamp()
          .setFooter(bot.user.tag, bot.user.displayAvatarURL())
          await user.send({ embeds: [warnembed] });

          await user.kick({ reason: grund })

          bot.modlogs({
            Member: user.user,
            Action: 'Kick',
            Autore: interaction.user.toString(),
            Color: 'RED',
            Reason: grund
          }, interaction)
    },
};