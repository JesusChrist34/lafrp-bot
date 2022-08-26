const { Client, CommandInteraction } = require('discord.js');
const Discord = require('discord.js')

module.exports = {
    name: 'passato',
    description: 'Accetta la whitelist orale di un utente',
    timeout: 5000,
    premium: false,
    options: [
      {
        name: 'utente',
        description: 'Utente a cui accettare la whitelist',
        type: 'USER',
        required: true,
      },
    ],

    /**
     *
     * @param {Client} bot
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */

    run: async (bot, interaction, args) => {

      if(!interaction.member.roles.cache.has("799045333413920858")) return interaction.reply({ content: "Non hai i permessi necessari per eseguire questo comando!", ephemeral: true });

      const user = interaction.options.getMember('utente')
        
      const wlembed = new Discord.MessageEmbed()
        .setTitle("**__Esito Whitelist Orale!__**")
        .setDescription(`**Complimenti ${user}, ha passato la whitelist orale del server!**`)
        .setFooter("Buona permanenza", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
        .setTimestamp()
        .setColor("RANDOM")
        interaction.reply({ content: interaction.user.toString(), embeds: [wlembed] })
        await user.roles.add("799045453462503445")
        await user.roles.remove("799045457779097650")

        const embed = new Discord.MessageEmbed()
        .setTitle("**__Primi Passi__**")
        .setDescription(`
**Hey! benvenuto all'interno del Los Angeles Full RP 3.0. Gli ricordo di fare i <#959877264131108874> dopodiché faccia la <#799045605736710215>, se è possibile cambi il suo nickname del server in questo modo --> \`Nome e Cognome RP | ID PS4\`, se ha qualche dubbio vada su <#799045652549992478>. Per unirsi alla sessione roleplay dovrà richiedere l' invito alla crew tramite <#871131075349479484>, dopodiché su <#799045627740815370> dovrà scrivere il suo id social club con il comando \`!share\` in modo tale che lo staff possa avere una conferma della sua richiesta.** 

> *Come iniziare la sua esperienza qui a Los Angeles?*

**È molto semplice, lei avrà un budget iniziale di 10,000$ per comprare le prime cose necessarie, come un telefono, una sim, una patente e volendo una macchina/moto. Come veicolo iniziale avrà una semplice bicicletta, sicuramente dovrà guadagnare altri soldi per vivere, nella categoria <#799045492398227456> troverà <#906298687041437716> e su <#906309982444744825> dovrà fare il comando del bando.**

\`\`\`
N.B Lo Staff non accetta I bandi lavorativi ad eccezione in cui non ci sia un sindaco.
\`\`\` 

> *Si, ma per unirsi in sessione?*

**Troverà la spiegazione su <#959876298019319838>.**  

*Gli auguro una buona permanenza qui su Los Angeles Full RP 3.0 <:Wumpus_Contento:875014048046018614>*
`)
       .setColor("RANDOM")
       .setTimestamp()

       user.send({ embeds: [embed] })
    },
};