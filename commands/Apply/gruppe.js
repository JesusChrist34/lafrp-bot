const Discord = require('discord.js')

module.exports = {
    name: "apply-gruppe",

    async run(bot, message, args) {

        message.delete()
        message.channel.send(`**${message.author} vai nei miei dm (messaggi privati), rispondendo a tutte le mie domande per poter compilare il modulo del bando Gruppe Sechs!**`).then(msg => {
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
          "Perchè vuoi entrare all'interno della Gruppe Sechs?",
          "In caso di assalto al convoglio come ti comporti?",
          "Se vedi un gruppo di possibili sospetti girare più volte intorno al convoglio, o direttamente seguirlo, come ti comporti?",
          "Sei consapevole del fatto che rischierai la vita facendo questo lavoro?",
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
                channel.send("**Il tuo bando Gruppe Sechs è stato inviato con successo al CEO, nelle prossime ore ti verrà dato l'esito del tuo bando in <#1008332706112868454>!**")
                collector.stop("fulfilled")
            }
        })

        const appsChannel = bot.channels.cache.get("942145374246797312")
        collector.on("end", (collected, reason) => {
            if(reason === "fulfilled") {
                let index = 1
                const mappedResponses = collected.map((msg) => {
                    return `\`${index++})\` **${questions[endCounter++]}\n-> \`${msg.content}\`**`
                }).join("\n\n")

                appsChannel.send({ content: "[ <@&942149562632663133> ]", embeds: [new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTitle("**__Nuovo Bando Inviato!__**")
                    .setDescription(`**Nuovo bando Gruppe Sechs inviato da: ${message.author} ( \`${message.author.id}\` )**\n${mappedResponses}`)
                    .setColor("RANDOM")
                    .setTimestamp()]
                })
            }
        })
    }
};