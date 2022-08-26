const bot = require("../index")
const Schema = require("../models/antiInvite");
const mute = require("../models/muterole")

bot.on("messageCreate", async (message) => {

  await Schema.findOne({ Guild: message.guild.id }, async (err, data) => {
  
  if(!data) return;
  if(!message.guild) return;
  if(message.author.bot) return;
  if(message.channel.id == "799045570038988830") return;
  
    if(data.Status === "disable") return;
    if(data.Status === "enable") {

    if(message.member.roles.cache.has(data.Ruolo)) return;
    if(!message.member.roles.cache.has(data.Ruolo)) {

const InviteLinks = ['discord.gg/', 'discord.com/invite/', 'discordapp.com/invite/']

    if(InviteLinks.some(link => message.content.toLowerCase().includes(link))) {
        const UserCode = message.content.split('discord.gg/' || 'discord.com/invite/' || 'discordapp.com/invite/')[1]
        message.guild.invites.fetch().then(invites => {
            let InviteArray = []
            for (let inviteCode of invites) {
                InviteArray.push(inviteCode[0])
            }
            if(!InviteArray.includes(UserCode)) {
                message.delete()
                message.channel.send({ content: `**${message.author.toString()} in questo server è assolutamente vietato mandare link di altri server!**` })
                if(data.Action !== "none") {
                    if(data.Action == "ban") {
                        message.member.ban({ reason: "Auto-Mod" })
                        bot.modlogs({
                          Member: message.author,
                          Action: 'Ban',
                          Autore: bot.user,
                          Color: 'RED',
                          Reason: "Auto-Mod"
                        }, message)
                      } else if(data.Action == "kick") {
                        message.member.kick("Auto-Mod")
                        bot.modlogs({
                          Member: message.author,
                          Action: 'Kick',
                          Autore: bot.user,
                          Color: 'ORANGE',
                          Reason: "Auto-Mod"
                        }, message)
                      } else if(data.Action == "mute") {
                        const muterole = mute.findOne({ Guild: message.guild.id })
                        if(!muterole) return;
                        message.member.roles.add(muterole.Role)
                        bot.modlogs({
                          Member: message.author,
                          Action: 'Mute',
                          Autore: bot.user,
                          Color: 'ORANGE',
                          Reason: "Auto-Mod"
                        }, message)
                      }
                }
            }
        })
      }
    }
  }
 })
});