const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const ms = require("ms")

module.exports = {
    name: 'ban-with-id',
    description: 'Banna un utente tramite l\'id',
    UserPermissions: ['BAN_MEMBERS'],
    BotPerms: ['BAN_MEMBERS'],
    timeout: 5000,
    premium: false,
    options: [
      {
        name: "id_utente",
        description: "ID dell\'utente da voler bannare",
        type: "STRING",
        required: true,
      },
      {
        name: "motivo",
        description: "Motivo del ban",
        type: "STRING",
        required: false,
      },
      {
        name: "durata",
        description: "Durata del ban (5m, 1h, 1d etc...)",
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
        
        let server = interaction.member.guild;
        let user1 = interaction.options.getString('id_utente')
        let time = interaction.options.getString('durata')
        let reason = interaction.options.getString('motivo') || "Nessun motivo!";
        let owner = await server.fetchOwner()

        const user = await bot.users.fetch(user1).catch(() => {
            return interaction.reply({ content: "Questo utente non esiste. Perfavore, inserisci un ID valido di un utente!", ephemeral: true })
        });
        if(!user) return interaction.reply({ content: "Questo utente non esiste. Perfavore, inserisci un ID valido di un utente!", ephemeral: true })

        const bannedMembers = await server.bans.fetch();
        if (bannedMembers.find((utente) => utente.user.id === user.id)) return interaction.reply({ content: "Questo utente è stato già bannato!", ephemeral: true })

        if(user.id === owner.id) return interaction.reply({ embeds: [new Discord.MessageEmbed()
        .setColor("RANDOM")
        .setTitle(`**<:Negato:807328110588330005> | __Permessi Insufficienti__**`)
        .setDescription("**Non è possibile bannare l'owner del server!**")
        .setTimestamp()], ephemeral: true });

        if(time) {

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

        const ban = new Discord.MessageEmbed()
        .setTitle(`**:no_entry_sign: | __Ban__**`)
        .setDescription(`\n**Utente Bannato: ${user}\nMotivo: \`${reason}\`\nDurata Ban: \`${tempo}\`\nAutore: ${interaction.user}**`)
        .setColor("RED")
        .setTimestamp()
        .setFooter(bot.user.tag, bot.user.displayAvatarURL())
        interaction.reply({ embeds: [ban] })
      
        let bandm = new Discord.MessageEmbed()
        .setTitle("**:no_entry_sign: | __Sei Stato Bannato__**")
        .setDescription(`\n**Motivo: \`${reason}\`\nDurata Ban: \`${tempo}\`\nAutore: ${interaction.user}\nServer: \`${server.name}\`**`)
        .setColor("RED")
        .setTimestamp()
        .setFooter(bot.user.tag, bot.user.displayAvatarURL())
        await server.members.ban(user.id)

        bot.modlogs({
          Member: user,
          Action: 'Ban',
          Autore: interaction.user.toString(),
          Color: 'RED',
          Reason: reason
        }, interaction)
        await user.send({ embeds: [bandm] });

      setTimeout(function(){
        interaction.guild.members.unban(user)
        const unban = new Discord.MessageEmbed()
        .setTitle(`**:no_entry_sign: | __Unban__**`)
        .setDescription(`\n**Utente Sbannato: \`${user.user.tag}\`\nMotivo: \`Temp-Ban || Tempo Finito\`\nDurata Ban: \`${tempo}\`**`)
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(bot.user.tag, bot.user.displayAvatarURL())
        interaction.channel.send({ embeds: [unban] })

        let unbandm = new Discord.MessageEmbed()
        .setTitle("**:no_entry_sign: | __Sei Stato Sbannato__**")
        .setDescription(`\n**Motivo: \`Temp-Ban || Tempo Finito\`\nDurata Ban: \`${tempo}\`\nServer: \`${server.name}\`**`)
        .setColor("GREEN")
        .setTimestamp()
        .setFooter(bot.user.tag, bot.user.displayAvatarURL())

      bot.modlogs({
        Member: user,
        Action: 'Unban',
        Autore: interaction.user.toString(),
        Color: 'GREEN',
        Reason: "Temp-Ban || Tempo Finito"
      }, interaction)
        user.send({ embeds: [unbandm] })
      }, ms(time)); 

        } else {

        const ban = new Discord.MessageEmbed()
        .setTitle(`**:no_entry_sign: | __Ban__**`)
        .setDescription(`\n**Utente Bannato: ${user}\nMotivo: \`${reason}\`\nAutore: ${interaction.user}**`)
        .setColor("RED")
        .setTimestamp()
        .setFooter(bot.user.tag, bot.user.displayAvatarURL())
        interaction.reply({ embeds: [ban] })
      
        let bandm = new Discord.MessageEmbed()
        .setTitle("**:no_entry_sign: | __Sei Stato Bannato__**")
        .setDescription(`\n**Motivo: \`${reason}\`\nAutore: ${interaction.user}\nServer: \`${server.name}\`**`)
        .setColor("RED")
        .setTimestamp()
        .setFooter(bot.user.tag, bot.user.displayAvatarURL())
        await server.members.ban(user.id)

        bot.modlogs({
          Member: user,
          Action: 'Ban',
          Autore: interaction.user.toString(),
          Color: 'RED',
          Reason: reason
        }, interaction)
        await user.send({ embeds: [bandm] })
      }
    },
};