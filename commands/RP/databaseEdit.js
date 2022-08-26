const Discord = require('discord.js')
const Schema = require("../../models/database")

const utilizzo = new Discord.MessageEmbed()
.setTitle("**__Opzioni Edit File__**")
.setDescription(`**
Ecco tutte le opzioni di edit possibili del database, per modificare una qualsiasi categoria andrà inserito il numero corrispondente all'opzione scelta e la modifica in sè.

__Esempio:__
\`!database-edit @utente 2 54\`

__Opzioni:__
\`1\` = Nome
\`2\` = Anni
\`3\` = Colore Capelli
\`4\` = Colore Occhi
\`5\` = Segni Particolari
\`6\` = Altezza
\`7\` = Peso
\`8\` = Stato Sentimentale
\`9\` = ID PS4
\`10\` = Possesso Porto D'armi
\`11\` = Livello Porto D'armi
\`12\` = Lista Armi Possedute
\`13\` = Possesso Patente
\`14\` = Tipologia Patente
\`15\` = Lista Veicoli Posseduti
\`16\` = Lista Proprietà Possedute
\`17\` = Lista Lavori
\`18\` = Lista Hobby
\`19\` = Numero Multe
\`20\` = Numero Denunce
\`21\` = Pregiudicato?
\`22\` = Ricercato?

In caso devi modificare una lista, come le armi possedute, andranno riscritte anche quelle che già aveva in precedenza ( sempre se le ha ancora ) e dopo di chè scrivere quelle nuove, idem per le altre liste!
**`)
.setTimestamp()
.setColor("GREEN")

module.exports = {
    name: "database-edit",

    async run(bot, message, args) {

        if(!message.member.roles.cache.has("959179328921415680")) return;

        const userMention = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!userMention) return message.reply("Perfavore, specifica un utente a cui voler modificare il file del database!")

        const data = await Schema.findOne({ UserID: userMention.id })
        if(!data) return message.reply("Questo utente non è stato registrato all'interno di nessun file del database!")

        const query = await args[1]
        if(!query) return message.reply({ embeds: [utilizzo] })
        if(isNaN(args[1])) return message.reply({ embeds: [utilizzo] })
        if(query !== "1" && query !== "2" && query !== "3" && query !== "4" && query !== "5" && query !== "6" && query !== "7" && query !== "8" && query !== "9" && query !== "10" && query !== "11" && query !== "12" && query !== "13" && query !== "14" && query !== "15" && query !== "16" && query !== "17" && query !== "18" && query !== "19" && query !== "19" && query !== "20" && query !== "21" && query !== "22") return message.reply({ embeds: [utilizzo] })

        if(query == "1") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, specifica un nuovo nome da modificare a quello attuale!")

            data.UserName = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo il nome di ${userMention}!**`)
        } else if(query == "2") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, specifica una nuova età da modificare a quello attuale!")

            data.UserYears = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo l'età di ${userMention}!**`)
        } else if(query == "3") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, specifica un nuovo colore di capelli da modificare a quello attuale!")

            data.UserHair = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo il colore di capelli di ${userMention}!**`)
        } else if(query == "4") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, specifica un nuovo colore degli occhi da modificare a quello attuale!")

            data.UserEyes = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo il colore degli occhi di ${userMention}!**`)
        } else if(query == "5") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, specifica tutti i segni particolari dell'utente!")

            data.UserSigns = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo i segni particolari di ${userMention}!**`)
        } else if(query == "6") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, specifica la nuova altezza in centrimetri ( esempio: `180` = 1,80 metri ) dell'utente!")

            data.UserHeight = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo l'altezza di ${userMention}!**`)
        } else if(query == "7") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, specifica il nuovo peso in kilogrammi ( kg ) dell'utente!")

            data.UserWeight = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo il peso di ${userMention}!**`)
        } else if(query == "8") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, specifica il nuovo stato sentimentale ( single / fidanzato / sposato ) dell'utente!")

            data.UserStatus = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo lo stato sentimentale di ${userMention}!**`)
        } else if(query == "9") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, specifica il nuovo ID PS4 dell'utente!")

            data.UserIDPS4 = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo l'ID PS4 di ${userMention}!**`)
        } else if(query == "10") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, inserisci `true` se il cittadino possiede il porto d\'armi di qualsiasi livello, inserisci `false` se non nè possiede nemmeno uno")

            data.WeaponsLicense = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo lo status del porto d'armi di ${userMention}!**`)
        } else if(query == "11") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, specifica tutti i livelli dei porto d'armi dell'utente che possiede!")

            data.Level = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo i livelli dei porto d'armi di ${userMention}!**`)
        } else if(query == "12") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, specifica tutte le armi dell'utente che possiede!")

            data.Weapons = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo la lista armi di ${userMention}!**`)
        } else if(query == "13") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, inserisci `true` se il cittadino possiede la patente di qualsiasi tipo, inserisci `false` se non nè possiede nemmeno uno")

            data.DrivingLicense = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo lo status della patente di ${userMention}!**`)
        } else if(query == "14") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, specifica tutte le patenti dell'utente che possiede!")

            data.Type = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo la lista delle patenti di ${userMention}!**`)
        } else if(query == "15") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, specifica tutti i veicoli dell'utente che possiede!")

            data.Vehicles = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo tutti i veicoli posseduti di ${userMention}!**`)
        } else if(query == "16") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, specifica tutte le proprietà dell'utente che possiede!")

            data.Property = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo la lista delle proprietà di ${userMention}!**`)
        } else if(query == "17") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, specifica tutti i lavori dell'utente che svolge!")

            data.Job = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo la lista lavori di ${userMention}!**`)
        } else if(query == "18") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, specifica tutti gli hobby dell'utente che svolge!")

            data.Hobby = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo la lista hobby di ${userMention}!**`)
        } else if(query == "19") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, specifica il numero di multe che l'utente ha preso!")

            data.Fines = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo il numero di multe di ${userMention}!**`)
        } else if(query == "20") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, specifica il numero di multe che l'utente ha preso!")

            data.Complaints = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo il numero di denunce di ${userMention}!**`)
        } else if(query == "21") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, inserisci `true` se il cittadino è stato almeno una volta arrestato, inserisci `false` se non è mai stato arrestato")

            data.Prejudiced = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo lo status del pregiudicato di ${userMention}!**`)
        } else if(query == "22") {
            const edit = await args.slice(2).join(" ");
            if(!edit) return message.reply("Perfavore, inserisci `true` se il cittadino è attualmente ricercato, inserisci `false` se non è ricercato")

            data.Wanted = edit
            await data.save()
            message.channel.send(`**Ho modificato con successo lo status del ricercato di ${userMention}!**`)
        }
    },
};