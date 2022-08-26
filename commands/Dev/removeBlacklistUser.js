const blacklist = require('../../models/blacklistUser')
const { Message } = require('discord.js')

module.exports = {
    name : 'remove-blacklist-user',

    run : async(bot, message, args) => {
        if(message.author.id !== '844691950799028235') return;

        const User = await bot.users.fetch(args[0])
        if(!args[0]) return message.reply({ content: "Perfavore, specifica un utente da rimuovere dalla blacklist!" })
        if(!User) return message.reply({ content: "Utente non valido!" })

        await blacklist.findOne({ User: User.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
               data.delete()
                .catch(err => console.log(err))
                message.channel.send({ content: `**\`${User.tag}\` è stato rimosso con successo dalla blacklist!**` })
            } else {
               message.reply({ content: `L'utente selezionato non è stato blacklistato!` })
            }
           
        })
    }
}