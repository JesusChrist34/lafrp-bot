const schema = require("../../models/premium");
const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'remove-premium',
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
 
    run: async(bot, message, args) => {
        if(message.author.id !== '844691950799028235') return;

        if(!args[0]) return message.reply('Perfavore, specifica un ID valido di un server!');

        await schema.findOne({ Guild: args[0] }, async(err, data) => {
            if(!data)
               return message.reply({ content: "Il server che hai provvisto non ha attualmente un abbonamento premium attivo, per cui non è possibile rimuoverlo dal database." });
            data.delete();
            return message.reply({ content: "**Il server è stato rimosso con successo dal database e da questo momento in poi non avrà più un abbonamento premium attivo.**" });
            }
        );
    },
};