const Captcha = require("@haileybot/captcha-generator")
const Discord = require("discord.js")
const ms = require("ms")
const bot = require("../index");
const Schema = require("../models/captcha")
const mute = require("../models/muterole")

bot.on('guildMemberAdd', async (member) => {
    const data = await Schema.findOne({ Guild: member.guild.id });
    if(!data) return;

    if(data.Status === "disable") return;
    if(data.Status === "enable") {
      if(data.Mode !== "all") {
        timeSpan = ms(`${data.Mode} days`)
      } else {
        timeSpan = ms("9999999 days")
      }

      const duration = ms(data.Time)

      var tempo = ms(duration, { long: true });
            tempo = tempo + ""
            tempo = tempo.replace("second ", "secondo")
            tempo = tempo.replace("seconds", "secondi")
            tempo = tempo.replace("minute ", "minuto ")
            tempo = tempo.replace("minutes", "minuti")
            tempo = tempo.replace("hour ", "ora ")
            tempo = tempo.replace("hours", "ore")
            tempo = tempo.replace("day", "giorno")
            tempo = tempo.replace("days", "giorni")

    const createdAt = new Date(member.user.createdAt).getTime()
    const difference = Date.now() - createdAt

    if(difference < timeSpan) {
    let captcha = new Captcha();
    var server = member.guild;
    const canale = bot.channels.cache.get(data.Channel)
    try {
        const verifycode = await member.send({ content: `**Hai a disposizione ${tempo} per risolvere questo captcha, altrimenti non potrai entrare all'interno del server \`${server.name}\`!**`, files: [new Discord.MessageAttachment(captcha.PNGStream, "captcha.png")] });
        try {
            const filter = m => {
                if(m.author.bot) return;
                if(m.author.id === member.id && m.content === captcha.value) return true;
                else {
                    m.reply({ content: '**Hai provvisto un captcha errato, riprova!**' });
                    return false;
                }
            };
            const response = await verifycode.channel.awaitMessages({ filter, max: 1, time: duration, errors: ['time'] });
            if(response) {
                await verifycode.channel.send({ content: `**Ti sei verificato con successo all'interno del server \`${server.name}\`!**` });
                const embed1 = new Discord.MessageEmbed()
                .setTitle("**Verifica Eseguita**")
                .setDescription(`**L'utente ${member} \`( ${member.id} )\` si è verificato con successo!**`)
                .setFooter("Sistema di Verifica Captcha Los Angeles Full RP Bot", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
                .setTimestamp()
                .setColor("GREEN")
                await canale.send({ embeds: [embed1] })
                await member.roles.add(data.AddRole);
                if(data.RemoveRole) {
                  await member.roles.remove(data.RemoveRole);
                }
                await verifycode.delete();
            }
        }
        catch(err) {
            console.log(err);
            if(data.Action === "ban") {
              await verifycode.channel.send({ content: `**Non hai risolto il captcha entro ${data.Time} minuto/i, di conseguenza sei stato bannato dal server \`${server.name}\`!**` });
            await member.ban({ reason: "Captcha System || Tempo Scaduto" });
            const embed2 = new Discord.MessageEmbed()
            .setTitle("**Verifica Fallita**")
            .setDescription(`**L'utente ${member} ( \`${member.id}\` ) ha fallito la verifica poichè ha finito il tempo a disposizione!**`)
            .setFooter("Sistema di Verifica Captcha Los Angeles Full RP Bot", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
            .setTimestamp()
            .setColor("RED")
            await canale.send({ embeds: [embed2] })
            await verifycode.delete();
            } else if(data.Action === "kick") {
              await verifycode.channel.send({ content: `**Non hai risolto il captcha entro ${data.Time} minuto/i, di conseguenza sei stato espulso dal server \`${server.name}\`!**` });
            await member.kick("Captcha System || Tempo Scaduto");
            const embed2 = new Discord.MessageEmbed()
            .setTitle("**Verifica Fallita**")
            .setDescription(`**L'utente ${member} ( \`${member.id}\` ) ha fallito la verifica poichè ha finito il tempo a disposizione!**`)
            .setFooter("Sistema di Verifica Captcha Los Angeles Full RP Bot", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
            .setTimestamp()
            .setColor("RED")
            await canale.send({ embeds: [embed2] })
            await verifycode.delete();
            } else if(data.Action === "mute") {
              const muterole = await mute.findOne({ Guild: message.guild.id })
                if(!muterole) return;

              await verifycode.channel.send({ content: `**Non hai risolto il captcha entro ${data.Time} minuto/i, di conseguenza sei stato mutato nel server \`${server.name}\`!**` });
            await member.roles.add(muterole.Role);
            const embed2 = new Discord.MessageEmbed()
            .setTitle("**Verifica Fallita**")
            .setDescription(`**L'utente ${member} ( \`${member.id}\` ) ha fallito la verifica poichè ha finito il tempo a disposizione!**`)
            .setFooter("Sistema di Verifica Captcha Los Angeles Full RP Bot", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
            .setTimestamp()
            .setColor("RED")
            await canale.send({ embeds: [embed2] })
            await verifycode.delete();
            }
        }
      } catch (e) {
      if (
        String(e).includes(
          "DiscordAPIError: Cannot send messages to this user"
        )
      ) {
        const error = new Discord.MessageEmbed()
          .setTitle("**Verifica Impossibile**")
          .setDescription(`**Non è stato possibile eseguire la verifica per l'utente ${member} ( \`${member.id}\` ) poichè l'utente ha i dm bloccati!**`)
          .setFooter("Sistema di Verifica Captcha Los Angeles Full RP Bot", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
          .setTimestamp()
          .setColor("RED")
        return canale.send({ embeds: [error] });
      }
     }
    }
  }
});