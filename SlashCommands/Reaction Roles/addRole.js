const { Client, CommandInteraction } = require('discord.js');
const Schema = require("../../models/reactionRoles")
const Discord = require('discord.js')

module.exports = {
    name: 'rr-add-role',
    description: 'Aggiungi un ruolo al pannello dei reaction roles',
    UserPermissions: ['ADMINISTRATOR'],
    timeout: 10000,
    premium: true,
    options: [
      {
        name: 'ruolo',
        description: 'Ruolo da aggiungere',
        type: 'ROLE',
        required: true,
      },
      {
        name: 'descrizione',
        description: 'Descrizione del ruolo',
        type: 'STRING',
        required: false,
      },
      {
        name: 'emoji',
        description: 'Emoji da assegnare al ruolo',
        type: 'STRING',
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
        
        const role = interaction.options.getRole('ruolo')
        const roleDescription = interaction.options.getString('descrizione') || null
        const roleEmoji = interaction.options.getString('emoji') || null

        if(role.position >= interaction.guild.me.roles.highest.position) return interaction.reply({ content: "Non posso assegnare un ruolo di grado più alto, o uguale a me, al pannello dei reaction roles!", ephemeral: true })

        const guildData = await Schema.findOne({ Guild: interaction.guild.id })

        const newRole = {
            roleID: role.id,
            roleDescription,
            roleEmoji,
        }

        if(guildData) {
            const roleData = guildData.Roles.find((x) => x.roleID === role.id)

            if(roleData) {
                roleData = newRole
            } else {
                guildData.Roles = [...guildData.Roles, newRole]
            }

            await guildData.save()
        } else {
            await Schema.create({
                Guild: interaction.guild.id,
                Roles: newRole
            })
        }

        interaction.reply({ content: "**Ho aggiunto con successo questo ruolo al pannello dei reaction roles!**" })
    },
};