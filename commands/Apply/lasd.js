const Discord = require('discord.js')

module.exports = {
    name: "apply-lasd",

    async run(bot, message, args) {
        message.delete()
        message.channel.send(`**${message.author} vai nei miei dm (messaggi privati), rispondendo a tutte le mie domande per poter compilare il modulo del bando LASD!**`).then(msg => {
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
          "Perchè vuoi entrare all'interno della LASD?",
          "Dimmi i tuoi pregi e i tuoi difetti che potresti avere in servizio",
          "Se un cittadino fa resistenza in un controllo stradale, come ti comporti?",
          "Parlami del codice penale",
          "Esponi quando bisogna usare la pistola e quando il teaser",
          "Quali armi può usare un cittadino se munito di un porto d'armi LVL 2?",
          "In caso compi un fermo stradale e trovi una persona ubriaca alla guida, come ti comporti?",
          "In caso fermi una persona senza documenti per la circolazione della vettura, come ti comporti?",
          "Da cosa è composta la divisa della LASD?",
          "Sei consapevole che potresti rimetterci la vita per questo lavoro?",
          "Cos'è la LASD?",
          "Sei consapevole che senza il completo della guardia carceraria non potrai entrare a far parte della LASD?"
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
                channel.send("**Il tuo bando LASD è stato inviato con successo allo sceriffo, nelle prossime ore ti verrà dato l'esito del tuo bando in <#1008332706112868454>!**")
                collector.stop("fulfilled")
            }
        })

        const appsChannel = bot.channels.cache.get("871833292649922651")
        collector.on("end", (collected, reason) => {
            if(reason === "fulfilled") {
                let index = 1
                const mappedResponses = collected.map((msg) => {
                    return `\`${index++})\` **${questions[endCounter++]}\n-> \`${msg.content}\`**`
                }).join("\n\n")

                appsChannel.send({ content: "[ <@&870653803559534682> ]", embeds: [new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTitle("**__Nuovo Bando Inviato!__**")
                    .setDescription(`**Nuovo bando LASD inviato da: ${message.author} ( \`${message.author.id}\` )**\n` + mappedResponses)
                    .setColor("RANDOM")
                    .setTimestamp()]
                })
            }
        })
    }
};