const bot = require("../index")
const Discord = require("discord.js")
const { MessageEmbed, Collection } = require("discord.js")
const Timeout = new Collection()
const ms = require("ms")
const CmdsSchema = require("../models/command")
const BlacklistUserSchema = require("../models/blacklistUser")
const BlacklistServerSchema = require("../models/blacklistServer")
const PremiumSchema = require("../models/premium")
const Schema5 = require("../models/manutention")

bot.on("interactionCreate", async (interaction) => {
    // Slash Command Handling
    if (interaction.isCommand()) {
        const cmd = bot.slashCommands.get(interaction.commandName);
        if (!cmd)
            return interaction.reply({ content: "Si è verificato un errore. Si prega di riprovare più tardi!", ephemeral: true });

        const args = [];

        for (let option of interaction.options.data) {
            if (option.type === "SUB_COMMAND") {
                if (option.name) args.push(option.name);
                option.options.forEach((x) => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }

        if(cmd) {

        if (interaction.channel.type == "dm") {
        var embed = new Discord.MessageEmbed()
        .setTitle("**__DM non abilitati__**")
        .setColor("#F15A24")
        .setDescription("**I comandi nei messaggi privati non sono abilitati.**")
        .setTimestamp()

        interaction.reply({ embeds: [embed] })
}
          
        // Manutention Mode
        const data5 = await Schema5.findOne({ Author: "844691950799028235" })
        if(data5.Status === "enable" && interaction.guild.id !== "799043349461336135") return interaction.reply({ content: `**Il bot è attualmente in fase di manutenzione. Ti consigliamo di entrare nel server di supporto ( https://discord.gg/KJ9DE7rWQx ) per poter essere a conoscenza del motivo e della fine di questa manutenzione!**`, ephemeral: true })

        // User Perms
        if(!interaction.member.permissions.has(cmd.UserPermissions || [])) return interaction.reply({ content: `Non hai i permessi necessari per eseguire questo comando!\nPermessi Necessari: \`${cmd.UserPermissions || []}\``, ephemeral: true })

        // Bot Perms
        if (!interaction.guild.me.permissions.has(cmd.BotPerms || [])) return interaction.reply({ content: `Non ho i permessi necessari per eseguire questo comando!\nPermessi Necessari: \`${cmd.BotPerms || []}\``, ephemeral: true });

        const check1 = await CmdsSchema.findOne({ Guild: interaction.guild.id })
        if(check1) {
            if(check1.Cmds.includes(cmd.name)) return interaction.reply({ content: "**Questo comando è stato disabilitato all'interno del server!**", ephemeral: true })
          }

        const blacklistedUser = await BlacklistUserSchema.findOne({ 
        User: interaction.user.id,
        });
            if(blacklistedUser) 
            return interaction.reply({ content: "**Sei stato blacklistato dai developer del bot, non potrai eseguire nessun tipo di comando!**", ephemeral: true });

            const blacklistedServer = await BlacklistServerSchema.findOne({ 
        Guild: interaction.guild.id,
        });
            if(blacklistedServer) 
            return interaction.reply({ content: "**Questo server è stato blacklistato dai developer del bot, non potrete eseguire nessun tipo di comando!**", ephemeral: true });

        if(cmd.premium) {
            const data = await PremiumSchema.findOne({ Guild: interaction.guild.id })
          if(!data) return interaction.reply({ content: '**Questo comando possono eseguirlo solo i server premium!**', ephemeral: true });
          if(!data.Permanent && Date.now() > data.Expire) {
              data.delete()
              return interaction.reply({ content: "**L'abbonamento premium è scaduto. Per poter riutilizzare i comandi premium andrà rinnovato l'abbonamento!**", ephemeral: true })
        }
      }
        if(cmd.timeout) {
            if(Timeout.has(`${cmd.name}${interaction.user.id}`)) return interaction.reply({ content: `**Devi attendere \`${ms(Timeout.get(`${cmd.name}${interaction.user.id}`) - Date.now(), {long : true})}\` per poter eseguire nuovamente il comando!**`, ephemeral: true })
            cmd.run(bot, interaction, args)

            Timeout.set(`${cmd.name}${interaction.user.id}`, Date.now() + cmd.timeout)
            setTimeout(() => {
                Timeout.delete(`${cmd.name}${interaction.user.id}`)
            }, cmd.timeout)
        } else cmd.run(bot, interaction, args)
      }
    }

    // Context Menu Handling
    if (interaction.isContextMenu()) {
        await interaction.deferReply({ content: "Invio del comando...", ephemeral: false }).catch(() => {});
        const command = bot.slashCommands.get(interaction.commandName);
        if (command) command.run(bot, interaction);
    }

    // Reaction Roles Handling
    if(interaction.isSelectMenu()) {
        if(interaction.customId !== "RR") return;
        await interaction.deferReply({ ephemeral: true })
        const roleID = interaction.values[0]
        const role = interaction.guild.roles.cache.get(roleID)
        const memberRoles = interaction.member.roles

        const hasRole = memberRoles.cache.has(roleID)

        if(hasRole) {
            memberRoles.remove(roleID)
            interaction.followUp({ content: `**Ti ho rimosso con successo il ruolo <@&${role.id}>**` })
        } else {
            memberRoles.add(roleID)
            interaction.followUp({ content: `**Ti ho aggiunto con successo il ruolo <@&${role.id}>**` })
        }
    }
});