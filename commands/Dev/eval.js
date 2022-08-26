const Discord = require('discord.js')
const MessageEmbed = require('discord.js')
const { inspect } = require('util')

module.exports = {
    name: "eval",

    async run(bot, message, args) {
        if(message.author.id !== '844691950799028235') return;

        const code = args.join(` `);
        if(!code) return message.reply({ content: 'Perfavore, specifica un codice da eseguire!' });

        try {
            const result = await eval(code);
            let output = result;
            if(typeof result !== 'string') {
                output = inspect(result)
            }

            message.delete()
            message.channel.send(output, { code: 'js' })
        } catch (error) {
            console.log(error)
        }
    }
};