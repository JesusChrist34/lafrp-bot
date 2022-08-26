const bot = require("../index");
const Schema = require('../models/goodbye');
const Discord = require("discord.js");

bot.on("guildMemberRemove", async(member) => {
    await Schema.findOne({ Guild: member.guild.id}, async(err, data) => {

        if(!data) return;
        if(data.Status === "disable") return;
        if(member.user.bot) return;

    const canale = member.guild.channels.cache.get(data.Channel);
    var GoodbyeMsg = data.GoodbyeMsg
GoodbyeMsg = GoodbyeMsg.replaceAll("{user_mention}", member.toString())
GoodbyeMsg = GoodbyeMsg.replaceAll("{user_name}", member.user.tag)
GoodbyeMsg = GoodbyeMsg.replaceAll("{user_id}", member.user.id)
GoodbyeMsg = GoodbyeMsg.replaceAll("{server_name}", member.guild.name)
GoodbyeMsg = GoodbyeMsg.replaceAll("{member_count}", member.guild.memberCount);

        const goodbye = new Discord.MessageEmbed()
        .setTitle("**__Membro Uscito!__**")
        .setDescription(GoodbyeMsg)
        .setColor("RANDOM")
        .setFooter("Speriamo che torni presto nel server!")
        .setTimestamp()
        
        canale.send({ embeds: [goodbye] })
   });
});