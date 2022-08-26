const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js")

module.exports = {
    name: "channel-info",
    description: "Mostra le info di un canale",
    options: [
      {
        name: "canale",
        description: "Canale da cui prendere le informazioni",
        type: "CHANNEL",
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

        var canale = interaction.options.getChannel('canale')

      switch (canale.type) {
          case "GUILD_TEXT": canale.type = "Testo"; break;
          case "GUILD_VOICE": canale.type = "Vocale"; break;
          case "GUILD_NEWS": canale.type = "Annunci"; break;
          case "GUILD_CATEGORY": canale.type = "Categoria"; break;
      }

      if (canale.type == "Vocale") {
          var embed = new Discord.MessageEmbed()
              .setTitle(canale.name)
              .setDescription("**Tutte le info di questo canale**")
              .addField("**ID Canale:**", `\`${canale.id}\``, true)
              .addField("**Tipo:**", `\`Vocale\``, true)
              .addField("**Posizione:**", `\`${canale.rawPosition}\``, true)
              .addField("**Categoria:**", `\`${canale.parent.name}\``, true)
              .addField("**Bitrate:**", `\`${canale.bitrate}\``, true)
              .addField("**Limite Utenti:**", `\`${canale.userLimit == 0 ? "∞" : canale.userLimit}\``, true)
          interaction.reply({ embeds: [embed], ephemeral: false })
          return
      }

      if (canale.type == "Categoria") {
          var embed = new Discord.MessageEmbed()
              .setTitle(canale.name)
              .setDescription("**Tutte le info di questo canale**")
              .addField("**ID Categoria:**", `\`${canale.id}\``, true)
              .addField("**Tipo:**", `\`Categoria\``, true)
              .addField("**Posizione:**", `\`${canale.rawPosition}\``, true)
              .addField("**Categoria Creata:**", `\`${canale.createdTimestamp.toDateString()}\``, true)
              interaction.reply({ embeds: [embed], ephemeral: false })
          return
      }

      var lastMessage = canale.messages.fetch(canale.lastMessageID)
          .then(lastMessage => {
              var embed = new Discord.MessageEmbed()
                  .setTitle(canale.name)
                  .setDescription("**Tutte le info di questo canale**")
                  .addField("**ID Canale:**", `\`${canale.id}\``, true)
                  .addField("**Tipo:**", `\`Testo\``, true)
                  .addField("**Posizione:**", `\`${canale.rawPosition}\``, true)
                  .addField("**Categoria:**", `\`${canale.parent.name}\``, true)
                  .addField("**Descrizione:**", `\`${!canale.topic ? "Nessuna Descrizione" : canale.topic}\``, true)
                  .addField("**NSFW:**", `\`${canale.nsfw ? "Si" : "No"}\``, true)
                  .addField("**Ultimo Messaggio:**", `\`${lastMessage.author.username + "#" + lastMessage.author.discriminator + " - " + lastMessage.content}\``, true)
                  .addField("**Canale Creato:**", `\`${canale.createdAt.toDateString()}\``, true)
                interaction.reply({ embeds: [embed], ephemeral: false })
            return
          })
          .catch(() => {
              var embed = new Discord.MessageEmbed()
                  .setTitle(canale.name)
                  .setDescription("**Tutte le info di questo canale**")
                  .addField("**ID Canale:**", `\`${canale.id}\``, true)
                  .addField("**Tipo:**", `\`Testo\``, true)
                  .addField("**Posizione:**", `\`${canale.rawPosition}\``, true)
                  .addField("**Categoria:**", `\`${canale.parent.name}\``, true)
                  .addField("**Descrizione:**", `\`${!canale.topic ? "Nessuna Descrizione" : canale.topic}\``, true)
                  .addField("**NSFW:**", `\`${canale.nsfw ? "Si" : "No"}\``, true)
                  .addField("**Ultimo Messaggio:**", "Non Trovato", true)
                  .addField("**Canale Creato:**", `\`${canale.createdAt.toDateString()}\``, true)
                interaction.reply({ embeds: [embed], ephemeral: false })
              return
          });
  }
};