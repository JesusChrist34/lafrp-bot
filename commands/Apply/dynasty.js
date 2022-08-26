const Discord = require('discord.js')

module.exports = {
    name: "apply-dynasty",

    async run(bot, message, args) {
        message.delete()
        message.channel.send(`**${message.author} vai nei miei dm (messaggi privati), rispondendo a tutte le mie domande per poter compilare il modulo del bando dynasty!**`).then(msg => {
            setTimeout(() => {
                msg.delete()
            }, 20000)
        })
        
        const questions = [
          "Qual'è il tuo nome (IC)?",
          "Qual'è il tuo cognome (IC)?",
          "Quanti anni hai (OOC)?",
          "Quanti anni hai (IC)?",
          "Qual'è il tuo numero di telefono (IC)?",
          "Qual'è il tuo nick PS4?",
          "Quali lavori hai fatto?",
          "Perchè vuoi entrare all'interno dell'agenzia immobiliare?",
          "Hai mai avuto esperienze in questo campo?",
          "Sei consapevole del fatto che dovrai avere un comportamento consono nel posto di lavoro?",
          "Sei consapevole del fatto che se non rispetterai il regolamento verrai licenziato?",
          "Sei consapevole del fatto che dovrai essere attivo per svolgere questo lavoro?"
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
                channel.send("**Il tuo bando dynasty è stato inviato con successo al direttore, nelle prossime ore ti verrà dato l'esito del tuo bando in <#1008332706112868454>!**")
                collector.stop("fulfilled")
            }
        })

        const appsChannel = bot.channels.cache.get("799045613618593832")
        collector.on("end", (collected, reason) => {
            if(reason === "fulfilled") {
                let index = 1
                const mappedResponses = collected.map((msg) => {
                    return `\`${index++})\` **${questions[endCounter++]}\n-> \`${msg.content}\`**`
                }).join("\n\n")

                appsChannel.send({ content: "[ <@&799045438438637569> ]", embeds: [new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTitle("**__Nuovo Bando Inviato!__**")
                    .setDescription(`**Nuovo bando agenzia immobiliare inviato da: ${message.author} ( \`${message.author.id}\` )**\n` + mappedResponses)
                    .setColor("RANDOM")
                    .setTimestamp()]
                })
            }
        })
    }
};