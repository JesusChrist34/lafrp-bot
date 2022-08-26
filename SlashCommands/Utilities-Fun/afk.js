const { Client, CommandInteraction } = require("discord.js");
const Discord = require("discord.js")
const Schema = require("../../models/afk")
var uptime = Math.round(new Date().getTime() / 1000)

module.exports = {
    name: "afk",
    description: "Vai AFK all'interno del server",
    timeout: 10000,
    options: [
      {
        name: "motivo",
        description: "Motivo per la quale vai AFK",
        type: "STRING",
        required: false,
      }
    ],
    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (bot, interaction, args) => {

        const reason = interaction.options.getString('motivo') || "Nessun Motivo!";
        const user = interaction.user;
        let member = interaction.guild.members.cache.get(user.id);
        const oldNickname = member.nickname || user.username;
        const owner = await interaction.guild.fetchOwner()

        await Schema.findOne({
          Guild: interaction.guild.id,
          User: interaction.user.id
      }, async (err, data) => {
          if (err) throw err;
          if (!data) {
              data = new Schema({
                  Guild: interaction.guild.id,
                  User: interaction.user.id,
                  Reason: reason,
                  Time: uptime,
                  Nickname: oldNickname || user.username,
              }).save();
          }

        interaction.reply({ content: `**Da questo momento in poi sarai afk all'interno di questo server finchè non scriverai un messaggio.\n__Motivo:__ \`${reason || "Nessun Motivo"}\`**`, ephemeral: true })

        if(user.id !== owner.id) {
          await member.setNickname(`AFK | ${user.username}`);
        }
        })
    }
};