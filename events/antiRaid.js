const bot = require("../index")
const { antijoin } = require("../Collection")

bot.on("guildMemberAdd", async (member) => {
    const getCollection = antijoin.get(member.guild.id)
    if(!getCollection) return;
    if(!getCollection.includes(member.user)) {
        getCollection.push(member.user)
    }
    member.kick({ reason: "AntiRaid Attivo!" })
});