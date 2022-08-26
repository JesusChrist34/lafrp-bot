const Discord = require('discord.js')

module.exports = {
    name: "apply-lafd",

    async run(bot, message, args) {
        message.delete()
        message.channel.send(`**${message.author} vai nei miei dm (messaggi privati), rispondendo a tutte le mie domande per poter compilare il modulo del bando LAFD!**`).then(msg => {
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
          "In che settore ti sei laureato?",
          "Hai la fedina penale pulita?",
          "Sei a conoscenza che per entare in servizio dovrai obbligatoriamente munirti di patente B e C?",
          "Perché vuoi entrare nell'accademia del Los Angeles Fire Department?",
          "Che compiti svolge la LAFD?",
          "Hai nozioni mediche/di primo soccorso?",
          "Sai a cosa serve e come si utilizza un defibrillatore?",
          "Conosci qualche attrezzatura presente sull'autopompa?",
          "Conosci qualche attrezzatura presente sulle ambulanze?",
          "Cosa faresti se ti trovassi ad intervenire in un incidente stradale?",
          "Cosa faresti se ti trovassi ad intervenire per una casa in fiamme?",
          "Come ti comporti se devi effettuare il primo soccorso a una persona con ferite da taglio?",
          "Come ti comporti se devi soccorrere una persona che ha subito un trauma cranico?",
          "Sei a conoscenza che nonostante tutte le attrezzature e le misure di sicurezza potresti ritrovarti ad intervenire in situazioni ad alto rischio per la tua persona e dovrai mantere la calma e continuare l'intervento per il bene dei cittadini?",
          "Accettando questi termini accetti di prendere parte all'accademia e i rischi del mestiere ai quali andrai in contro, ti metterai in prima linea per la protezione e la sicurezza del cittadino e della città.",
          "Firma:"
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
                channel.send("**Il tuo bando LAFD è stato inviato con successo al Capo Battaglione, nelle prossime ore ti verrà dato l'esito del tuo bando in <#1008332706112868454>!**")
                collector.stop("fulfilled")
            }
        })

        const appsChannel = bot.channels.cache.get("799045610908942391")
        collector.on("end", (collected, reason) => {
            if(reason === "fulfilled") {
                let index = 1
                const mappedResponses = collected.map((msg) => {
                    return `\`${index++})\` **${questions[endCounter++]}\n-> \`${msg.content}\`**`
                }).join("\n\n")

                appsChannel.send({ content: "[ <@&906551605904683059> ]", embeds: [new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTitle("**__Nuovo Bando Inviato!__**")
                    .setDescription(`**Nuovo bando LAFD inviato da: ${message.author} ( \`${message.author.id}\` )**\n` + mappedResponses)
                    .setColor("RANDOM")
                    .setTimestamp()]
                })
            }
        })
    }
};