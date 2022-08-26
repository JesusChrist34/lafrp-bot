const Discord = require('discord.js')
const bot = require("../../index")

module.exports = {
    name: "kill-bot",

    async run(bot, message, args) {
        if(message.author.id !== "844691950799028235") return;

        let msg = await message.channel.send({ content: ':warning: Il bot verrà mandato offline. Sei sicuro di voler continuare? Rispondi con `Si` o `No`!' });

        const collector = message.channel.createMessageCollector((m) => m.author.id === message.author.id && ['Si', 'No'].includes(m.content), {
            time: 60000,
            max: 1
        });
        collector.on('collect', (m) => {
            const confirm = m.content === 'Si';
            collector.stop();
            if (confirm) {
                msg.edit({ content: "**Il bot verrà mandato offline a breve...**" }).then(() => {
                    bot.destroy()
                })

            } else {
                msg.edit({ content: 'Cancellato il processo di killare il bot!' });
            }
        })

        collector.on('end', (collected, reason) => {
            if (reason === 'time')
            msg.edit({ content: 'Tempo scaduto. Riprova di nuovo!' });
        })
    }
};