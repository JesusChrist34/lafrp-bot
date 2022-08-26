const Discord = require('discord.js')

module.exports = {
    name: "create-documento",

    async run(bot, message, args) {
      
        message.delete()
        message.channel.send(`**${message.author} vai nei miei dm (messaggi privati), rispondendo a tutte le mie domande per poter compilare il modulo della creazione documenti!**`).then((msg) => {
            setTimeout(() => {
                msg.delete()
            }, 20000)
        })

        const questions = [
            "Nome IC:",
            "Cognome IC:",
            "Nucleo Familiare:",
            "Data di Nascita:",
            "Luogo di Nascita:",
            "Cittadinanza:",
            "Colore Capelli:",
            "Colore Occhi:",
            "Segni Particolari:",
            "Altezza:",
            "Peso:",
            "Stato Sentimentale ( Single / Fidanzato / Sposato ):",
            "Anni IC:",
            "Anni OOC:",
            "Storia PG ( Almeno 5 Righe ):",
            "ID PS4:",
            "ID Social Club:"
        ];

        let collectCounter = 0;
        let endCounter = 0;
        
        const appStart = await message.author.send(questions[0])
        const channel = appStart.channel
        
        const collector = channel.createMessageCollector({
            filter: (m) => m.author.id === message.author.id,
        });

        collector.on("collect", () => {
            collectCounter++;
            if(collectCounter < questions.length) {
                channel.send(questions[collectCounter])
            } else {
                channel.send("**Hai creato con successo i tuoi documenti!**")
                collector.stop("fulfilled")
            }
        })

        const appsChannel = bot.channels.cache.get("1008332949877440603")
        collector.on("end", (collected, reason) => {
            if(reason === "fulfilled") {
                let index = 1;
                const mappedResponses = collected.map((msg) => {
                    return `\`${index++})\` **${questions[endCounter++]}\n-> \`${msg.content}\`**`
                }).join("\n\n")

                appsChannel.send({ embeds: [
                    new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTitle("**__Nuovi Documenti__**")
                    .setDescription(`**Nuovi documenti creati da: ${message.author.toString()} ( \`${message.author.id}\` )**\n\n` + mappedResponses)
                    .setColor("RANDOM")
                    .setTimestamp()
                  ]
                })
            }
        })
    }
};