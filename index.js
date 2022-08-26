const express = require("express");
const app = express();
app.get("/", (request, response) => {
  const ping = new Date();
  ping.setHours(ping.getHours() + 2);
  console.log(`Il bot è online alle: ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);
  response.sendStatus(200);
});
app.listen(process.env.PORT);

process.on("uncaughtException", err => {
    console.log(err);
});
process.on("unhandledRejection", err => {
    console.log(err);
});
process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(err)
});
process.on('beforeExit', (code) => {
    console.log(code)
});
process.on('exit', (code) => {
    console.log(code)
});
process.on('multipleResolves', (type, promise, reason) => {
    console.log(reason)
});

const { Collection, Client, Discord, MessageEmbed } = require('discord.js')
const bot = new Client({
    allowedMentions: { parse: ['users', 'roles'], repliedUser: true },
    partials: ["MESSAGE", "CHANNEL", "REACTION", "GUILD_MEMBER"],
    intents: 32767,
});

const {AntiRaid} = require('discord-antiraid');

bot.antiraid = new AntiRaid(bot, {
    rateLimit: 5,
    time: 15000,
    ban: true,
    kick: false,
    unrank: false,
    exemptMembers: [],
    exemptRoles: [],
    exemptEvent: [],
    reason: "Anti-Nuke System"
});

require('events').EventEmitter.prototype._maxListeners = 100;

bot.login(process.env.Token);

module.exports = bot;
bot.commands = new Collection();
bot.aliases = new Collection();
bot.slashCommands = new Collection();
require("./handlers")(bot);

const fs = require('fs')
bot.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
    require(`./handlers/${handler}`)(bot);
});

const mongoose = require("mongoose")
mongoose.connect(process.env.Mongo, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
}).then(console.log('Sono connesso al server di mongoose!'))

const modlogsSchema = require("./models/modLogs")
bot.modlogs = async function({ Member, Autore, Action, Color, Reason }, message) {
    const data = await modlogsSchema.findOne({ Guild: message.guild.id });
    if(!data) return;

    const channel = message.guild.channels.cache.get(data.Channel);
    const logsEmbed = new MessageEmbed()
    .setColor(Color)
    .addField(`**Azione Intrapresa:**`, `**\`${Action}\`**`)
    .addField("**Motivo:**", `**\`${Reason || 'Nessun motivo!'}\`**`)
    .addField('**Membro Punito:**', `**\`${Member.tag} ( ${Member.id} )\`**`)
    .addField('**Autore:**', `${Autore.toString()}`)
    .setTitle(`**__Nuova Sanzione__**`)

channel.send({ embeds: [logsEmbed] })
}

/* // ------------------Economy System----------------------
const CurrencySystem = require("currency-system");
const cs = new CurrencySystem;

CurrencySystem.cs
.on('debug', (debug, error) => {
    console.log(debug);
    if (error) console.error(error);
})
.on('userFetch', (user, functionName) => {
    console.log(`( ${functionName} ) Fetched User:  ${bot.users.cache.get(user.userID).tag}`);
})
.on('userUpdate', (oldData, newData) => {
    console.log('User Updated: ' + bot.users.cache.get(newData.userID).tag);
})

cs.setMongoURL(process.env.Mongo);
cs.setDefaultWalletAmount(10000);
cs.setMaxBankAmount(0);
cs.setMaxWalletAmount(0);
cs.searchForNewUpdate(true); */