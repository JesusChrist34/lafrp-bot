const Discord = require('discord.js')
const glob = require("glob")

module.exports = {
    name: "reload",

    async run(bot, message, args) {
        if(message.author.id !== "844691950799028235") return;

        bot.commands.sweep(() => true)
        glob(`${__dirname}/../**/*.js`, async(err, filePaths) => {
            if(err) return console.log(err)
            filePaths.forEach((file) => {
                delete require.cache[require.resolve(file)]

                const pull = require(file)

                if(pull.name) {
                    console.log(`Ricaricato ${pull.name} (cmd)`)
                    bot.commands.set(pull.name, pull)
                }

                if(pull.aliases && Array.isArray(pull.aliases)) {
                    pull.aliases.forEach((alias) => {
                        bot.aliases.set(alias, pull.name)
                    })
                }

                message.channel.send({ content: `Ricaricato ${pull.name} (cmd)` })
            })
        })
    }
};