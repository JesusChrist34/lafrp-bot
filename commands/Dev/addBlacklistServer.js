const blacklist = require('../../models/blacklistServer')
const { Message } = require('discord.js')

module.exports = {
    name : 'add-blacklist-server',
    /**
     * @param {Message} message
     */
    run : async(bot, message, args) => {
        if(message.author.id !== '844691950799028235') return;

        const guild = args[0]
        if(!args[0]) return message.reply({ content: "Perfavore, specifica un server da aggiungere alla blacklist!" })
        if(!guild) return message.reply({ content: "Server non valido!" })

        await blacklist.findOne({ Guild: guild }, async(err, data) => {
            if(err) throw err;
            if(data) {
                message.reply({ content: `Questo server è già stato blacklistato!`})
            } else {
                data = new blacklist({ Guild: guild })
                data.save()
                .catch(err => console.log(err))
            message.channel.send({ content: `**Questo server è stato blacklistato con successo!**` })
            }
           
        })
    }
}