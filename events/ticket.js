const bot = require("../index")
const Discord = require("discord.js")
const Schema = require("../models/ticket")
const discordTranscripts = require('discord-html-transcripts');

bot.on("interactionCreate", async (interaction) => {

    if (!interaction.isButton()) return;

        try{

        const topic = interaction.channel.topic

        if(!topic) return

        const panelID = topic.slice(44)
    
        const data = await Schema.findOne({ ID: panelID, Guild: interaction.guild.id });
        if(!data) return;
      
          if(interaction.user.bot) return console.log("hey, un bot ci ha provato")
              
        if (interaction.customId == "Chiudi-Ticket") {

                if(!interaction.member.roles.cache.has(data.Role)) return interaction.reply({ content: "Non hai i permessi necessari per poter chiudere il ticket!", ephemeral: true });
    
                  interaction.reply(`**Il ticket verrà eliminato tra 10 secondi. Azionato da: <@${interaction.user.id}>**`)
                    setTimeout(() => interaction.channel.delete("Ticket Chiuso"), 10000)
    
                    if(data.Logs !== "none") {
                      const canale = bot.channels.cache.get(data.Logs)
                      const embed = new Discord.MessageEmbed()
                      .setTitle("Ticket Chiuso")
                      .addField("Autore:", "<@" + interaction.user.id + ">")
                      .addField("Pannello:", "`" + data.Name + "`")
                      .addField("Ticket:", "`" + interaction.channel.name + "`")
                      .setColor("RANDOM")
                      .setFooter("Sistema di Tickets Los Angeles Full RP Bot", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
                      canale.send({ embeds: [embed] })
                  }
          }
          
        if (interaction.customId == "Transcript") {
    
                  if(data.Transcript == "none") return interaction.reply({ content: "Non è stato possibile salvare il transcript per questo ticket perchè non è stato configurato nessun canale dei transcript!", ephemeral: true })
    
                  if(!interaction.member.roles.cache.has(data.Role)) return interaction.reply({ content: "Non hai i permessi necessari per poter salvare il transcript del ticket!", ephemeral: true })
        
                  const attachment = await discordTranscripts.createTranscript(interaction.message.channel, {
                      limit: 10000000,
                      returnBuffer: false,
                      fileName: 'transcript.html'
                  });
                    const canale = bot.channels.cache.get(data.Transcript)
                    const embed = new Discord.MessageEmbed()
                    .setTitle("Transcript Salvato")
                    .addField("Autore:", "<@" + interaction.user.id + ">")
                    .addField("Pannello:", "`" + data.Name + "`")
                    .addField("Ticket:", "`" + interaction.channel.name + "`")
                    .setColor("RANDOM")
                    .setFooter("Sistema di Tickets Los Angeles Full RP Bot", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
                    canale.send({ embeds: [embed], files: [attachment] })
    
            interaction.reply({ content: "**Il transcript per questo ticket è stato salvato con successo!**" })
    
            if(data.Logs !== "none") {
              const canale = bot.channels.cache.get(data.Logs)
              const embed = new Discord.MessageEmbed()
              .setTitle("Transcript Salvato")
              .setDescription(`**Transcript salvato ed inviato in: <#${data.Transcript}>**`)
              .addField("Autore:", "<@" + interaction.user.id + ">")
              .addField("Pannello:", "`" + data.Name + "`")
              .addField("Ticket:", "`" + interaction.channel.name + "`")
              .setColor("RANDOM")
              .setFooter("Sistema di Tickets Los Angeles Full RP Bot", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
              canale.send({ embeds: [embed] })
            }
           }
        } catch (err) {
            console.log(err)
        }
});