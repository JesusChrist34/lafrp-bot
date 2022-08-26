const Discord = require('discord.js')

module.exports = {
    name: "risposta-bug",

    async run(bot, message, args) {
    try{

      if(!message.member.guild.roles.cache.has("877989029566619718")) return;

      const canale = message.guild.channels.cache.get("877989549840687194");
        
      const user = await bot.users.fetch(args[0])
      if(!args[0]) return message.reply({ content: "Perfavore, inserisci l'id id un utente valido per potergli mandare una risposta al bug inviatoci!" })
      if(!utente) return message.reply({ conten: "Questo utente non esiste. Specifica un utente valido!" })
      
      const msg = args.slice(1).join(" ");
      if(!msg) return message.reply({ content: "Perfavore, inserisci un messaggio come risposta bug!" })

        const embed = new Discord.MessageEmbed()
        .setTitle("**__Risposta Bug__**")
        .setDescription(`${msg}\n\n**\`- ${message.author.tag} | Developer\`**`)
        .setColor("GREEN")
        .setFooter("Messaggio da parte del team developer Los Angeles Full RP Bot")
        user.send({ embeds: [embed] })

        message.channel.send({ content: `**${message.author} risposta bug inviata con successo all'utente!**` })
        canale.send({ content: `**E' appena stata inviata una risposta bug ad un utente!\n\n\`Autore:\` ${message.author}\n\`Utente:\` ${user} ( \`${user.id}\` )\n\`Messaggio:\`** \`\`\`${msg}\`\`\`` })
      } catch (e) {
        if (
          String(e).includes(
            "DiscordAPIError: Cannot send messages to this user"
          )
        ) {
          return message.reply({ content: "L'utente selezionato ha i dm chiusi. Per cui è impossibile inviargli una risposta!" });
        }
       }
    }
}