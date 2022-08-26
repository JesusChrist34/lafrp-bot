const Discord = require('discord.js')
const Schema = require("../../models/database")

module.exports = {
    name: "database-add",

    async run(bot, message, args) {

      if(!message.member.roles.cache.has("959179328921415680")) return;

        const userMention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!userMention) return message.reply("Perfavore, specifica un utente da voler aggiungere al database!")

        const check = await Schema.findOne({ UserID: userMention.id })
        if(check) {
          return message.reply("Questo utente è stato già registrato all'interno dei file del database!")
        }

        const collector = message.channel.createMessageCollector({
          filter: (m) => m.author.id === message.author.id,
          time: 600000,
          errors: ["time"]
      });

      function waitingEmbed(title, desc) {
        return message.channel.send({ embeds: [
            new Discord.MessageEmbed()
              .setAuthor(message.author.tag, message.author.displayAvatarURL())
              .setTitle('Creazione Database || ' + title)
              .setDescription(`**${desc} entro i prossimi 5 minuti!**`)
              .setFooter("Scrivi \"Annulla\" per annullare questo processo!", bot.user.displayAvatarURL())
              .setTimestamp()
              .setColor('#2F3136'),
              ]
            });
    }

        let userName, userSurname, userYears, userCitizenship, userHair, userEyes, userSigns, userHeight, userWeight, userStatus, userIDPS4, weaponsLicense, level, weapons, drivingLicense, type, vehicles, property, job, hobby, fines, complaints, prejudiced, wanted, cancelled;

        await waitingEmbed('Nome Cittadino', 'Perfavore, inserisci il nome del cittadino');

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
                return await failed('**Processo di aggiunzione di un utente al database annullato con successo!**', true)
            }
        
            switch (true) {
              case !userName: {
                if (m.content.length > 30)
                  return await failed(
                    'Il nome del cittadino non può superare i 30 caratteri!',
                    'Nome Cittadino',
                    'Perfavore, inserisci il nome del cittadino'
                  );
                else {
                  userName = m.content;
                  await waitingEmbed('Cognome Cittadino', 'Perfavore, inserisci il cognome del cittadino');
                }
        
                break;
              }
        
              case !userSurname: {
                if (m.content.length > 30)
                  return await failed(
                    'Il cognome del cittadino non può superare i 30 caratteri!',
                    'Cognome Cittadino',
                    'Perfavore, inserisci il cognome del cittadino'
                  );
                else {
                  userSurname = m.content;
                  await waitingEmbed('Anni Cittadino', 'Perfavore, inserisci l\'età del cittadino');
                }
        
                break;
              }
        
              case !userYears: {
                if (m.content.length > 2)
                  return await failed(
                    'L\'età del cittadino non può superare i 2 caratteri!',
                    'Anni Cittadino',
                    'Perfavore, inserisci l\'età del cittadino'
                  );
                else {
                  userYears = m.content;
                  await waitingEmbed('Cittadinanza Cittadino', 'Perfavore, inserisci la cittadinanza del cittadino');
                }
        
                break;
              }

              case !userCitizenship: {
                if (m.content.length > 60)
                  return await failed(
                    'La cittadinanza del cittadino non può superare i 60 caratteri!',
                    'Cittadinanza Cittadino',
                    'Perfavore, inserisci la cittadinanza del cittadino'
                  );
                else {
                  userCitizenship = m.content;
                  await waitingEmbed('Colore Capelli', 'Perfavore, inserisci il colore dei capelli del cittadino');
                }
        
                break;
              }

              case !userHair: {
                if (m.content.length > 10)
                  return await failed(
                    'Il colore dei capelli del cittadino non può superare i 10 caratteri!',
                    'Colore Capelli',
                    'Perfavore, inserisci il colore dei capelli del cittadino'
                  );
                else {
                  userHair = m.content;
                  await waitingEmbed('Colore Occhi', 'Perfavore, inserisci il colore degli occhi del cittadino');
                }
        
                break;
              }

              case !userEyes: {
                if (m.content.length > 10)
                  return await failed(
                    'Il colore degli occhi del cittadino non possono superare i 10 caratteri!',
                    'Colore Occhi',
                    'Perfavore, inserisci il colore degli occhi del cittadino'
                  );
                else {
                  userEyes = m.content;
                  await waitingEmbed('Segni Particolari', 'Perfavore, inserisci tutti i segni particolari del cittadino, inserisci `Nessuno` se non nè ha nessuno');
                }
        
                break;
              }

              case !userSigns: {
                if (m.content.length > 200)
                  return await failed(
                    'I segni particolari del cittadino non possono superare i 200 caratteri!',
                    'Segni Particolari',
                    'Perfavore, inserisci tutti i segni particolari del cittadino, inserisci `Nessuno` se non nè ha nessuno'
                  );
                else {
                  userSigns = m.content;
                  await waitingEmbed('Altezza Cittadino', 'Perfavore, inserisci l\'altezza in cm ( esempio: `180` che sarebbero 1 metro e 80 cm ) del cittadino');
                }
        
                break;
              }

              case !userHeight: {
                if (m.content.length > 3)
                  return await failed(
                    'L\'altezza del cittadino non può superare i 3 caratteri!',
                    'Altezza Cittadino',
                    'Perfavore, inserisci l\'altezza in cm ( esempio: `180` che sarebbero 1 metro e 80 cm ) del cittadino'
                  );
                else {
                  userHeight = m.content;
                  await waitingEmbed('Peso Cittadino', 'Perfavore, inserisci il peso in kg ( esempio: `90kg` ) del cittadino');
                }
        
                break;
              }

              case !userWeight: {
                if (m.content.length > 5)
                  return await failed(
                    'Il peso del cittadino non può superare i 5 caratteri!',
                    'Peso Cittadino',
                    'Perfavore, inserisci il peso in kg ( esempio: `90kg` ) del cittadino'
                  );
                else {
                  userWeight = m.content;
                  await waitingEmbed('Stato Sentimentale', 'Perfavore, inserisci lo stato sentimentale ( single / fidanzato / sposato ) del cittadino');
                }
        
                break;
              }

              case !userStatus: {
                if (m.content.length > 9)
                  return await failed(
                    'Lo stato sentimentale del cittadino non può superare i 9 caratteri!',
                    'Stato Sentimentale',
                    'Perfavore, inserisci lo stato sentimentale ( single / fidanzato / sposato ) del cittadino'
                  );
                else {
                  userStatus = m.content;
                  await waitingEmbed('ID PS4', 'Perfavore, inserisci l\'ID PS4 del cittadino');
                }
        
                break;
              }

              case !userIDPS4: {
                if (m.content.length > 200)
                  return await failed(
                    'L\'ID PS4 del cittadino non può superare i 200 caratteri!',
                    'ID PS4',
                    'Perfavore, inserisci l\'ID PS4 del cittadino'
                  );
                else {
                  userIDPS4 = m.content;
                  await waitingEmbed('Porto D\'armi', 'Perfavore, inserisci `true` se il cittadino possiede il porto d\'armi di qualsiasi livello, inserisci `false` se non nè possiede nemmeno uno');
                }
        
                break;
              }

              case !weaponsLicense: {
                if (m.content.length > 5)
                  return await failed(
                    'Il risultato di questa risposta non può superare i 5 caratteri!',
                    'Porto D\'armi',
                    'Perfavore, inserisci `true` se il cittadino possiede il porto d\'armi di qualsiasi livello, inserisci `false` se non nè possiede nemmeno uno'
                  );
                else {
                  weaponsLicense = m.content;
                  await waitingEmbed('Livello Porto D\'armi', 'Perfavore, in caso la risposta alla domanda precedente è stata `true`, inserisci il livello di tutti i porto d\'armi che possiede il cittadino, altrimenti inserisci `0`');
                }
        
                break;
              }

              case !level: {
                if (m.content.length > 6)
                  return await failed(
                    'Il livello del porto d\'armi non può superare i 6 caratteri!',
                    'Livello Porto D\'armi',
                    'Perfavore, in caso la risposta alla domanda precedente è stata `true`, inserisci il livello di tutti i porto d\'armi che possiede il cittadino, altrimenti inserisci `0`'
                  );
                else {
                  level = m.content;
                  await waitingEmbed('Lista Armi', 'Perfavore, inserisci tutte le armi che possiede il cittadino separate tutte da una virgola, se non nè possiede nessuna inserisci `Nessuna In Possesso`');
                }
        
                break;
              }

              case !weapons: {
                if (m.content.length > 700)
                  return await failed(
                    'La lista delle armi del cittadino non può superare i 700 caratteri!',
                    'Lista Armi',
                    'Perfavore, inserisci tutte le armi che possiede il cittadino separate tutte da una virgola, se non nè possiede nessuna inserisci `Nessuna In Possesso`'
                  );
                else {
                  weapons = m.content;
                  await waitingEmbed('Patente Cittadino', 'Perfavore, inserisci `true` se il cittadino possiede almeno una patente, inserisci `false` se non ne possiede nessuna');
                }
        
                break;
              }

              case !drivingLicense: {
                if (m.content.length > 5)
                  return await failed(
                    'Il risultato di questa risposta non può superare i 5 caratteri!',
                    'Patente Cittadino',
                    'Perfavore, inserisci `true` se il cittadino possiede almeno una patente, inserisci `false` se non ne possiede nessuna'
                  );
                else {
                  drivingLicense = m.content;
                  await waitingEmbed('Tipologia Patente', 'Perfavore, inserisci tutte le patenti che possiede il cittadino separate tutte da una virgola, se non nè possiede nessuna inserisci `Nessuna In Possesso`');
                }
        
                break;
              }

              case !type: {
                if (m.content.length > 400)
                  return await failed(
                    'La lista delle patenti del cittadino non può superare i 400 caratteri!',
                    'Tipologia Patente',
                    'Perfavore, inserisci tutte le patenti che possiede il cittadino separate tutte da una virgola, se non nè possiede nessuna inserisci `Nessuna In Possesso`'
                  );
                else {
                  type = m.content;
                  await waitingEmbed('Lista Veicoli', 'Perfavore, inserisci tutti i veicoli che possiede il cittadino separate tutte da una virgola, se non nè possiede nessuna inserisci `Nessuno In Possesso`');
                }
        
                break;
              }

              case !vehicles: {
                if (m.content.length > 2000)
                  return await failed(
                    'La lista dei veicoli del cittadino non può superare i 2000 caratteri!',
                    'Lista Veicoli',
                    'Perfavore, inserisci tutti i veicoli che possiede il cittadino separate tutte da una virgola, se non nè possiede nessuna inserisci `Nessuno In Possesso`'
                  );
                else {
                  vehicles = m.content;
                  await waitingEmbed('Lista Proprietà', 'Perfavore, inserisci tutte le proprietà che possiede il cittadino separate tutte da una virgola, se non nè possiede nessuna inserisci `Nessuna In Possesso`');
                }
        
                break;
              }

              case !property: {
                if (m.content.length > 2000)
                  return await failed(
                    'La lista delle proprietà del cittadino non può superare i 2000 caratteri!',
                    'Lista Proprietà',
                    'Perfavore, inserisci tutte le proprietà che possiede il cittadino separate tutte da una virgola, se non nè possiede nessuna inserisci `Nessuna In Possesso`'
                  );
                else {
                  property = m.content;
                  await waitingEmbed('Lista Lavori', 'Perfavore, inserisci tutti i lavori del cittadino che svolge, se non nè svolge nessuno inserisci `Nessun Lavoro`');
                }
        
                break;
              }

              case !job: {
                if (m.content.length > 200)
                  return await failed(
                    'La lista dei lavori del cittadino che svolge non possono superare i 200 caratteri!',
                    'Lista Lavori',
                    'Perfavore, inserisci tutti i lavori del cittadino che svolge, se non nè svolge nessuno inserisci `Nessun Lavoro`'
                  );
                else {
                  job = m.content;
                  await waitingEmbed('Lista Hobby', 'Perfavore, inserisci tutti gli hobby del cittadino che svolge, se non nè svolge nessuno inserisci `Nessun Hobby`');
                }
        
                break;
              }

              case !hobby: {
                if (m.content.length > 100)
                  return await failed(
                    'La lista degli hobby del cittadino che svolge non possono superare i 100 caratteri!',
                    'Lista Hobby',
                    'Perfavore, inserisci tutti gli hobby del cittadino che svolge, se non nè svolge nessuno inserisci `Nessun Hobby`'
                  );
                else {
                  hobby = m.content;
                  await waitingEmbed('Numero Multe', 'Perfavore, inserisci il numero di multe prese del cittadino, se non nè ha presa nessuna inserisci `0`');
                }
        
                break;
              }

              case !fines: {
                if (m.content.length > 100)
                  return await failed(
                    'Il numero di multe prese del cittadino non può superare i 100 caratteri!',
                    'Numero Multe',
                    'Perfavore, inserisci il numero di multe prese del cittadino, se non nè ha presa nessuna inserisci `0`'
                  );
                else {
                  fines = m.content;
                  await waitingEmbed('Numero Denunce', 'Perfavore, inserisci il numero di denunce che ha preso il cittadino, se non è mai stato denunciato inserisci `0`');
                }
        
                break;
              }

              case !complaints: {
                if (m.content.length > 100)
                  return await failed(
                    'Il numero di denunce che ha il cittadino non può superare i 100 caratteri!',
                    'Numero Denunce',
                    'Perfavore, inserisci il numero di denunce che ha preso il cittadino, se non è mai stato denunciato inserisci `0`'
                  );
                else {
                  complaints = m.content;
                  await waitingEmbed('Cittadino Pregiudicato', 'Perfavore, inserisci `true` se il cittadino è stato arrestato almeno una volta, inserisci `false` se non è mai stato arrestato');
                }
        
                break;
              }

              case !prejudiced: {
                if (m.content.length > 5)
                  return await failed(
                    'Il risultato di questa domanda non può superare i 5 caratteri!',
                    'Cittadino Pregiudicato',
                    'Perfavore, inserisci `true` se il cittadino è stato arrestato almeno una volta, inserisci `false` se non è mai stato arrestato'
                  );
                else {
                  prejudiced = m.content;
                  await waitingEmbed('Cittadino Ricercato', 'Perfavore, inserisci `true` se il cittadino è ricercato, inserisci `false` se non è ricercato');
                }
        
                break;
              }

            case !wanted: {
                if (m.content.length > 5)
                    return await failed(
                    'La risposta di questa domanda non può superare i 5 caratteri!',
                    'Cittadino Ricercato',
                    'Perfavore, inserisci `true` se il cittadino è attualmente ricercato, inserisci `false` se non è attualmente ricercato'
                );
                else {
                    wanted = m.content;
                }

                const data = new Schema({
                  UserID: userMention.id,
                  UserName: userName,
                  UserSurname: userSurname,
                  UserYears: userYears,
                  UserCitizenship: userCitizenship,
                  UserHair: userHair,
                  UserEyes: userEyes,
                  UserSigns: userSigns,
                  UserHeight: userHeight,
                  UserWeight: userWeight,
                  UserStatus: userStatus,
                  UserIDPS4: userIDPS4,
                  WeaponsLicense: weaponsLicense,
                  Level: level,
                  Weapons: weapons,
                  DrivingLicense: drivingLicense,
                  Type: type,
                  Vehicles: vehicles,
                  Property: property,
                  Job: job,
                  Hobby: hobby,
                  Fines: fines,
                  Complaints: complaints,
                  Prejudiced: prejudiced,
                  Wanted: wanted
                })
                await data.save()
                message.channel.send("**Il cittadino è stato salvato con successo in un file del database!**")
                collector.stop()
              }
            }
          });

          collector.on('end', (collected, reason) => {
            if (reason == 'time') {
               message.reply({ content: "**Hai impiegato troppo tempo a rispondere a questa domanda, di conseguenza il processo di aggiunzione di un utente al database è stato annullato. Riprova di nuovo!**" })
            }
          })
    },
};