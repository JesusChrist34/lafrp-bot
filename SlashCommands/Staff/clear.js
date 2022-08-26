const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'clear',
    description: 'Elimina una quantità precisa di messaggi di un canale o di un\'utente',
    UserPermissions: ['MANAGE_MESSAGES'],
    BotPerms: ['MANAGE_MESSAGES'],
    timeout: 5000,
    premium: false,
    options: [
      {
        name: 'messaggi',
        description: 'Quantità di messaggi da voler eliminare',
        type: 'NUMBER',
        required: true,
      },
      {
        name: 'utente',
        description: 'Utente a cui eliminare la quantità scelta di messaggi',
        type: 'USER',
        required: false,
      },
    ],

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (bot, interaction, args) => {

      const amount = interaction.options.getNumber('messaggi')
      const user = interaction.options.getUser('utente')

      if(amount > 100) return interaction.reply({ content: "Puoi eliminare un massimo di 100 messaggi per volta!", ephemeral: true })

      const messages = await interaction.channel.messages.fetch()

        if(user) {
          let i = 0;
          const filtered = [];
          (await messages).filter((m) => {
            if(m.author.id === user.id && amount > i) {
              filtered.push(m);
              i++;
            }
          })
            await interaction.channel.bulkDelete(filtered, true).then(messages => {
        const userclear = new Discord.MessageEmbed()
        .setTitle("**__Messaggi Eliminati__**")
        .setDescription(`**${interaction.user.toString()} ha cancellato \`${messages.size}\` messaggi di ${user} con successo!**`)
        .setColor("GREEN")
        interaction.reply({ embeds: [userclear] })
        })
        } else {

        await interaction.channel.bulkDelete(amount, true).then(messages => {
        const clear = new Discord.MessageEmbed()
        .setTitle("**__Messaggi Eliminati__**")
        .setDescription(`**${interaction.user.toString()} ha cancellato \`${messages.size}\` messaggi di questo canale con successo!**`)
        .setColor("GREEN")
        interaction.reply({ embeds: [clear] })
        })
      }
    },
};