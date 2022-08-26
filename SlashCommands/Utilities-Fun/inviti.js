const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "inviti",
    description: "Mostra gli inviti di un utente",
    options: [
      {
        name: "utente",
        description: "Utente da cui prendere gli inviti",
        type: "USER",
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

    let utente = interaction.options.getMember('utente')
    
    let invites = await interaction.guild.invites.fetch();
    let userInv = invites.filter(u => u.inviter && u.inviter.id === utente.id)

    if(userInv.size <= 0) {
        return interaction.reply({ content: `**L'utente selezionato non ha invitato nessuno fino ad ora!**`, ephemeral: true })
    }

    let invCodes = userInv.map(x => x.code).join('\n')
    let i = 0;
    userInv.forEach(inv => i += inv.uses)

    const embed = new Discord.MessageEmbed()
    .setTitle(`**Inviti di ${utente.user.tag}**`)
    .addField('**Utenti Invitati**', `\`${i}\``, true)
    .addField('**Codici Inviti**', `\`${invCodes}\``, true)
    .setColor('RANDOM')
    .setTimestamp()
    interaction.reply({ embeds: [embed], ephemeral: false })
 }
}