const Discord = require('discord.js')

module.exports = {
    name: "apply-staff",

    async run(bot, message, args) {
      if(message.member.roles.cache.has("799045471153946678")) return message.reply("L'amministrazione ha deciso che non potrai eseguire questo comando a causa del tuo ruolo (candidatura staff bloccata)!")
      
      message.delete()
        message.channel.send(`**${message.author} vai nei miei dm (messaggi privati), rispondendo a tutte le mie domande per poter compilare il modulo del bando staff!**`).then(msg => {
            setTimeout(() => {
                msg.delete()
            }, 20000)
        })
        
        const questions = [
            "Qual'è il tuo nome?",
            "Qual'è il tuo cognome (facoltativo)?",
            "Quanti anni hai?",
            "Hai avuto esperienze nello staff in altri server?",
            "In una situazione di stress, cosa fai?",
            "Se un amministratore o un tuo superiore ti dice qualcosa, tu sei disposto a farla?",
            "Quali sono i tuoi pregi?",
            "Quali sono i tuoi difetti?",
            "Sai maneggiare bene le meccaniche di discord e i suoi bot?",
            "Sei disposto a sacrificare il tuo RP per fare la maggior parte delle volte assistenza?",
            "Qual'è il tuo nick PSN?",
            "Perchè vuoi entrare nello staff?",
            "Sei consapevole che a volte dovrai fare cose noiose o stancanti?",
            "Da quanto tempo sei nel server?",
            "Sei consapevole che essendo staffer il tuo RP dovrà essere perfetto?",
            "Hai letto tutti i regolamenti del server?",
            "Sei consapevole che se non sarai quasi sempre online su discord e in sessione verrai degradato o rimosso da staff?"
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
                channel.send("**Il tuo bando staff è stato inviato con successo all'amministrazione, nei prossimi giorni verrai contattato da me in dm per sapere l'esito del tuo bando!**")
                collector.stop("fulfilled")
            }
        })

        const appsChannel = bot.channels.cache.get("871139855449604116")
        collector.on("end", (collected, reason) => {
            if(reason === "fulfilled") {
                let index = 1;
                const mappedResponses = collected.map((msg) => {
                    return `\`${index++})\` **${questions[endCounter++]}\n-> \`${msg.content}\`**`
                }).join("\n\n")

                appsChannel.send({ embeds:
                    [new Discord.MessageEmbed()
                    .setAuthor(message.author.tag, message.author.displayAvatarURL({ dynamic: true }))
                    .setTitle("**__Nuovo Bando Inviato!__**")
                    .setDescription(`**Nuovo bando staff inviato da: ${message.author} ( \`${message.author.id}\` )**\n\n` + mappedResponses)
                    .setColor("RANDOM")
                    .setTimestamp()]
                })
            }
        })
    }
};