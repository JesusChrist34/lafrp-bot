const Schema = require("../../models/command")
const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "disable-command",
    description: "Disabilita un comando all'interno del server",
    UserPermissions: ["ADMINISTRATOR"],
    options: [
      {
        name: "comando",
        description: "Comando da voler disabilitare",
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

        if(!!bot.commands.get(cmd) === false) return interaction.reply({ content: 'Questo comando non esiste!', ephemeral: true });

        await Schema.findOne({ Guild: interaction.guild.id }, async(err, data) => {
            if(err) throw err;
            if(data) {
                if(data.Cmds.includes(cmd)) return interaction.reply({ content: 'Questo comando è stato già disabilitato!', ephemeral: true });
                data.Cmds.push(cmd)
            } else {
                data = new Schema({
                    Guild: interaction.guild.id,
                    Cmds: cmd
                })
            }
            await data.save();
            interaction.reply({ content: `**Il comando \`${cmd}\` è stato disabilitato con successo!**`, ephemeral: false })
        })
    }
}