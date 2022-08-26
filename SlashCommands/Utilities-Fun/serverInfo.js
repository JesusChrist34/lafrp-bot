const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "server-info",
    description: "Mostra le informazioni sul server",
    type: "CHAT_INPUT",
    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

        function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " giorno" : " giorni") + " fa";
        };

        var server = interaction.member.guild;
        let owner = await interaction.guild.fetchOwner()

        var botCount = server.members.cache.filter(member => member.user.bot).size;
        var utentiCount = server.memberCount - botCount;

        var categoryCount = server.channels.cache.filter(c => c.type == "GUILD_CATEGORY").size
        var textCount = server.channels.cache.filter(c => c.type == "GUILD_TEXT").size
        var voiceCount = server.channels.cache.filter(c => c.type == "GUILD_VOICE").size

        var embed = new Discord.MessageEmbed()
            .setTitle(server.name)
            .setDescription("**Tutte le info su questo server**")
            .setThumbnail(server.iconURL())
            .addField("**Owner:**", `<@${owner.id}>`, true)
            .addField("**ID Server:**", `\`${server.id}\``, true)
            .addField("**Livello Verificato**", `\`${server.verificationLevel}\``, true)
            .addField("**Server Creato:**", `\`${server.createdAt.toUTCString().substr(0, 16)}\` ( \`${checkDays(server.createdAt)}\` )`, true)
            .addField(`
**Membri:**`, 
 `*- Totali:* \`${server.memberCount}\`
*- Utenti:* \`${utentiCount}\`
*- Bot:* \`${botCount}\``, false)
            .addField(`
**Canali:**`,
 `*- Categorie:* \`${categoryCount}\`
*- Scritti:* \`${textCount}\`
*- Vocali:* \`${voiceCount}\``, false)
            .addField(`
**Livello Boost:**`,
 `*- Livello:* \`${server.premiumTier}\`
*- Numero Boost:* \`${server.premiumSubscriptionCount}\``, false)
            .setColor("RANDOM")

        interaction.reply({ embeds: [embed], ephemeral: false })
    }
}