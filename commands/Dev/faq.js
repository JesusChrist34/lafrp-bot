const Discord = require('discord.js')
const { MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
    name: "faq",

    async run(bot, message, args) {
    if(message.author.id !== "844691950799028235") return;

    var button1 = new MessageButton()
        .setLabel("1️⃣")
        .setStyle("PRIMARY")
        .setCustomId("1")
    var button2 = new MessageButton()
        .setLabel("2️⃣")
        .setStyle("PRIMARY")
        .setCustomId("2")
    var button3 = new MessageButton()
        .setLabel("3️⃣")
        .setStyle("PRIMARY")
        .setCustomId("3")
    var button4 = new MessageButton()
        .setLabel("4️⃣")
        .setStyle("PRIMARY")
        .setCustomId("4")
    var button5 = new MessageButton()
        .setLabel("5️⃣")
        .setStyle("PRIMARY")
        .setCustomId("5")
    var button6 = new MessageButton()
        .setLabel("6️⃣")
        .setStyle("PRIMARY")
        .setCustomId("6")
    var button7 = new MessageButton()
        .setLabel("🆘")
        .setStyle("DANGER")
        .setCustomId("SOS")

    var row = new MessageActionRow()
        .addComponents(button1)
        .addComponents(button2)
        .addComponents(button3)
    var row2 = new MessageActionRow()
        .addComponents(button4)
        .addComponents(button5)
        .addComponents(button6)
    var row3 = new MessageActionRow()
        .addComponents(button7)

    const test = new Discord.MessageEmbed()
    .setTitle("**__Lista FAQ__**")
    .setDescription(`
**Qui saranno elencate tutte le domande, sia del server che del bot, che ci vengono chieste più frequentemente. Con i vari bottoni potrete decidere a quale domanda avere risposta!

1️⃣ = \`Come posso invitare il bot nel server?\`
2️⃣ = \`Perchè il bot è offline?\`
3️⃣ = \`Come posso consigliare qualcosa per il bot?\`
4️⃣ = \`L'utente ha il ruolo mutato, ma può continuare a scrivere, come mai?\`
5️⃣ = \`Perchè non posso vedere alcuni canali?\`
6️⃣ = \`A cosa serve questo server?\`
🆘 = \`Ho un altra domanda non presente in questa lista.\`**
`)
    .setColor("BLUE")
    .setTimestamp()
    .setFooter("Los Angeles Full RP Bot Help System", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
    message.channel.send({ embeds: [test], components: [row, row2, row3] })
    message.delete()
  }
};