const Discord = require('discord.js')

module.exports = {
    name: 'benzina',
    description: 'Fai rifornimento di benzina al tuo veicolo',
    premium: true,
    timeout: 5000,

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run: async(bot, message, args) => {
        
        message.delete();
        const benzinaMain = new Discord.MessageEmbed()

        .setTitle("**__Rifornimento Benzina__**")
        .setDescription(`
**Ciao! specifica quanti litri di benzina vuoi mettere (massimo 10 litri), un litro costa 175$.**
        `)
        .setFooter("Dal benzinaio", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
        .setColor("RED")
        .setTimestamp()

        const main = await message.channel.send({ content: message.author.toString(), embeds: [benzinaMain] });

        const collector = message.channel.createMessageCollector({
          filter: (m) => m.author.id === message.author.id,
          time: 30000,
          max: 1,
      });

     collector.on('collect', async (m) => {
          if(m) {
               if(m.content == "1") {
               var benzinaprezzo = "175"
               var litri = "1"
               var min = "10"

               const benzina = new Discord.MessageEmbed()
              .setTitle("**__Rifornimento Benzina__**")
              .setDescription(`
**Hai rifornito con successo ${litri} litro di benzina.
Ricordo che con ${litri} litro di benzina potrai viaggiare per massimo ${min} minuti, il prezzo è di ${benzinaprezzo}$.**
              `)
              .setFooter("Dal benzinaio", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
              .setColor("RED")
              .setTimestamp()
                                 
              m.delete()
              await main.edit({ content: message.author.toString(), embeds: [benzina] });
              collector.stop()
               } else if(m.content == "2") {
               var benzinaprezzo = 150 * 2
               var litri = 1 * 2
               var min = 10 * 2

               const benzina = new Discord.MessageEmbed()
              .setTitle("**__Rifornimento Benzina__**")
              .setDescription(`
**Hai rifornito con successo ${litri} litri di benzina.
Ricordo che con ${litri} litri di benzina potrai viaggiare per massimo ${min} minuti, il prezzo è di ${benzinaprezzo}$.**
              `)
              .setFooter("Dal benzinaio", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
              .setColor("RED")
              .setTimestamp()
                                 
              await main.edit({ content: message.author.toString(), embeds: [benzina] });
              collector.stop()
              m.delete()
               } else if(m.content == "3") {
               var benzinaprezzo = 150 * 3
               var litri = 1 * 3
               var min = 10 * 3
     
               const benzina = new Discord.MessageEmbed()
               .setTitle("**__Rifornimento Benzina__**")
               .setDescription(`
**Hai rifornito con successo ${litri} litri di benzina.
Ricordo che con ${litri} litri di benzina potrai viaggiare per massimo ${min} minuti, il prezzo è di ${benzinaprezzo}$.**
               `)
               .setFooter("Dal benzinaio", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
               .setColor("RED")
               .setTimestamp()
                                      
               await main.edit({ content: message.author.toString(), embeds: [benzina] });
               collector.stop()
               m.delete()
               } else if(m.content == "4") {
               var benzinaprezzo = 150 * 4
               var litri = 1 * 4
               var min = 10 * 4
     
               const benzina = new Discord.MessageEmbed()
               .setTitle("**__Rifornimento Benzina__**")
               .setDescription(`
**Hai rifornito con successo ${litri} litri di benzina.
Ricordo che con ${litri} litri di benzina potrai viaggiare per massimo ${min} minuti, il prezzo è di ${benzinaprezzo}$.**
               `)
               .setFooter("Dal benzinaio", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
               .setColor("RED")
               .setTimestamp()
                                      
               await main.edit({ content: message.author.toString(), embeds: [benzina] });
               collector.stop()
               m.delete()
               } else if(m.content == "5") {
               var benzinaprezzo = 150 * 5
               var litri = 1 * 5
               var min = 10 * 5
     
               const benzina = new Discord.MessageEmbed()
               .setTitle("**__Rifornimento Benzina__**")
               .setDescription(`
**Hai rifornito con successo ${litri} litri di benzina.
Ricordo che con ${litri} litri di benzina potrai viaggiare per massimo ${min} minuti, il prezzo è di ${benzinaprezzo}$.**
               `)
               .setFooter("Dal benzinaio", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
               .setColor("RED")
               .setTimestamp()
                                      
               await main.edit({ content: message.author.toString(), embeds: [benzina] });
               collector.stop()
               m.delete()
               } else if(m.content == "6") {
               var benzinaprezzo = 150 * 6
               var litri = 1 * 6
               var min = 10 * 6
     
               const benzina = new Discord.MessageEmbed()
               .setTitle("**__Rifornimento Benzina__**")
               .setDescription(`
**Hai rifornito con successo ${litri} litri di benzina.
Ricordo che con ${litri} litri di benzina potrai viaggiare per massimo ${min} minuti, il prezzo è di ${benzinaprezzo}$.**
               `)
               .setFooter("Dal benzinaio", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
               .setColor("RED")
               .setTimestamp()
                                      
               await main.edit({ content: message.author.toString(), embeds: [benzina] });
               collector.stop()
               m.delete()
               } else if(m.content == "7") {
               var benzinaprezzo = 150 * 7
               var litri = 1 * 7
               var min = 10 * 7
     
               const benzina = new Discord.MessageEmbed()
               .setTitle("**__Rifornimento Benzina__**")
               .setDescription(`
**Hai rifornito con successo ${litri} litri di benzina.
Ricordo che con ${litri} litri di benzina potrai viaggiare per massimo ${min} minuti, il prezzo è di ${benzinaprezzo}$.**
               `)
               .setFooter("Dal benzinaio", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
               .setColor("RED")
               .setTimestamp()
                                      
               await main.edit({ content: message.author.toString(), embeds: [benzina] });
               collector.stop()
               m.delete()
               } else if(m.content == "8") {
               var benzinaprezzo = 150 * 8
               var litri = 1 * 8
               var min = 10 * 8
     
               const benzina = new Discord.MessageEmbed()
               .setTitle("**__Rifornimento Benzina__**")
               .setDescription(`
**Hai rifornito con successo ${litri} litri di benzina.
Ricordo che con ${litri} litri di benzina potrai viaggiare per massimo ${min} minuti, il prezzo è di ${benzinaprezzo}$.**
               `)
               .setFooter("Dal benzinaio", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
               .setColor("RED")
               .setTimestamp()
                                      
               await main.edit({ content: message.author.toString(), embeds: [benzina] });
               collector.stop()
               m.delete()
               } else if(m.content == "9") {
               var benzinaprezzo = 150 * 9
               var litri = 1 * 9
               var min = 10 * 9
     
               const benzina = new Discord.MessageEmbed()
               .setTitle("**__Rifornimento Benzina__**")
               .setDescription(`
**Hai rifornito con successo ${litri} litri di benzina.
Ricordo che con ${litri} litri di benzina potrai viaggiare per massimo ${min} minuti, il prezzo è di ${benzinaprezzo}$.**
               `)
               .setFooter("Dal benzinaio", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
               .setColor("RED")
               .setTimestamp()
                                      
               await main.edit({ content: message.author.toString(), embeds: [benzina] });
               collector.stop()
               m.delete()
               } else if(m.content == "10") {
               var benzinaprezzo = 150 * 10
               var litri = 1 * 10
               var min = 10 * 10
     
               const benzina = new Discord.MessageEmbed()
               .setTitle("**__Rifornimento Benzina__**")
               .setDescription(`
**Hai rifornito con successo ${litri} litri di benzina.
Ricordo che con ${litri} litri di benzina potrai viaggiare per massimo ${min} minuti, il prezzo è di ${benzinaprezzo}$.**
               `)
               .setFooter("Dal benzinaio", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
               .setColor("RED")
               .setTimestamp()
                                      
               await main.edit({ content: message.author.toString(), embeds: [benzina] });
               collector.stop()
               m.delete()
               }
          }
       })

       collector.on('end', async (collected, reason) => {
            if(reason === "time") {
                 collector.stop()
                 main.edit({ content: `**${message.author.toString()} hai finito il tempo a disposizione per scegliere una quantità di litri. Riprova di nuovo rispondendo entro 30 secondi!**`, embeds: [] })
            }
       })
    },
};