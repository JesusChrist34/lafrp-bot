const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'unban',
    description: 'Sbanna un utente dal server',
    UserPermissions: ['BAN_MEMBERS'],
    BotPerms: ['BAN_MEMBERS'],
    timeout: 5000,
    premium: false,
    options: [
      {
        name: 'id_utente',
        description: "ID dell'utente da sbannare",
        type: 'STRING',
        required: true,
      },
      {
        name: 'motivo',
        description: "Motivo dell'unban",
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
        
      const utente = interaction.options.getString('id_utente')
      let reason = interaction.options.getString('motivo') || "Nessun motivo!";
      var server = interaction.member.guild;

      if(isNaN(utente)) return interaction.reply({ content: "La stringa provvista non è un ID. Per favore, specifica un ID valido di un utente!", ephemeral: true });

      const user = await bot.users.fetch(utente).catch((err) => {
        return interaction.reply({ content: "Questo utente non esiste. Specifica un id di un utente valido!", ephemeral: true })
      })

      const bannedMembers = await server.bans.fetch();
      if (!bannedMembers.find((utente) => utente.user.id === user.id)) return interaction.reply({ content: "Questo utente non è stato bannato!", ephemeral: true })

      const unban = new Discord.MessageEmbed()
      .setTitle(`**:no_entry_sign: | __Unban__**`)
      .setDescription(`\n**Utente Sbannato: \`${user.tag}\`\nMotivo: \`${reason || "Nessun Motivo"}\`\nAutore: ${interaction.user}**`)
      .setColor("RED")
      .setTimestamp()
      .setFooter(bot.user.tag, bot.user.displayAvatarURL())
      interaction.reply({ embeds: [unban] })
      
      let unbandm = new Discord.MessageEmbed()
      .setTitle("**:no_entry_sign: | __Sei Stato Sbannato__**")
      .setDescription(`\n**Motivo: \`${reason || "Nessun Motivo"}\`\nAutore: ${interaction.user}\nServer: \`${server.name}\`**`)
      .setColor("GREEN")
      .setTimestamp()
      .setFooter(bot.user.tag, bot.user.displayAvatarURL())

      await server.members.unban(user.id);

      bot.modlogs({
        Member: user,
        Action: 'Unban',
        Autore: interaction.user.toString(),
        Color: 'GREEN',
        Reason: reason || "Nessun Motivo"
      }, interaction)
      await user.send({ embeds: [unbandm] });
    },
};