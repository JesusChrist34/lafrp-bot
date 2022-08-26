const Discord = require('discord.js')
const Schema = require("../../models/arresti")
const ms = require("ms")

module.exports = {
    name: "create-arresto",

    async run(bot, message, args) {

        if(message.member.roles.cache.has("959179328921415680")) {

        const userMention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!userMention) return message.reply("Perfavore, specifica un utente da voler arrestare!")

        const collector = message.channel.createMessageCollector({
          filter: (m) => m.author.id === message.author.id,
          time: 300000,
          errors: ["time"]
      });

        function waitingEmbed(title, desc) {
          return message.channel.send({ embeds: [
              new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setTitle('Creazione Arresto || ' + title)
                .setDescription(`**${desc} entro i prossimi 5 minuti!**`)
                .setFooter("Scrivi \"Annulla\" per annullare questo processo!", bot.user.displayAvatarURL())
                .setTimestamp()
                .setColor('#2F3136'),
                ]
              });
      }

        let authorName, authorPS4, userName, userPS4, reason, duration, cancelled;

        await waitingEmbed('Nome Agente', 'Perfavore, inserisci il tuo nome e cognome');

        collector.on('collect', async (m) => {
            if (cancelled) return;
        
            async function failed(options, ...cancel) {
              if (typeof cancel[0] === 'boolean')
                (cancelled = true) && (await m.reply(options));
              else {
                await m.reply(
                  options instanceof Discord.MessageEmbed ? { embeds: [options] } : options
                );
                return await waitingEmbed(...cancel);
              }
            }
        
            if (m.content === 'Annulla') {
                await collector.stop()
                return await failed('**Processo di creazione di un arresto annullato con successo!**', true)
            }
        
            switch (true) {
              case !authorName: {
                if (m.content.length > 100)
                  return await failed(
                    'Il tuo nome e cognome non possono superare i 100 caratteri!',
                    'Nome Agente',
                    'Perfavore, inserisci il tuo nome e cognome'
                  );
                else {
                  authorName = m.content;
                  await waitingEmbed('Nick PS4', 'Perfavore, inserisci il tuo nick PS4');
                }
        
                break;
              }
        
              case !authorPS4: {
                if (m.content.length > 100)
                  return await failed(
                    'Il tuo nick PS4 non può superare i 100 caratteri!',
                    'Nick PS4',
                    'Perfavore, inserisci il tuo nick PS4'
                  );
                else {
                  authorPS4 = m.content;
                  await waitingEmbed('Nome Prigioniero', 'Perfavore, inserisci il nome e cognome del prigioniero');
                }
        
                break;
              }
        
              case !userName: {
                if (m.content.length > 100)
                  return await failed(
                    'Il nome e cognome del prigioniero non possono superare i 100 caratteri!',
                    'Nome Prigioniero',
                    'Perfavore, inserisci il nome e cognome del prigioniero'
                  );
                else {
                  userName = m.content;
                  await waitingEmbed('Nick PS4', 'Perfavore, inserisci il nick PS4 del prigioniero');
                }
        
                break;
              }

              case !userPS4: {
                if (m.content.length > 100)
                  return await failed(
                    'Il nick PS4 del prigioniero non può superare i 100 caratteri!',
                    'Nick PS4',
                    'Perfavore, inserisci il nick PS4 del prigioniero'
                  );
                else {
                  userPS4 = m.content;
                  await waitingEmbed('Motivo Arresto', 'Perfavore, inserisci uno, o più, motivi dell\'arresto');
                }
        
                break;
              }

              case !reason: {
                if (m.content.length > 1500)
                  return await failed(
                    'Il motivo dell\'arresto non può superare i 1500 caratteri!',
                    'Motivo Arresto',
                    'Perfavore, inserisci uno, o più, motivi dell\'arresto'
                  );
                else {
                  reason = m.content;
                  await waitingEmbed('Durata Arresto', 'Perfavore, inserisci una durata dell\'arresto\n\n__Esempi:__\n`5m` (5 mesi [5 minuti])\n`1h` (1 anno [12 minuti])');
                }
        
                break;
              }

            case !duration: {
                if (m.content.length > 10)
                    return await failed(
                    'La durata dell\'arresto non può superare i 10 caratteri!',
                    'Durata Arresto',
                    'Perfavore, inserisci una durata dell\'arresto\n\n__Esempi:__\n`5m` (5 mesi [5 minuti])\n`1h` (1 anno [12 minuti])'
                );
                else {
                    duration = m.content;
                }

                const canale = bot.channels.cache.get("1008323108538691595")

                const tempo1 = ms(duration)
        if(!tempo1) return interaction.reply({ content: "Perfavore, specifica una durata valida!\n__Esempi:__\n`5m` (5 mesi [5 minuti])\n`1h` (1 anno [12 minuti])", ephemeral: true })

          var tempo = ms(tempo1, { long: true });
            tempo = tempo + ""
            tempo = tempo.replace("minute ", "mese ")
            tempo = tempo.replace("minutes", "mesi")
            tempo = tempo.replace("day", "anno")
            tempo = tempo.replace("days", "anni")

                const embed = new Discord.MessageEmbed()
                .setTitle("**__Nuovo Arresto__**")
                .setDescription(`**E' stato creato un nuovo arresto da ${message.author.toString()} ( \`${message.author.id}\` ) nei confronti di ${userMention} ( \`${userMention.id}\` )!**`)
                .addField("**Nome & Cognome Poliziotto:**", `\`${authorName}\``, true)
                .addField("**Nick PS4 Poliziotto:**", `\`${authorPS4}\``, true)
                .addField("**Nome & Cognome Prigioniero:**", `\`${userName}\``, true)
                .addField("**Nick PS4 Prigioniero:**", `\`${userPS4}\``, true)
                .addField("**Motivo/i Arresto:**", `\`${reason}\``, true)
                .addField("**Durata Arresto:**", `\`${tempo}\``, true)
                
                const msg = await canale.send({ embeds: [embed] })

                const data = new Schema({
                    Guild: message.guild.id,
                    Msg: msg.id,
                    AuthorID: message.author.id,
                    Author: authorName,
                    AuthorPS4: authorPS4,
                    User: userName,
                    UserPS4: userPS4,
                    Reason: reason,
                    Duration: duration
                    })
                await data.save()
                message.channel.send("**L'arresto è stato salvato con successo nel database!**")
                collector.stop()

                setTimeout(async () => {
                const message = await canale.messages.fetch(data.Msg)

                const user = message.guild.members.cache.get(userMention.id)

                const newEmbed = new Discord.MessageEmbed()
                .setTitle("**__Nuovo Arresto__**")
                .setDescription(`**E' stato creato un nuovo arresto da <@${data.AuthorID}> ( \`${data.AuthorID}\` ) nei confronti di ${userMention} ( \`${userMention.id}\` )!\n\n<:Approvato:875017696834625609> Questa pena è stata scontata con successo!**`)
                .addField("**Nome & Cognome Poliziotto:**", `\`${authorName}\``, true)
                .addField("**Nick PS4 Poliziotto:**", `\`${authorPS4}\``, true)
                .addField("**Nome & Cognome Prigioniero:**", `\`${userName}\``, true)
                .addField("**Nick PS4 Prigioniero:**", `\`${userPS4}\``, true)
                .addField("**Motivo/i Arresto:**", `\`${reason}\``, true)
                .addField("**Durata Arresto:**", `\`${duration}\``, true)
                await message.edit({ embeds: [newEmbed] })
                await user.send("**La tua pena è stata scontata con successo! Da ora sei libero.**")
                }, ms(duration))
              }
            }
          });

          collector.on('end', (collected, reason) => {
            if (reason == 'time') {
               message.reply({ content: "**Hai impiegato troppo tempo a rispondere a questa domanda, di conseguenza il processo di creazione di un arresto è stato annullato. Riprova di nuovo!**" })
            }
          })
        }
    },
};