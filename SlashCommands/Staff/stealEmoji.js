const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')
const { parse } = require("twemoji-parser");
const { Util } = require("discord.js")

module.exports = {
    name: 'steal-emoji',
    description: 'Aggiungi un\'emoji proveniente da un altro server',
    UserPermissions: ['MANAGE_EMOJIS_AND_STICKERS'],
    BotPerms: ['MANAGE_EMOJIS_AND_STICKERS'],
    timeout: 10000,
    premium: false,
    options: [
      {
        name: 'emoji',
        description: 'Emoji da voler aggiungere',
        type: 'STRING',
        required: true,
      },
      {
        name: 'nome',
        description: 'Nome da voler mettere all\'emoji',
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
        
      const emoji = interaction.options.getString('emoji')
      const name = interaction.options.getString('nome')

      try {
        if (emoji.startsWith("https://cdn.discordapp.com")) {
          await interaction.guild.emojis.create(emoji, name || "give_name");
  
          const embed = new Discord.MessageEmbed()
            .setTitle(`**__Emoji Aggiunta!__**`)
            .setThumbnail(`${emoji}`)
            .setColor('#FF69B4')
            .setDescription(
              `**Emoji aggiunta con successo!** | Nome: ${
                name || "give_name"
              } `
            );
          return interaction.reply({ embeds: [embed] });
        }
  
        const customEmoji = Util.parseEmoji(emoji);
  
        if (customEmoji.id) {
          const link = `https://cdn.discordapp.com/emojis/${customEmoji.id}.${
            customEmoji.animated ? "gif" : "png"
          }` ;
  
          await interaction.guild.emojis.create(
            `${link}`,
            `${name || `${customEmoji.name}`}`
          );
         
          const embed = new Discord.MessageEmbed()
            .setTitle(`**__Emoji Aggiunta__** <:${customEmoji.name}:${customEmoji.id}>`)
            .setColor('#FF69B4')
            .setThumbnail(`${link}`)
            .setDescription(
              `**Quest'emoji è stata aggiunta con successo!** \n\`Nome:\` **${
                name || `${customEmoji.name}`
              }** \n\`Anteprima:\` [Cliccami](${link})`
            );
          return interaction.reply({ embeds: [embed] });
        } else {
          const foundEmoji = parse(emoji, { assetType: "png" });
          if (!foundEmoji[0]) {
            return interaction.reply({ content: "Perfavore, specifica un emoji valida!", ephemeral: true });
          }
          interaction.reply({ content: "Non è possibile aggiungere le emoji standard!", ephemeral: true })
        }
      } catch (e) {
        if (
          String(e).includes(
            "DiscordAPIError: Maximum number of emojis reached"
          )
        ) {
          return interaction.reply({ content: "Il massimo di emoji per questo server è stato raggiunto. Non è più possibile aggiungere delle emoji!", ephemeral: true })
        }
      }
    },
};