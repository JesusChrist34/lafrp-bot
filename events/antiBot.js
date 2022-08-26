const Discord = require("discord.js")
const bot = require("../index")
const Schema = require("../models/antiBot")

bot.on("guildMemberAdd", async (member) => {
  const data = await Schema.findOne({ Guild: member.guild.id });

  if(!data) return;
  if(data.Status === "disable") return;

  if(member.user.bot) {
    member.guild.fetchAuditLogs({type: "BOT_ADD", limit: 1}).then(log => {
     const author = log.entries.first().executor;

    const canale = bot.channels.cache.get(data.Log)
    const utente = member.guild.members.cache.find(user => user.id == author.id)

    if(utente.roles.cache.has(data.Bypass)) return;

    if(data.Action === "none") {
    member.ban({ reason: "Anti-Bot System" })
    const embed = new Discord.MessageEmbed()
    .setTitle("**__Anti-Bot__**")
    .setDescription(`**${utente} ( \`${utente.user.username}\` || \`${utente.id}\` ) ha tentato di aggiungere il bot ${member} ( \`${member.user.username} )\`!**`)
    .setColor("RED")
    .setFooter("Possibile Tentativo Di Nuke Sventato!")
    .setTimestamp()
    canale.send({ content: [embed] })
    }
    if(data.Action === "ban") {
    member.ban({ reason: "Anti-Bot System" })
    utente.ban({ reason: "Anti-Bot System" });
    const embed = new Discord.MessageEmbed()
    .setTitle("**__Anti-Bot__**")
    .setDescription(`**${utente} ( \`${utente.user.username}\` || \`${utente.id}\` ) è stato bannato per aver tentato di aggiungere il bot ${member} ( \`${member.user.username} )\`!**`)
    .setColor("RED")
    .setFooter("Possibile Tentativo Di Nuke Sventato")
    .setTimestamp()
    canale.send({ content: [embed] })
    } else if(data.Action === "kick") {
    member.kick({ reason: "Anti-Bot System" })
    utente.kick({ reason: "Anti-Bot System" });
    const embed = new Discord.MessageEmbed()
    .setTitle("**__Anti-Bot__**")
    .setDescription(`**${utente} ( \`${utente.user.username}\` || \`${utente.id}\` ) è stato espulso per aver tentato di aggiungere il bot ${member} ( \`${member.user.username} )\`!**`)
    .setColor("RED")
    .setFooter("Possibile Tentativo Di Nuke Sventato")
    .setTimestamp()
    canale.send({ content: [embed] })
    }
    }).catch(e => console.error(e));
    }
});