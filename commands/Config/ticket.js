const Discord = require('discord.js')
const Schema = require("../../models/ticket")
const Premium = require("../../models/premium")

const utilizzo = new Discord.MessageEmbed()
.setTitle("**__Utilizzo Del Comando:__**")
.setDescription(`
\`!ticket {argomento}\`

*Configura pannelli, logs, transcript, modifica, visiona le informazioni, o invia un pannello del ticket system all'interno del server. Il bot creerà in modo automatico un canale privato con il ruolo di supporto!*

**Argomenti Disponibili:**
\`create\` = per creare un pannello dei tickets
\`edit {ID Pannello}\` = per modificare un pannello
\`delete {ID Pannello}\` = per eliminare un pannello
\`send {ID Pannello}\` = per inviare un pannello
\`logs {#canale}\` = per configurare il canale dei logs
\`transcript {#canale}\` = per configurare il canale dei transcript
\`info <ID Pannello>\` = per mostrare le informazioni di uno, o più pannelli

**Note:**
Si consiglia di ri-settare il canale dei transcript e il canale dei log ogni volta che viene creato un pannello.

**Esempi:**
\`!ticket create
!ticket edit 8474838937948533
!ticket delete 8474838937948533
/ticket send 8474838937948533
!ticket logs #ticket-logs
!ticket transcript #ticket-transcript
!ticket info\`
`)
.setColor("RANDOM")
.setFooter("Los Angeles Full RP Bot Help System")
.setTimestamp()

module.exports = {
    name: "ticket",
    UserPerms: ["ADMINISTRATOR"],
    timeout: 5000,

    async run(bot, message, args) {

        const query = args[0]
        if(!query) return message.reply({ embeds: [utilizzo] })
        if(query !== "create" && query !== "edit" && query !== "delete" && query !== "send" && query !== "logs" && query !== "transcript" && query !== "info") return message.reply({ content: "Questo argomento non esiste. Specifica un argomento valido!", embeds: [utilizzo] })

        if(query === "create") {
    
            const check = await Premium.findOne({ Guild: message.guild.id })
            var user = bot.users.cache.get(message.author.id)
            let result = await Schema.countDocuments({ Guild: message.guild.id })
    
            if(!check) {
                if(result == 2) return message.reply({ content: "Puoi creare soltanto un massimo di due pannelli dei tickets per server. I server premium invece potranno creare un massimo di 4 pannelli per server!" })
            } else {
                if(result == 4) return message.reply({ content: "Puoi creare soltanto un massimo di quattro pannelli dei tickets per server!" })
            }

            function makeid(length) {
              var result           = '';
              var characters       = '0123456789';
              var charactersLength = characters.length;
              for ( var i = 0; i < length; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * 
           charactersLength));
             }
             return result;
          }

        const collector = message.channel.createMessageCollector({
            filter: (m) => m.author.id === message.author.id,
            time: 300000,
        });

        function waitingEmbed(title, desc) {
            return message.channel.send({
              embeds: [
                new Discord.MessageEmbed()
                  .setAuthor(message.author.tag, message.member.displayAvatarURL())
                  .setTitle('Configurazione Ticket || ' + title)
                  .setDescription(`**${desc} entro i prossimi 5 minuti!**`)
                  .setFooter("Scrivi \"Annulla\" per annullare questo processo!", bot.user.displayAvatarURL())
                  .setTimestamp()
                  .setColor('#2F3136'),
              ],
            });
        }

        let name, category, role, msg, cancelled;

        await waitingEmbed('Nome Pannello', 'Perfavore, inserisci un nome da inserire al pannello');

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
                return await failed('**Processo di creazione di un pannello dei ticket annullato con successo!**', true);
            }
        
            switch (true) {
              case !name: {
                if (m.content.length > 50)
                  return await failed(
                    'Il nome del pannello non può essere più lungo di 50 caratteri!',
                    'Nome Pannello',
                    'Perfavore, inserisci un nome da inserire al pannello'
                  );
                else {
                  name = m.content;
                  await waitingEmbed('Categoria Tickets', 'Perfavore, inserisci l\'id di una categoria in cui verranno creati i ticket');
                }
        
                break;
              }
        
              case !category: {
                if (!(_category = m.content))
                  return await failed(
                    'Perfavore, specifica un ID valido di una categoria',
                    'Categoria Tickets',
                    'Perfavore, inserisci l\'id di una categoria in cui verranno creati i ticket'
                  );
                else if (_category.type === "GUILD_CATEGORY")
                 return await failed(
                  'Sono consentite soltanto categorie!',
                  'Categoria Tickets',
                  'Perfavore, inserisci l\'id di una categoria in cui verranno creati i ticket'
                  );
                else {
                  category = _category;
                  await waitingEmbed(
                    'Ruolo di Supporto',
                    'Perfavore, menziona o inserisci l\'id di un ruolo che si occuperà dei tickets di questo pannello'
                  );
                }
        
                break;
              }
        
              case !role: {
                if (!(_role = m.mentions.roles.first() || m.guild.roles.cache.get(m.content)))
                  return await failed(
                    'Perfavore, menziona o inserisci L\'ID di un valido ruolo',
                    'Ruolo di Supporto',
                    'Perfavore, menziona o inserisci l\'id di un ruolo che si occuperà dei tickets di questo pannello'
                  );
                else {
                  role = _role;
                  await waitingEmbed(
                    'Messaggio Embed',
                    'Perfavore, specifica un messaggio che verrà inviato ogni volta che un utente aprirà un ticket'
                  );
                }
        
                break;
              }

            case !msg: {
                if (m.content.length > 300)
                    return await failed(
                    'Il messaggio embed non può essere più lungo di 300 caratteri!',
                    'Messaggio Embed',
                    'Perfavore, specifica un messaggio che verrà inviato ogni volta che un utente aprirà un ticket'
                );
                else {
                    msg = m.content;
                }

                const data = new Schema({
                        ID: makeid(18),
                        Number: "0000",
                        Name: name,
                        Guild: message.guild.id,
                        Category: category,
                        Role: role.id || role,
                        Description: msg,
                        Transcript: "none",
                        Logs: "none",
                    })
                await data.save()
                user.send({ content: `**Tutti i settaggi riguardanti il pannello dei ticket sono stati salvati con successo!\n__ID Pannello:__ \`${data.ID}\`**` })
                message.channel.send({ content: "**Questo pannello è stato configurato con successo!**" })
                collector.stop()
              }
            }
          });

          collector.on('end', (collected, reason) => {
            if (reason == 'time') {
               message.reply({ content: "**Hai impiegato troppo tempo a rispondere a questa domanda, di conseguenza il processo di creazione di un pannello dei tickets è stato annullato. Riprova di nuovo!**" })
            }
          })
      } else if(query === "edit") {
        const id = await args[1]
        if(!id) return message.reply({ embeds: [utilizzo] })

        const collector = message.channel.createMessageCollector({
          filter: (m) => m.author.id === message.author.id,
          time: 300000,
      });

      function waitingEmbed(title, desc) {
          return message.channel.send({
            embeds: [
              new Discord.MessageEmbed()
                .setAuthor(message.author.tag, message.member.displayAvatarURL())
                .setTitle('Modifica Pannello || ' + title)
                .setDescription(`**${desc} entro i prossimi 5 minuti!**`)
                .setFooter("Scrivi \"Annulla\" per annullare questo processo!", bot.user.displayAvatarURL())
                .setTimestamp()
                .setColor('#2F3136'),
            ],
          });
      }

      let name, category, role, msg, cancelled;

      await waitingEmbed('Nome Pannello', 'Perfavore, inserisci un nome da inserire al pannello');

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
              return await failed('**Processo di modifica di un pannello dei ticket annullato con successo!**', true);
          }
      
          switch (true) {
            case !name: {
              if (m.content.length > 50)
                return await failed(
                  'Il nome del pannello non può essere più lungo di 50 caratteri!',
                  'Nome Pannello',
                  'Perfavore, inserisci un nome da inserire al pannello'
                );
              else {
                name = m.content;
                await waitingEmbed('Categoria Tickets', 'Perfavore, inserisci l\'id di una categoria in cui verranno creati i ticket');
              }
      
              break;
            }
      
            case !category: {
              if (!(_category = m.content))
                return await failed(
                  'Perfavore, specifica un ID valido di una categoria',
                  'Categoria Tickets',
                  'Perfavore, inserisci l\'id di una categoria in cui verranno creati i ticket'
                );
              else if (_category.type === "GUILD_CATEGORY")
               return await failed(
                'Sono consentite soltanto categorie!',
                'Categoria Tickets',
                'Perfavore, inserisci l\'id di una categoria in cui verranno creati i ticket'
                );
              else {
                category = _category;
                await waitingEmbed(
                  'Ruolo di Supporto',
                  'Perfavore, menziona o inserisci l\'id di un ruolo che si occuperà dei tickets di questo pannello'
                );
              }
      
              break;
            }
      
            case !role: {
              if (!(_role = m.mentions.roles.first() || m.guild.roles.cache.get(m.content)))
                return await failed(
                  'Perfavore, menziona o inserisci L\'ID di un valido ruolo',
                  'Ruolo di Supporto',
                  'Perfavore, menziona o inserisci l\'id di un ruolo che si occuperà dei tickets di questo pannello'
                );
              else {
                role = _role;
                await waitingEmbed(
                  'Messaggio Embed',
                  'Perfavore, specifica un messaggio che verrà inviato ogni volta che un utente aprirà un ticket'
                );
              }
      
              break;
            }

          case !msg: {
              if (m.content.length > 300)
                  return await failed(
                  'Il messaggio embed non può essere più lungo di 300 caratteri!',
                  'Messaggio Embed',
                  'Perfavore, specifica un messaggio che verrà inviato ogni volta che un utente aprirà un ticket'
              );
              else {
                  msg = m.content;
              }
      
          await Schema.findOne({ ID: id, Guild: message.guild.id }, async(err, data) => {
            if(data) {
                data.Name = name;
                data.Category = category;
                data.Role = role.id || role;
                data.Description = msg;
                data.save();
            }
            message.channel.send({ content: "**Il pannello dei ticket è stato modificato con successo!**" })
           })
            collector.stop()
            }
          }
        });

        collector.on('end', (collected, reason) => {
          if (reason == 'time') {
             message.reply({ content: "**Hai impiegato troppo tempo a rispondere a questa domanda, di conseguenza il processo di creazione di un pannello dei tickets è stato annullato. Riprova di nuovo!**" })
          }
        })
      } else if(query === "delete") {
        const id = await args[1]
        if(!id) return message.reply({ content: "Perfavore, specifica un ID di un pannello da eliminare!", embeds: [utilizzo] })

        const data = await Schema.findOne({ ID: id })
        
        if(data) {
          data.delete()
          message.channel.send({ content: "**Ho eliminato con successo questo pannello dei tickets!**" })
        }
      } else if(query === "logs") {
        const logs = await message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        if(!args[1]) return message.reply({ content: "Perfavore, specifica un canale da settare!", embeds: [utilizzo] })
        if(!logs) return message.reply({ content: "Questo canale non esiste. Specifica un canale valido!" })

        Schema.updateMany({ Guild: message.guild.id }, {
        Logs: logs.id || logs, 
}, function(err, numberAffected, rawResponse) {
   //handle it
})
        message.channel.send({ content: `**Il canale dei logs dei ticket è stato configurato con successo!**` });
      } else if(query === "transcript") {
        const transcript = await message.mentions.channels.first() || message.guild.channels.cache.get(args[1]);
        if(!args[1]) return message.reply({ content: "Perfavore, specifica un canale da settare!", embeds: [utilizzo] })
        if(!transcript) return message.reply({ content: "Questo canale non esiste. Specifica un canale valido!" })

        Schema.updateMany({ Guild: message.guild.id }, {
            Transcript: transcript.id || transcript, 
    }, function(err, numberAffected, rawResponse) {
       //handle it
    })
        message.channel.send({ content: `**Il canale dei transcript dei ticket è stato configurato con successo!**` });
      } else if(query === "info") {
        const id = await args[1]

        if(id) {
         const data = await Schema.findOne({ ID: id, Guild: message.guild.id })
         if(data) {
             if(data.Transcript === "none") {
                 Transcript = "`Nessun canale configurato`"
             } else {
                 Transcript = `<#${data.Transcript}>`
             }
             if(data.Logs === "none") {
                 Logs = "`Nessun canale configurato`"
             } else {
                 Logs = `<#${data.Logs}>`
             }
             const embed = new Discord.MessageEmbed()
             .setTitle("**__Info Pannello Ticket__**")
             .setDescription("**Ecco tutte le info settate di questo pannello dei ticket per questo server!**")
             .addField("**ID Pannello:**", `\`${data.ID}\``)
             .addField("**Nome Pannello:**", `\`${data.Name}\``)
             .addField("**Categoria:**", `<#${data.Category}>`)
             .addField("**Ruolo Di Supporto:**", `<@&${data.Role}>`)
             .addField("**Messaggio:**", `\`${data.Description}\``)
             .addField("**Canale Logs:**", `${Logs}`)
             .addField("**Canale Transcript:**", `${Transcript}`)
             .setTimestamp()
             .setColor("RANDOM")
             message.channel.send({ embeds: [embed] })
            } else {
                return message.reply({ content: "Non è stato trovato nessun pannello con questo ID!" })
            }
            } else {
                const data = await Schema.find({ Guild: message.guild.id })
                const logs = await Schema.findOne({ Guild: message.guild.id })
                const transcript = await Schema.findOne({ Guild: message.guild.id })
                if(data) {
                    if(transcript.Transcript == "none") {
                        Channel = "`Nessun canale configurato`"
                    } else {
                        Channel = `<#${logs.Transcript}>`
                    }
                    if(logs.Logs == "none") {
                        Channel2 = "`Nessun canale configurato`"
                    } else {
                        Channel2 = `<#${logs.Logs}>`
                    }
                    const embed2 = new Discord.MessageEmbed()
                    .setTitle("**__Info Pannelli Ticket__**")
                    .setDescription(`
**Ecco tutte le info settate dei pannelli dei ticket per questo server!

Canale Logs: ${Channel2}
Canale Transcript: ${Channel}**
`)
                    .setTimestamp()
                    .setColor("RANDOM")
                    for (let result of data) {
                        embed2.addField(result.Name, `**ID Pannello: \`${result.ID}\`\nCategoria: <#${result.Category}>\nRuolo Di Supporto: <@&${result.Role}>\nMessaggio:** \`\`\`${result.Description}\`\`\``, true)
                      }
                    message.channel.send({ embeds: [embed2] })
                } else {
                    return message.reply({ content: "Non sono state configurate tutte le informazioni necessarie per il sistema di ticket!\nEsegui il comando `!ticket` per poter configurare il sistema dei ticket e poter rifare questo comando." })
                }
             }
      }
    },
};