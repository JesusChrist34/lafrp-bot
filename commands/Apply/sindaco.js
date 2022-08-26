const Discord = require('discord.js')

module.exports = {
    name: "apply-sindaco",

    async run(bot, message, args) {
        message.delete()
        message.channel.send(`**${message.author} vai nei miei dm (messaggi privati), rispondendo a tutte le mie domande per poter compilare il modulo del bando sindaco!**`).then(msg => {
            setTimeout(() => {
                msg.delete()
            }, 20000)
        })

        const questions = [
          "Qual'è il tuo nome (IC)?",
          "Qual'è il tuo cognome (IC)?",
          "Quanti anni hai (IC)?",
          "Quali lavori hai fatto?",
          "Qual'è la tua campagna elettorale?"
        ];

        let collectCounter = 0;
        let endCounter = 0;
        
        const appStart = await message.author.send(questions[0])
        const channel = appStart.channel
        
        const collector = channel.createMessageCollector({
            filter: (m) => m.author.id === message.author.id
        });

        collector.on("collect", () => {
            collectCounter++;
            if(collectCounter < questions.length) {
                channel.send(questions[collectCounter])
            } else {
                channel.send("**Il tuo bando sindaco è stato inviato con successo all'amministrazione, nelle prossime ore ti verrà dato l'esito del tuo bando in <#1008332706112868454>!**")
                collector.stop("fulfilled")
            }
        })

        const appsChannel = bot.channels.cache.get("799045736276557834")
        collector.on("end", (collected, reason) => {
            if(reason === "fulfilled") {
                let index = 1
                const mappedResponses = collected.map((msg) => {
                    return `\`${index++})\` **${questions[endCounter++]}\n-> \`${msg.content}\`**`
                }).join("\n\n")

                appsChannel.send({ content: "[ <@&799045311245844530> ]", embeds: [new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTitle("**__Nuovo Bando Inviato!__**")
                    .setDescription(`**Nuovo bando sindacoc inviato da: ${message.author} ( \`${message.author.id}\` )**\n` + mappedResponses)
                    .setColor("RANDOM")
                    .setTimestamp()]
                })
            }
        })
    }
};