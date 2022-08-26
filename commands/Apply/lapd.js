const Discord = require('discord.js')

module.exports = {
    name: "apply-lapd",

    async run(bot, message, args) {
        message.delete()
        message.channel.send(`**${message.author} vai nei miei dm (messaggi privati), rispondendo a tutte le mie domande per poter compilare il modulo del bando LAPD!**`).then(msg => {
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
          "Perchè vuoi entrare all'interno della LAPD?",
          "In caso di aggressione a pubblico ufficiale come ti comporti?",
          "Parlami e spiegami un po' il codice della strada",
          "Spiegami la differenza tra teaser e pistola, e in che situazioni vanno usati i due",
          "Il porto d'armi LVL 3 ti permette di avere una pistola con te?",
          "Se fermi una persona con una maschera senza un motivo valido come ti comporti?",
          "Se fermi una persona senza patente con un auto rubata come ti comporti?",
          "Sei consapevole del fatto che rischierai la vita facendo questo lavoro?",
          "Sei consapevole del fatto che potresti essere ferito, ucciso, rapito, torturato, maltrattato o aggredito facendo questo lavoro?"
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
                channel.send("**Il tuo bando LAPD è stato inviato con successo al capo dipartimento, nelle prossime ore ti verrà dato l'esito del tuo bando in <#1008332706112868454>!**")
                collector.stop("fulfilled")
            }
        })

        const appsChannel = bot.channels.cache.get("799045607133151295")
        collector.on("end", (collected, reason) => {
            if(reason === "fulfilled") {
                let index = 1
                const mappedResponses = collected.map((msg) => {
                    return `\`${index++})\` **${questions[endCounter++]}\n-> \`${msg.content}\`**`
                }).join("\n\n")

                appsChannel.send({ content: "[ <@&872123342352703509> ]", embeds: [new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTitle("**__Nuovo Bando Inviato!__**")
                    .setDescription(`**Nuovo bando LAPD inviato da: ${message.author} ( \`${message.author.id}\` )**\n` + mappedResponses)
                    .setColor("RANDOM")
                    .setTimestamp()]
                })
            }
        })
    }
};