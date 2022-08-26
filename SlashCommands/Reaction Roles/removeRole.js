const { Client, CommandInteraction } = require('discord.js');
const Schema = require("../../models/reactionRoles")
const Discord = require('discord.js')

module.exports = {
    name: 'rr-remove-role',
    description: 'Rimuovi un ruolo dal pannello dei reaction roles',
    UserPermissions: ['ADMINISTRATOR'],
    timeout: 10000,
    premium: true,
    options: [
      {
        name: 'ruolo',
        description: 'Ruolo da rimuovere',
        type: 'ROLE',
        required: true,
      },
    ],

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (bot, interaction, args) => {
        
        const role = interaction.options.getRole('ruolo')

        const guildData = await Schema.findOne({ Guild: interaction.guild.id })

        if(!guildData) return interaction.reply({ content: "Non è presente nessun ruolo da rimuovere dal pannello di reaction roles di questo server!", ephemeral: true })

        const guildRoles = guildData.Roles

        const findRole = guildRoles.find(x => x.roleID === role.id)
        if(!findRole) return interaction.reply({ content: "Questo ruolo non è presente nel pannello dei reaction roles di questo server!", ephemeral: true })

        const filteredRoles = guildRoles.filter(x => x.roleID !== role.id)
        guildData.Roles = filteredRoles

        await guildData.save()

        interaction.reply({ content: "**Ho rimosso con successo questo ruolo dal pannello dei reaction roles!**" })
    },
};