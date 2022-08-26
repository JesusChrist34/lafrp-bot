const schema = require("../../models/premium");
const { Client, Message, MessageEmbed } = require('discord.js');
const day = require('dayjs')

module.exports = {
    name: 'add-premium',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
 
    run: async(bot, message, args) => {
        if(message.author.id !== '844691950799028235') return;

        if(!args[0]) return message.reply({ content: 'Perfavore, specifica un ID valido di un server!' });
        if(!bot.guilds.cache.has(args[0])) return message.reply({ content: "Hai provvisto un ID non valido di un server!" });

        await schema.findOne({ Guild: args[0] }, async(err, data) => {
            if(data) {
                data.delete();
            }

            if(args[1]) {
                const Expire = day(args[1]).valueOf();;
                new schema({
                    Guild: args[0],
                    Expire,
                    Permanent: false,
                }).save();
            } else {
                new schema({
                    Guild: args[0],
                    Expire: 0,
                    Permanent: true,
                }).save();
            }
            message.reply({ content: '**Il server è stato aggiunto con successo alla versione premium del bot.**' })
        });
    },
};