const bot = require("../index")

bot.on("messageReactionAdd", async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;

    const { guild } = reaction.message;
    if (!guild) return;
    if (!guild.me.permissions.has("MANAGE_ROLES")) return;

    const member = guild.members.cache.get(user.id);
    if (!member) return;

    	if (reaction.message.id != "910839139165954089") return;

    			if (reaction.emoji.name === "Voto") {
    				member.roles.remove("907999386854883370", ['Voto elezione']).catch(err => console.log(err));
    			}
          member.send("**Hai votato con successo il candidato n°1 ( Simone Sarti ), da ora non sarà più possibile votare un altro candidato fino ad una nuova elezione!**")
});

bot.on("messageReactionAdd", async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;

    const { guild } = reaction.message;
    if (!guild) return;
    if (!guild.me.permissions.has("MANAGE_ROLES")) return;

    const member = guild.members.cache.get(user.id);
    if (!member) return;

    	if (reaction.message.id != "910839778348515348") return;

    			if (reaction.emoji.name === "Voto") {
    				member.roles.remove("907999386854883370", ['Voto elezione']).catch(err => console.log(err));
    			}
          member.send("**Hai votato con successo il candidato n°2 ( Lisa Ley ), da ora non sarà più possibile votare un altro candidato fino ad una nuova elezione!**")
});

bot.on("messageReactionAdd", async(reaction, user) => {
    if(reaction.message.partial) await reaction.message.fetch();
    if(reaction.partial) await reaction.fetch();
    if(user.bot) return;

    const { guild } = reaction.message;
    if (!guild) return;
    if (!guild.me.permissions.has("MANAGE_ROLES")) return;

    const member = guild.members.cache.get(user.id);
    if (!member) return;

    	if (reaction.message.id != "910840393782943774") return;

    			if (reaction.emoji.name === "Voto") {
    				member.roles.remove("907999386854883370", ['Voto elezione']).catch(err => console.log(err));
    			}
          member.send("**Hai votato con successo il candidato n°3 ( Anna Di Bari ), da ora non sarà più possibile votare un altro candidato fino ad una nuova elezione!**")
});