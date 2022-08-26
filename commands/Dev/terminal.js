const Discord = require('discord.js')
const child = require("child_process")

module.exports = {
    name: "terminal",

    async run(bot, message, args) {
        if(message.author.id !== "844691950799028235") return;

        const command = args.join(" ")
        if(!command) return message.reply("Perfavore, specifica un comando da eseguire!")

        child.exec(command, (err, res) => {
            if(err) return console.log(err)
            message.channel.send(res.slice(0, 2000), { code: "js" })
        })
    }
};