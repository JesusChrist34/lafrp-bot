const { Client, CommandInteraction, MessageActionRow, MessageSelectMenu } = require('discord.js');
const Schema = require("../../models/reactionRoles")
const Discord = require('discord.js')

module.exports = {
    name: 'rr-panel-send',
    description: 'Invia il pannello dei reaction roles',
    UserPermissions: ['ADMINISTRATOR'],
    timeout: 10000,
    premium: true,

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (bot, interaction, args) => {

        const guildData = await Schema.findOne({ Guild: interaction.guild.id })

        if(!guildData?.Roles) return interaction.reply({ content: "Il sistema di reaction roles non è stato configurato correttamente all'interno di questo server!", ephemeral: true })

        const options = guildData.Roles.map((x) => {
            const role = interaction.guild.roles.cache.get(x.roleID)

            return {
                label: role.name,
                value: role.id,
                description: x.roleDescription || "Nessuna descrizione!",
                emoji: x.roleEmoji
            }
        })

        const embed = new Discord.MessageEmbed()
        .setTitle("**__Pannello Reaction Roles__**")
        .setDescription("**Perfavore, scegli un ruolo tra quelli esposti sotto da volerti auto-aggiungere o auto-rimuoverti!**")
        .setColor("AQUA")

        const components = [
            new MessageActionRow().addComponents(
                new MessageSelectMenu()
                    .setCustomId("RR")
                    .setMaxValues(1)
                    .addOptions(options)
            )
        ]

        interaction.reply({ content: "**Ho inviato con successo il pannello dei reaction roles!**", ephemeral: true })
        interaction.channel.send({ embeds: [embed], components: components })
    },
};