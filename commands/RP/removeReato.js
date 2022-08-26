const Discord = require('discord.js')
const Schema = require("../../models/reati")

module.exports = {
    name: 'remove-reato',
    description: 'Rimuovi un reato ad un utente',
    premium: false,
    timeout: 5000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {

      if(!message.member.roles.cache.has("959179328921415680")) return;
        
      const reatoID = args.slice(0).join(" ")
        
      const data = await Schema.findById(reatoID)

        if(message.guild.id !== data.Guild) return message.reply({ content: "Pensavi di poterlo fare eh?" })

        if(!data) return message.reply({ content: `Questo ID non è valido!` })

        await data.delete()

        const user = await bot.users.fetch(data.User)
        message.channel.send({content: `**Ho rimosso con successo il reato a ${user} ( \`${user.id}\` )!**` })
    },
};