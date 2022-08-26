/* const bot = require("../index")
const ms = require("ms")
const timeSpan = ms("1 days")

bot.on("guildMemberAdd", (member) => {
    const createdAt = new Date(member.user.createdAt).getTime()
    const difference = Date.now() - createdAt
    var server = member.guild;
    
    if(difference < timeSpan) {
        member.send({ content: `**Sei stato bannato dal server \`${server.name}\`\n__Motivo:__ \`Possibile account secondario.\`**` })
        member.ban("Prevenzione account secondario")
    }
}); */