const bot = require("../index");

bot.on("ready", () => {
    let canale = bot.channels.cache.get("877989549840687194")
    canale.send({ content: `<:Approvato:874719444188934174> **${bot.user.username}** Online!` })
    console.log(`✅ ${bot.user.username} Online!`)
    bot.user.setStatus('online') // idle, online, invisible, dnd
    setInterval(() => {
        let att= [
            `/help`,
            `Los Angeles Full RP 3.0`,
            `${bot.guilds.cache.reduce((a, g) => a + g.memberCount, 0)} membri`
        ];

        bot.user.setActivity(att[Math.floor(Math.random() * att.length)], {
            type: "PLAYING",
        }); 
        
}, 12000);
});