const Discord = require('discord.js')
const Schema = require("../../models/database")

module.exports = {
    name: "database",

    async run(bot, message, args) {

      if(!message.member.roles.cache.has("959179328921415680")) return;

        const user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        if(!user) return message.reply("Perfavore, specifica un utente per poter visionare il suo file!")

        const data = await Schema.findOne({ UserID: user.id })
        if(!data) return message.reply("Questo utente non è stato registrato all'interno del database!")

        if(data.WeaponsLicense == true) {
          WeaponsLicense = "In Possesso"
        } else if(data.WeaponsLicense == false) {
          WeaponsLicense = "Non In Possesso"
        }

        if(data.Level == 0) {
          Level = "Non In Possesso"
        } else {
          Level = data.Level
        }

        if(data.DrivingLicense == true) {
          DrivingLicense = "In Possesso"
        } else if(data.DrivingLicense == false) {
          DrivingLicense = "Non In Possesso"
        }

        if(data.Fines == 0) {
          Fines = "Nessuna Multa Presa"
        } else {
          Fines = data.Fines
        }

        if(data.Complaints == 0) {
          Complaints = "Nessuna Denuncia Presa"
        } else {
          Complaints = data.Complaints
        }

        if(data.Prejudiced == true) {
          Prejudiced = "Si"
        } else if(data.Prejudiced == false) {
          Prejudiced = "No"
        }

        if(data.Wanted == true) {
          Wanted = "Si"
        } else if(data.Wanted == false) {
          Wanted = "No"
        }

        const embed = new Discord.MessageEmbed()
        .setTitle("**__Database__**")
        .setDescription(`**Ecco tutte le informazioni del file di ${user} registrate nel database!**`)
        .addField("**Nome & Cognome:**", `\`${data.UserName}\` \`${data.UserSurname}\``, true)
        .addField("**Anni:**", `\`${data.UserYears}\``, true)
        .addField("**Cittadinanza:**", `\`${data.UserCitizenship}\``, true)
        .addField("**Capelli:**", `\`${data.UserHair}\``, true)
        .addField("**Occhi:**", `\`${data.UserEyes}\``, true)
        .addField("**Segni Particolari:**", `\`${data.UserSigns}\``, true)
        .addField("**Altezza:**", `\`${data.UserHeight}\``, true)
        .addField("**Peso:**", `\`${data.UserWeight}\``, true)
        .addField("**Stato Sentimentale:**", `\`${data.UserStatus}\``, true)
        .addField("**ID PS4:**", `\`${data.UserIDPS4}\``, true)
        .addField("**Porto D'armi:**", `\`${WeaponsLicense}\``, true)
        .addField("**Livello Porto D'armi:**", `\`${Level}\``, true)
        .addField("**Armi Possedute:**", `\`${data.Weapons}\``, true)
        .addField("**Patente:**", `\`${DrivingLicense}\``, true)
        .addField("**Tipologia Patente:**", `\`${data.Type}\``, true)
        .addField("**Veicoli Posseduti:**", `\`${data.Vehicles}\``, true)
        .addField("**Proprietà Possedute:**", `\`${data.Property}\``, true)
        .addField("**Lavoro/i:**", `\`${data.Job}\``, true)
        .addField("**Hobby:**", `\`${data.Hobby}\``, true)
        .addField("**Numero Multe:**", `\`${Fines}\``, true)
        .addField("**Numero Denunce:**", `\`${Complaints}\``, true)
        .addField("**Pregiudicato?**", `\`${Prejudiced}\``, true)
        .addField("**Ricercato?**", `\`${Wanted}\``, true)

        message.channel.send({ embeds: [embed] })
    },
};