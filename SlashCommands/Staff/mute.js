const muteSchema = require('../../models/muterole')
const Schema = require("../../models/mute")
const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js")
const ms = require('ms')

module.exports = {
    name: "mute",
    description: "Muta un utente all'interno del server",
    UserPermissions: ["MANAGE_ROLES"],
    BotPerms: ["MANAGE_ROLES"],
    timeout: 5000,
    options: [
      {
        name: "utente",
        description: "Utente da voler mutare",
        type: "USER",
        required: true,
      },
      {
        name: "motivo",
        description: "Motivo del mute",
        type: "STRING",
        required: false,
      },
      {
        name: "durata",
        description: "Durata del mute (5m, 1h, 1d etc...)",
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
      
        var server = interaction.member.guild;
        const user = interaction.options.getMember('utente')
        const time = interaction.options.getString('durata')
        const grund = interaction.options.getString('motivo') || "Nessun motivo!"
        const owner = await server.fetchOwner()
              
        const memberPosition = user.roles.highest.position;
        const moderationPosition = interaction.member.roles.highest.position;

        if(user.id === owner.id) return interaction.reply({ embeds: [new Discord.MessageEmbed()
          .setColor("RANDOM")
          .setTitle(`**<:Negato:807328110588330005> | __Permessi Insufficienti__**`)
          .setDescription("**Non è possibile mutare l'owner del server!**")
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

            if(time) {
              await muteSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
                if (!data) return;
                if (data) {
                    const role = interaction.guild.roles.cache.find(role => role.id == data.Role);
                    if (!role) {
                        return data.delete()
                    }
                    if (!role.id) {
                        return interaction.reply({ content: "Non è stato settato nessun mute-role!", ephemeral: true });
                    }
                    if(user.roles.cache.has(role.id)) {
                      return interaction.reply({ content: "L'utente è stato già mutato all'interno del server!", ephemeral: true })
                  } else {
          const ruoli = user.roles.cache
          const roles = ruoli
                  .filter(r => r.id !== interaction.guild.id)
                  .map(r => r.id)
          await Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data2) => {
            if(!data2) {
              data2 = new Schema({
                Guild: interaction.guild.id,
                User: user.id,
                Roles: roles
            }).save()
            }
          await user.roles.remove(ruoli)
          await user.roles.add(role.id);
          })

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
          
          let embed = new Discord.MessageEmbed()
          .setTitle("**:no_entry_sign: | __TempMute__**")
          .setDescription(`\n**Utente Mutato: ${user}\nMotivo: \`${grund || "Nessun Motivo"}\`\nDurata Mute: \`${tempo}\`\nAutore: ${interaction.user}**`)
          .setColor("RED")
          .setTimestamp()
          .setFooter("Sistema di Mod. Los Angeles Full RP Bot", bot.user.displayAvatarURL())
          interaction.reply({ embeds: [embed] })
          
          let mute = new Discord.MessageEmbed()
          .setTitle("**:no_entry_sign: | __Sei Stato Temp-Mutato__**")
          .setDescription(`\n**Motivo: \`${grund || "Nessun Motivo"}\`\nDurata Mute: \`${tempo}\`\nAutore: ${interaction.user}\nServer: \`${server.name}\`**`)
          .setColor("RED")
          .setTimestamp()
          .setFooter("Sistema di Mod. Los Angeles Full RP Bot", bot.user.displayAvatarURL())
          user.send({ embeds: [mute] })
          
          setTimeout(async() => {
                await Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data2) => {
                  if(data2) {
                    await user.roles.add(data2.Roles)
                    await user.roles.remove(data.Role);
                  }
              })
          
              const unban = new Discord.MessageEmbed()
              .setTitle(`**:no_entry_sign: | __Unmute__**`)
              .setDescription(`\n**Utente Smutato: ${user}\nMotivo: \`Temp-Mute || Tempo Finito\`\nDurata Mute: \`${tempo}\`**`)
              .setColor("GREEN")
              .setTimestamp()
              .setFooter(bot.user.tag, bot.user.displayAvatarURL())
              interaction.channel.send({ embeds: [unban] })
            
            let unbandm = new Discord.MessageEmbed()
              .setTitle("**:no_entry_sign: | __Sei Stato Smutato**")
              .setDescription(`\n**Motivo: \`Temp-Mute || Tempo Finito\`\nDurata Mute: \`${tempo}\`\nServer: \`${server.name}\`**`)
              .setColor("GREEN")
              .setTimestamp()
              .setFooter(bot.user.tag, bot.user.displayAvatarURL())
              user.send({ embeds: [unbandm] })
          
            bot.modlogs({
              Member: user.user,
              Action: 'Unmute',
              Autore: interaction.user.toString(),
              Color: 'GREEN',
              Reason: "Temp-Mute || Tempo Finito"
            }, interaction)
            }, ms(time));
          
          bot.modlogs({
              Member: user.user,
              Action: 'Temp-Mute',
              Autore: interaction.user.toString(),
              Color: 'ORANGE',
              Reason: grund || "Nessun Motivo"
            }, interaction)
          }
      }
    })
          } else {
        await muteSchema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (!data) return interaction.reply({ content: "Non è stato configurato nessun mute-role all'interno del server!", ephemeral: true });
            if (data) {
                const role = user.guild.roles.cache.find(role => role.id == data.Role);
                if (!role) {
                    return data.delete()
                }
                if (!role.id) {
                    return interaction.reply({ content: "Non è stato settato nessun muterole!", ephemeral: true });
                }
                if(user.roles.cache.has(role.id)) {
                  return interaction.reply({ content: "L'utente è stato già mutato all'interno del server!", ephemeral: true })
                } else {
  const ruoli = user.roles.cache
  const roles = ruoli
                .filter(r => r.id !== interaction.guild.id)
                .map(r => r.id)
        await Schema.findOne({ Guild: interaction.guild.id, User: user.id }, async (err, data2) => {
          if(!data2) {
            data2 = new Schema({
              Guild: interaction.guild.id,
              User: user.id,
              Roles: roles
          }).save()
          }
        await user.roles.remove(ruoli)
        await user.roles.add(role.id);
      })
  
      let embed = new Discord.MessageEmbed()
      .setTitle("**:no_entry_sign: | __Mute__**")
      .setDescription(`\n**Utente Mutato: ${user}\nMotivo: \`${grund}\`\nAutore: ${interaction.user}**`)
      .setColor("RED")
      .setTimestamp()
      .setFooter("Sistema di Mod. Los Angeles Full RP Bot", bot.user.displayAvatarURL())
      interaction.reply({ embeds: [embed] })
      
      let mute = new Discord.MessageEmbed()
      .setTitle("**:no_entry_sign: | __Sei Stato Mutato__**")
      .setDescription(`\n**Motivo: \`${grund}\`\nAutore: ${interaction.user}\nServer: \`${server.name}\`**`)
      .setColor("RED")
      .setTimestamp()
      .setFooter("Sistema di Mod. Los Angeles Full RP Bot", bot.user.displayAvatarURL())
      user.send({ embeds: [mute] })

      bot.modlogs({
        Member: user.user,
        Action: 'Mute',
        Autore: interaction.user.toString(),
        Color: 'RED',
        Reason: grund
      }, interaction)
      }
    }
   })
   }
  },
};