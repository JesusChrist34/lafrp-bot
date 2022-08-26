const bot = require("../index")
const Discord = require("discord.js")
const Schema = require("../models/ticket")
const { MessageButton, MessageActionRow } = require("discord.js")

bot.on("interactionCreate", async (interaction) => {

    if (!interaction.isButton()) return;

        try{
    
        const data = await Schema.findOne({ ID: interaction.message.id, Guild: interaction.guild.id });
        if(!data) return;
      
          if(interaction.user.bot) return console.log("hey, un bot ci ha provato")
    
        if (interaction.customId == "Ticket") {

var reached = false;

if (reached === true && counter !== 0) {
  data.Number -= 1;
  data.save()
} else {
  data.Number += 1;
  data.save()
}

if (data.Number === 9999) {
  reached = true;
} else if (data.Number === 0) {
  reached = false;
}

var counterName;

if (data.Number <= 10) {
  counterName = `000${data.Number}`
} else if (data.Number <= 100) {
  counterName = `00${data.Number}`
} else if (data.Number <= 1000) {
  counterName = `0${data.Number}`
} else {
  counterName = `${data.Number}`
}
    
            var server = interaction.message.guild;
                if (server.channels.cache.find(canale => canale.topic == `ID Utente: ${interaction.user.id}, ID Pannello: ${interaction.message.id}`)) {
                    interaction.reply({ content: `Hai già aperto un ticket!`, ephemeral: true }).catch(() => { })
                    return;
                }

                server.channels.create(`ticket-${counterName}`, {
                    type: "GUILD_TEXT",
                    reason: "Ticket Aperto"
                }).then(canale => {
                    canale.setTopic(`ID Utente: ${interaction.user.id}, ID Pannello: ${interaction.message.id}`);
                    canale.setParent(data.Category)
                    canale.permissionOverwrites.set([
                        {
                            id: server.id,
                            deny: ['VIEW_CHANNEL'],
                        },
                        {
                            id: interaction.user.id,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                        },
                        {
                            id: data.Role,
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                        },
                        {
                            id: "734798347361058816",
                            allow: ['VIEW_CHANNEL', 'SEND_MESSAGES'],
                        },
                    ])
                    interaction.reply({ content: `**Il ticket è stato aperto con successo ( <#${canale.id}> )!**`, ephemeral: true })
    
                  var button2 = new MessageButton()
                  .setLabel("Chiudi Ticket")
                  .setStyle("DANGER")
                  .setEmoji("⛔")
                  .setCustomId("Chiudi-Ticket")
                  var button3 = new MessageButton()
                  .setLabel("Salva Transcript")
                  .setStyle("SUCCESS")
                  .setEmoji("📃")
                  .setCustomId("Transcript")
    
                var row = new MessageActionRow()
                 .addComponents(button2)
                 .addComponents(button3)
    
                if(data.Logs !== "none") {
                const channel = bot.channels.cache.get(data.Logs)
                const embed = new Discord.MessageEmbed()
                .setTitle("Ticket Aperto")
                .addField("Autore:", "<@" + interaction.user.id + ">")
                .addField("Pannello:", "`" + data.Name + "`")
                .addField("Ticket:", "`" + canale.name + "`")
                .setColor("RANDOM")
                .setFooter("Sistema di Tickets Los Angeles Full RP Bot", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
                channel.send({ embeds: [embed] })
            }
    
                    const embed = new Discord.MessageEmbed()
                    .setTitle(data.Name)
                    .setDescription(data.Description)
                    .setColor("#0bf0e0")
                    .setFooter("Sistema di Ticket Los Angeles Full RP Bot", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
                   canale.send({ embeds: [embed], components: [row] }).then(msg => {
                    msg.pin()
                    setTimeout(() => {
                        msg.channel.bulkDelete(1, true) 
                     }, 2000);
                    })
                   canale.send("<@" + interaction.user.id + ">").then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 1000)
                })
                   canale.send("<@&" + data.Role + ">").then(msg => {
                    setTimeout(() => {
                        msg.delete()
                    }, 1000)
                })
                })
              }
        } catch (err) {
            console.log(err)
        }
});