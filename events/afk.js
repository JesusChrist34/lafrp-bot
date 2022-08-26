const bot = require("../index")
const Schema = require("../models/afk")

bot.on("messageCreate", async(message) => {
  if(!message.guild || message.author.bot) return;

  const data = await Schema.findOne({ Guild: message.guild.id });
  if(!data) return;

  const owner = await message.guild.fetchOwner()

  const mentionedMember = message.mentions.members.first();
  if(mentionedMember) {

    if(mentionedMember.id == data.User) {
      const timestamp = data.Time;
      const timeAgo = timestamp;

      message.reply({ content: `**Questo utente è attualmente afk!\n__Inizio:__ <t:${timeAgo}:R>\n__Motivo:__ \`${data.Reason}\`**` })
    }
  }

  if(message.author.id == data.User) {
    let member = message.guild.members.cache.get(data.User);
    message.reply({ content: `**Il tuo status da afk è stato rimosso per aver scritto un messaggio!**` });
    await data.delete();
    if(member.id !== owner.id) {
      await member.setNickname(data.Nickname);
    }
  }
});