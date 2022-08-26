const blacklist = require('../../models/blacklistUser')
const { Message } = require('discord.js')

module.exports = {
    name : 'add-blacklist-user',
    /**
     * @param {Message} message
     */
    run : async(bot, message, args) => {
        if(message.author.id !== '844691950799028235') return;

        const User = await bot.users.fetch(args[0])
        if(!args[0]) return message.reply({ content: "Perfavore, specifica un utente da aggiungere alla blacklist!" })
        if(!User) return message.reply({ content: "Utente non valido!" })

        await blacklist.findOne({ User: User.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                message.reply({ content: `\`${User.tag}\` è già stato blacklistato!`})
            } else {
                data = new blacklist({ User: User.id })
                data.save()
                .catch(err => console.log(err))
            message.channel.send({ content: `**\`${User.tag}\` è stato blacklistato con successo!**` })
            }
           
        })
    }
}