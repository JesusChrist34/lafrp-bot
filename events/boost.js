/* const Discord = require("discord.js");
const MessageEmbed = require("discord.js")
const bot = require("../index")

bot.on("messageCreate", async (message) => {
  if(message.guild.id == "799043349461336135") {
    if (message.type != "USER_PREMIUM_GUILD_SUBSCRIPTION" && message.type != "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1" && message.type != "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2" && message.type != "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3") return

    if (message.author.bot) return

    message.delete()
        .catch(() => { })

    var numeroBoost;
    if (message.content == "")
        numeroBoost = 1;
    else
        numeroBoost = parseInt(message.content)

    var livelloVecchio;
    var nuovoLivello;
    if (message.type == "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_3" || 14 - message.guild.premiumSubscriptionCount <= 0) {
        nuovoLivello = `:crystal_ball: **LIVELLO 3 sbloccato**
+100 emoji
+30 sticker
Qualità audio 384 Kpms
Vanity URL
100 MB limite di caricamenti in chat`
    }
    else if (message.type == "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_2" || 7 - message.guild.premiumSubscriptionCount <= 0) {
        nuovoLivello = `:crystal_ball: **LIVELLO 2 sbloccato**
+50 emoji
+15 sticker
Qualità audio 256 Kpms
Banner del server
50 MB limite di caricamenti in chat
Streaming fino a 1080p 60fps
Icone ruoli personalizzate
`
    }
    else if (message.type == "USER_PREMIUM_GUILD_SUBSCRIPTION_TIER_1" || 2 - message.guild.premiumSubscriptionCount <= 0) {
        nuovoLivello = `:crystal_ball: **LIVELLO 1 sbloccato**
+50 emoji
+15 sticker
Qualità audio 128 Kpms
Icona server animata
Sfondo inviti
Streaming fino a 720p`
    }

    if (message.guild.premiumSubscriptionCount - numeroBoost < 2) {
        livelloVecchio = 0
    }
    else if (message.guild.premiumSubscriptionCount - numeroBoost < 7) {
        livelloVecchio = 1
    }
    else if (message.guild.premiumSubscriptionCount - numeroBoost < 14) {
        livelloVecchio = 2
    }
    else {
        livelloVecchio = 3
    }

    var embed = new Discord.MessageEmbed()
        .setTitle("**:tada: __Server Boost__ :tada:**")
        .setColor("#FF73FA")
        .setDescription(`**Grazie tantissime a <@${message.author.id}> per aver boostato il server!**`)
        .addField(`Ha potenziato il server con ${numeroBoost} boost`, `\`Lvl. ${message.guild.premiumTier} Boost ${message.guild.premiumSubscriptionCount}\`
${nuovoLivello ? nuovoLivello : ""}
`)

    var canale = client.channels.cache.get("799045619888685126");
    canale.send({ embeds: [embed] });
    }
}); */