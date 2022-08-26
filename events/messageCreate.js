const bot = require("../index");
const Discord = require("discord.js")
const { MessageEmbed, Collection } = require("discord.js")
const config = require("../config.json")
const Timeout = new Collection()
const ms = require("ms")
const CmdsSchema = require("../models/command")
const BlacklistUserSchema = require("../models/blacklistUser")
const BlacklistServerSchema = require("../models/blacklistServer")
const PremiumSchema = require("../models/premium")
const Schema5 = require("../models/manutention")

bot.on("messageCreate", async (message) => {
    if (message.channel.type == "dm" && message.content.startsWith("!" || "/")) {
        var embed = new Discord.MessageEmbed()
        .setTitle("**__DM non abilitati__**")
        .setColor("#F15A24")
        .setDescription("**I comandi nei messaggi privati non sono abilitati.**")
        .setTimestamp()

        message.channel.send({ embeds: [embed] })
    }
})
  
bot.on("messageCreate", async (message) => {
    if (message.author.bot) return;

    if (message.channel.type === "dm") {
        const dm = new MessageEmbed()
        .setTitle('**__Nuovo Messaggio In DM!__**')
        .setColor("RANDOM")
        .setTimestamp()
        .setDescription(`**Utente:** \`${message.author.tag}\`\n**ID Utente:** \`${message.author.id}\`\n**Quando:** \`${new Date()}\`\n\n**Contenuto:** \`\`\`${message.content}\`\`\``)
          
        const DMC = bot.channels.cache.get('877989549840687194')
        DMC.send({ embeds: [dm] })
    }
});

bot.on('messageCreate', async (message) => {
    const p = config.prefix
  const args = message.content.slice(p.length).trim().split(/ +/)
  const cmd = args.shift().toLowerCase()
    if (!message.content.startsWith(p) || !message.guild || cmd.length == 0) return;

    let command = bot.commands.get(cmd)
    if (!command) command = bot.commands.get(bot.aliases.get(cmd))
    if (command) {

        if(message.guild.id == "737951907376529430") return;

        // Manutention Mode
        const data5 = await Schema5.findOne({ Author: "844691950799028235" })
        if(data5.Status === "enable" && message.guild.id !== "799043349461336135") return message.reply({ content: `**Il bot è attualmente in fase di manutenzione.**` })

        // User Perms
        if (!message.member.permissions.has(command.UserPerms || [])) return message.reply({ content: `Non hai i permessi necessari per eseguire questo comando!\nPermessi Necessari: \`${command.UserPerms || []}\`` });

        // Bot Perms
        if (!message.guild.me.permissions.has(command.BotPerms || [])) return message.reply({ content: `Non ho i permessi necessari per eseguire questo comando!\nPermessi Necessari: \`${command.BotPerms || []}\`` });

        const check1 = await CmdsSchema.findOne({ Guild: message.guild.id })
        if(check1) {
            if(check1.Cmds.includes(command.name)) return message.reply({ content: "**Questo comando è stato disabilitato all'interno del server!**" })
          }

        const blacklistedUser = await BlacklistUserSchema.findOne({ 
        User: message.author.id,
        });
            if(blacklistedUser) 
            return message.reply({ content: "**Sei stato blacklistato dai developer del bot, non potrai eseguire nessun tipo di comando!**" });

            const blacklistedServer = await BlacklistServerSchema.findOne({ 
        Guild: message.guild.id,
        });
            if(blacklistedServer) 
            return message.reply({ content: "**Questo server è stato blacklistato dai developer del bot, non potrete eseguire nessun tipo di comando!**" });

        if(command.premium) {
            const data = await PremiumSchema.findOne({ Guild: message.guild.id })
          if(!data) return message.reply({ content: '**Questo comando possono eseguirlo solo i server premium!**' });
          if(!data.Permanent && Date.now() > data.Expire) {
              data.delete()
              return message.channel.send({ content: "**L'abbonamento premium è scaduto. Per poter riutilizzare i comandi premium andrà rinnovato l'abbonamento!**" })
        }
      }
        if(command.timeout) {
            if(Timeout.has(`${command.name}${message.author.id}`)) return message.reply({ content: `**Devi attendere \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` per poter eseguire nuovamente il comando!**` })
            command.run(bot, message, args)

            Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.timeout)
            setTimeout(() => {
                Timeout.delete(`${command.name}${message.author.id}`)
            }, command.timeout)
        } else command.run(bot, message, args)
    }
});

bot.on('messageUpdate', async (oldMessage, newMessage) => {
  const p = config.prefix
  const args = newMessage.content.slice(p.length).trim().split(/ +/)
  const cmd = args.shift().toLowerCase()
    if (!newMessage.content.startsWith(p) || !newMessage.guild || cmd.length == 0) return;

    let command = bot.commands.get(cmd)
    if (!command) command = bot.commands.get(bot.aliases.get(cmd))
    if (command) {

        // Manutention Mode
        const data5 = await Schema5.findOne({ Author: "844691950799028235" })
        if(data5.Status === "enable" && message.guild.id !== "799043349461336135") return message.reply({ content: `**Il bot è attualmente in fase di manutenzione.**` })
      
        // User Perms
        if (!newMessage.member.permissions.has(command.UserPerms || [])) return newMessage.reply({ content: `Non hai i permessi necessari per eseguire questo comando!\nPermessi Necessari: \`${command.UserPerms || []}\`` });

        // Bot Perms
        if (!newMessage.guild.me.permissions.has(command.BotPerms || [])) return newMessage.reply({ content: `Non ho i permessi necessari per eseguire questo comando!\nPermessi Necessari: \`${command.BotPerms || []}\`` });

        const check1 = await CmdsSchema.findOne({ Guild: newMessage.guild.id })
        if(check1) {
            if(check1.Cmds.includes(command.name)) return newMessage.reply({ content: "**Questo comando è stato disabilitato all'interno del server!**" })
          }

        const blacklistedUser = await BlacklistUserSchema.findOne({ 
        User: newMessage.author.id,
        });
            if(blacklistedUser) 
            return newMessage.reply({ content: "**Sei stato blacklistato dai developer del bot, non potrai eseguire nessun tipo di comando!**" });

        const blacklistedServer = await BlacklistServerSchema.findOne({ 
            Guild: newMessage.guild.id,
        });
            if(blacklistedServer) 
            return newMessage.reply({ content: "**Questo server è stato blacklistato dai developer del bot, non potrete eseguire nessun tipo di comando!**" });

        if(command.premium) {
            const data = await PremiumSchema.findOne({ Guild: newMessage.guild.id })
          if(!data) return newMessage.reply({ content: '**Questo comando possono eseguirlo solo i server premium!**' });
          if(!data.Permanent && Date.now() > data.Expire) {
              data.delete()
              return newMessage.channel.send({ content: "**L'abbonamento premium è scaduto. Per poter riutilizzare i comandi premium andrà rinnovato l'abbonamento!**" })
        }
      }
        if(command.timeout) {
            if(Timeout.has(`${command.name}${newMessage.author.id}`)) return newMessage.reply({ content: `**Devi attendere \`${ms(Timeout.get(`${command.name}${message.author.id}`) - Date.now(), {long : true})}\` per poter eseguire nuovamente il comando!**` })
            command.run(bot, newMessage, args)

            Timeout.set(`${command.name}${newMessage.author.id}`, Date.now() + command.timeout)
            setTimeout(() => {
                Timeout.delete(`${command.name}${newMessage.author.id}`)
            }, command.timeout)
        } else command.run(bot, newMessage, args)
    }
});