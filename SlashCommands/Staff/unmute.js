const muteSchema = require('../../models/muterole')
const Schema = require("../../models/mute")
const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "unmute",
    description: "Smuta un utente precedentemente mutato",
    UserPermissions: ["MANAGE_ROLES"],
    BotPerms: ["MANAGE_ROLES"],
    timeout: 5000,
    options: [
      {
        name: "utente",
        description: "Utente da voler smutare",
        type: "USER",
        required: true,
      },
      {
        name: "motivo",
        description: "Motivo dell'unmute",
        type: "STRING",
        required: false,
      }
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

    muteSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
      if (!data) return;
      if (data) {
        const role = user.guild.roles.cache.find(role => role.id == data.Role);
        if (!role) {
          return data.delete()
        }
        if (!role.id) {
          return interaction.reply({ content: "Non è stato settato nessun mute-role!", ephemeral: true });
        }
        if(!user.roles.cache.has(role.id)) {
interaction.reply({ content: "L'utente non è stato mutato all'interno del server!", ephemeral: true })
return;
} else {
        await Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data2) => {
        await user.roles.add(data2.Roles)
        await user.roles.remove(role.id)
        await data2.delete();
      })

    let embed = new Discord.MessageEmbed()
    .setTitle("**:no_entry_sign: | __Unmute__**")
    .setDescription(`\n\n**Utente Smutato: ${user}\nMotivo: \`${grund}\`\nAutore: ${interaction.user}**`)
    .setColor("GREEN")
    .setTimestamp()
    .setFooter("Sistema di Mod. Los Angeles Full RP Bot", bot.user.displayAvatarURL())

    interaction.reply({ embeds: [embed] })

    var server = interaction.member.guild;
    
    let unmute = new Discord.MessageEmbed()
    .setTitle("**:no_entry_sign: | __Sei Stato Smutato__**")
    .setDescription(`\n\n**Motivo: \`${grund}\`\nAutore: ${interaction.user}\nServer: \`${server.name}\`**`)
    .setColor("GREEN")
    .setTimestamp()
    .setFooter("Sistema di Mod. Los Angeles Full RP Bot", bot.user.displayAvatarURL())

    user.send({ embeds: [unmute] })

    bot.modlogs({
      Member: user.user,
      Action: 'Unmute',
      Autore: interaction.user.toString(),
      Color: 'GREEN',
      Reason: grund
    }, interaction)
   }
  }
 })
}
}