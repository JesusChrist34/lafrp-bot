const Schema = require('../../models/command')
const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "enable-command",
    description: "Abilita un comando precedentemente abilitato",
    UserPermissions: ["ADMINISTRATOR"],
    options: [
      {
        name: "comando",
        description: "Comando da voler abilitare",
        type: "STRING",
        required: true,
      }
    ],
    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

        const cmd = interaction.options.getString('comando')
 
        if(!!bot.commands.get(cmd) === false) return interaction.reply({ content: 'Questo comando non esiste!', ephemeral: true});

        await Schema.findOne({ Guild: interaction.guild.id }, async(err, data) => {
          if(err) throw err;
          if(data) {
              if(data.Cmds.includes(cmd)) {
                  let commandNumber;

                  for (let i = 0; i < data.Cmds.length; i++) {
                      if(data.Cmds[i] === cmd) data.Cmds.splice(i, 1)
                  }

                  await data.save()
                  interaction.reply({ content: `**Il comando \`${cmd}\` è stato abilitato con successo!**`, ephemeral: false })
              }  else return interaction.reply({ content: 'Questo comando non è stato disabilitato!', ephemeral: true })
          }
        })
    }
}