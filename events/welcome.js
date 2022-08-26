const bot = require("../index");
const Schema = require('../models/welcome');
const Discord = require("discord.js");

bot.on("guildMemberAdd", async(member) => {
    await Schema.findOne({ Guild: member.guild.id}, async(err, data) => {

        if(!data) return;
        if(data.Status === "disable") return;
        if(member.user.bot) return;

    const canale = member.guild.channels.cache.get(data.Channel);
    var WelcomeMsg = data.WelcomeMsg
WelcomeMsg = WelcomeMsg.replaceAll("{user_mention}", member.toString())
WelcomeMsg = WelcomeMsg.replaceAll("{user_name}", member.user.tag)
WelcomeMsg = WelcomeMsg.replaceAll("{user_id}", member.user.id)
WelcomeMsg = WelcomeMsg.replaceAll("{server_name}", member.guild.name)
WelcomeMsg = WelcomeMsg.replaceAll("{member_count}", member.guild.memberCount);

        const welcome = new Discord.MessageEmbed()
        .setTitle("**__Nuovo Membro!__**")
        .setDescription(WelcomeMsg)
        .setColor("RANDOM")
        .setFooter("Buona permanenza all'interno del server!")
        .setTimestamp()

        canale.send({ embeds: [welcome] })
   });
});