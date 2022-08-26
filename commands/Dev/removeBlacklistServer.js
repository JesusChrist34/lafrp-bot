const blacklist = require('../../models/blacklistServer')
const { Message } = require('discord.js')

module.exports = {
    name : 'remove-blacklist-server',

    run : async(bot, message, args) => {
        if(message.author.id !== '844691950799028235') return;

        const guild = args[0]
        if(!args[0]) return message.reply({ content: "Perfavore, specifica un server da rimuovere dalla blacklist!" })
        if(!guild) return message.reply({ content: "Server non valido!" })

        await blacklist.findOne({ Guild: guild }, async(err, data) => {
            if(err) throw err;
            if(data) {
               data.delete()
                .catch(err => console.log(err))
                message.channel.send({ content: `**Questo server è stato rimosso con successo dalla blacklist!**` })
            } else {
               message.reply({ content: `Il server selezionato non è stato blacklistato!` })
            }
           
        })
    }
}