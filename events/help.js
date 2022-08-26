const bot = require("../index")
const Discord = require("discord.js")
const { MessageActionRow, MessageButton } = require('discord.js');
const prefix = "!"
const prefix2 = "/"

bot.on("interactionCreate", async (interaction) => {

    if (interaction.isCommand()) return;
    if (interaction.isContextMenu()) return;

    if(interaction.isButton()) {
        if(interaction.user.bot) return console.log("hey, un bot ci ha provato")

        var totalPage = 2;
        var totalPage2 = 3;

        if(interaction.customId === "Normal") {

        var button1 = new MessageButton()
            .setLabel("RP Commands")
            .setStyle("PRIMARY")
            .setCustomId("RP")
            .setEmoji("837033978418036787")
        var button2 = new MessageButton()
            .setLabel("Config Commands")
            .setStyle("SUCCESS")
            .setCustomId("Config")
            .setEmoji("898159541865312287")
        var button3 = new MessageButton()
            .setLabel("Pre-Home")
            .setStyle("SECONDARY")
            .setCustomId("Home")
            .setEmoji("917193155231744041")
        var button4 = new MessageButton()
            .setLabel("Chiudi")
            .setStyle("DANGER")
            .setCustomId("Chiudi")
            .setEmoji("807328110588330005")

        var row = new MessageActionRow()
            .addComponents(button1)
            .addComponents(button2)
        var row2 = new MessageActionRow()
            .addComponents(button3)
            .addComponents(button4)

        const page0 = new Discord.MessageEmbed()
        .setTitle("**__Aiuto Comandi Normali [Home]__**")
        .setDescription(`**Hey ${interaction.user}, questa è la home dell'aiuto comandi normali. Con i vari bottoni potrai andare nella categoria che ti serve!**`)
        .setFooter("Pagina 0/2", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
        .setColor("RANDOM")

        interaction.update({ embeds: [page0], components: [row, row2], ephemeral: true })
        } else if(interaction.customId === "RP") {  
                    var page1 = new Discord.MessageEmbed()
                    .setTitle("**__Aiuto Comandi [Pagina 1, RP Commands]__**")
                    .setDescription(`
**\`{arg}\` indica che l'argomento è richiesto.
\`<arg>\` indica che l'argomento è facoltativo.
\`(arg)\` indica che l'argomento è una breve descrizione del comando.

\`${prefix}911\` (Per contattare un operatore del centralino del 911)    
\`${prefix}annuncio + {messaggio}\` (Per pubblicare un annuncio)
\`${prefix}anon + {messaggio}\` (Per pubblicare un messaggio anonimo)
\`${prefix}arresto + {@utente}\` (Per arrestare un utente)
\`${prefix}bando-accettato + {@utente} + {@lavoro} + {@grado}\` (Per accettare un bando ad un utente)
\`${prefix}bando-aperto\` (Per comunicare che il bando è aperto)
\`${prefix}bando-chiuso\` (Per comunicare che il bando è chiuso)
\`${prefix}bando-rifiutato + {@utente} + {@lavoro}\` (Per rifiutare un bando ad un utente)
\`${prefix}benzina\` (Per fare benzina ad un veicolo)
\`${prefix}cam\` (Per spaccare tutte le bodycam / dashcam nelle vicinanze)
\`${prefix}centrale\` (Per iniziare l'assalto alla centrale di polizia)
\`${prefix}curo + <@utente>\` (Per curare te stesso o qualcun'altro all'interno dell'ospedale)
\`${prefix}fine-turno + {@lavoro}\` (Per finire il turno di un lavoro)
\`${prefix}furto-auto + {veicolo}\` (Per rubare un veicolo)
\`${prefix}furto-soldi + {@utente} + {soldi}\` (Per rubare dei soldi ad un utente)
\`${prefix}gioielleria\` (Per iniziare la rapina alla gioielleria)
\`${prefix}gps\` (Per individuare e spaccare i gps posizionati nel veicolo)
\`${prefix}image + {URL immagine}\` (Per inviare un immagine)
\`${prefix}inizio-turno + {@lavoro}\` (Per iniziare il turno di un lavoro)
\`${prefix}insta + {messaggio}\` (Per pubblicare un post su insta)
\`${prefix}lego + {@utente}\` (Per legare un utente)
\`${prefix}liberati\` (Per tentarsi di liberare dalle manette / fascette)
\`${prefix}licenzio + {@utente} + {@lavoro}\` (Per licenziare un utente da un lavoro)
\`${prefix}market\` (Per iniziare la rapina al market)
\`${prefix}me + {azione}\` (Per fare un azione RP)
\`${prefix}medikit + <@utente>\` (per curare in modo parziale le tue ferite subite o quelle di qualcun'altro per non perdere conoscienza)
\`${prefix}pacific\` (Per iniziare la rapina alla pacific bank)
\`${prefix}perquisisco + {@utente}\` (Per perquisire un utente)
\`${prefix}ponsonbys\` (Per iniviare la rapina ad un ponsonbys)
\`${prefix}posizione + {@utente}\` (Per inviare la propria posizione ad un utente)
\`${prefix}prigione\` (Per iniziare l'assalto alla prigione)
\`${prefix}sex + {azione}\` (Per fare un azione RP sex)
\`${prefix}slego + {@utente}\` (Per slegare un utente)
\`${prefix}smanetto + {@utente}\` (Per smanettare un utente)
\`${prefix}stordisco + {@utente}\` (Per stordire un utente)
\`${prefix}suburban\` (Per iniziare la rapina ad un suburban)
\`${prefix}tweet + {messaggio}\` (Per pubblicare un post di tweet)**
`)
                    .setFooter("Pagina 1/" + totalPage, "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
                    .setColor("RANDOM")
        
                var button1 = new MessageButton()
                    .setLabel("RP Commands")
                    .setStyle("PRIMARY")
                    .setCustomId("RP")
                    .setEmoji("837033978418036787")
                    .setDisabled(true)
                var button2 = new MessageButton()
                    .setLabel("Config Commands")
                    .setStyle("SUCCESS")
                    .setCustomId("Config")
                    .setEmoji("898159541865312287")
                var button3 = new MessageButton()
                    .setLabel("Pre-Home")
                    .setStyle("SECONDARY")
                    .setCustomId("Home")
                    .setEmoji("917193155231744041")
                var button4 = new MessageButton()
                    .setLabel("Chiudi")
                    .setStyle("DANGER")
                    .setCustomId("Chiudi")
                    .setEmoji("807328110588330005")
        
                var row = new MessageActionRow()
                    .addComponents(button1)
                    .addComponents(button2)
                var row2 = new MessageActionRow()
                    .addComponents(button3)
                    .addComponents(button4)
        
            interaction.update({ embeds: [page1], components: [row, row2], ephemeral: true })
            } else if(interaction.customId === "Config") {
                    var page2 = new Discord.MessageEmbed()
                    .setTitle("**__Aiuto Comandi [Pagina 2, Configuration Commands]__**")
                    .setDescription(`
**\`{arg}\` indica che l'argomento è richiesto.
\`<arg>\` indica che l'argomento è facoltativo.
\`(arg)\` indica che l'argomento è una breve descrizione del comando.
                    
\`${prefix}anti-bot\` (Per aprire il menù della configurazione dell'anti-bot system)
\`${prefix}anti-invite\` (Per aprire il menù della configurazione dell'anti-invite system)
\`${prefix}anti-raid\` (Per aprire il menù della configurazione dell'anti-raid system)
\`${prefix}blacklist\` (Per aprire il menù della configurazione del blacklist word system)
\`${prefix}captcha\` (Per aprire il menù della configurazione del captcha system)
\`${prefix}goodbye\` (Per aprire il menù della configurazione del goodbye system)
\`${prefix}mod-logs\` (Per aprire il menù della configurazione dei mod-logs)
\`${prefix}mute-role\` (Per aprire il menù della configurazione del mute-role)
\`${prefix}suggestion\` (Per aprire il menù della configurazione del suggestion system)
\`${prefix}ticket\` (Per aprire il menù della configurazione del ticket system)
\`${prefix}welcome\` (Per aprire il menù della configurazione del welcome system)**
`)
                    .setFooter("Pagina 2/" + totalPage, "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
                    .setColor("RANDOM")
        
    var button1 = new MessageButton()
        .setLabel("RP Commands")
        .setStyle("PRIMARY")
        .setCustomId("RP")
        .setEmoji("837033978418036787")
    var button2 = new MessageButton()
        .setLabel("Config Commands")
        .setStyle("SUCCESS")
        .setCustomId("Config")
        .setEmoji("898159541865312287")
        .setDisabled(true)
    var button3 = new MessageButton()
        .setLabel("Pre-Home")
        .setStyle("SECONDARY")
        .setCustomId("Home")
        .setEmoji("917193155231744041")
    var button4 = new MessageButton()
        .setLabel("Chiudi")
        .setStyle("DANGER")
        .setCustomId("Chiudi")
        .setEmoji("807328110588330005")

    var row = new MessageActionRow()
        .addComponents(button1)
        .addComponents(button2)
    var row2 = new MessageActionRow()
        .addComponents(button3)
        .addComponents(button4)
        
        interaction.update({ embeds: [page2], components: [row, row2], ephemeral: true })
        } else if(interaction.customId === "Home") {
        var button1 = new MessageButton()
            .setLabel("Normal Commands")
            .setStyle("PRIMARY")
            .setCustomId("Normal")
            .setEmoji("901404075093024798")
        var button2 = new MessageButton()
            .setLabel("Slash Commands")
            .setStyle("SECONDARY")
            .setCustomId("Slash")
            .setEmoji("916848332645744650")

        var row = new MessageActionRow()
            .addComponents(button1)
            .addComponents(button2)

        const prehome = new Discord.MessageEmbed()
        .setTitle("**__Aiuto Comandi [Pre-Home]__**")
        .setDescription(`**Hey ${interaction.user}, questa è la pre-home dell'aiuto comandi. Con i due bottoni potrai decidere se visualizzare i comandi normali, o i comandi slash del bot!**`)
        .setFooter("Los Angeles Full RP Bot Help System", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
        .setColor("RANDOM")

        interaction.update({ embeds: [prehome], components: [row], ephemeral: true })
        } else if(interaction.customId === "Chiudi") {
            interaction.update({ content: "**L'aiuto comandi è stato chiuso con successo!**", embeds: [], components: [], ephemeral: true })
        } else if(interaction.customId === "Slash") {
        var button1 = new MessageButton()
            .setLabel("Utilities / Fun Commands")
            .setStyle("SECONDARY")
            .setCustomId("Utilities")
            .setEmoji("873702205151129661")
        var button2 = new MessageButton()
            .setLabel("Staff Commands")
            .setStyle("PRIMARY")
            .setCustomId("Staff")
            .setEmoji("898158243195539516")
        var button3 = new MessageButton()
            .setLabel("Administration Commands")
            .setStyle("SUCCESS")
            .setCustomId("Admin")
            .setEmoji("807328205807550515")
        var button4 = new MessageButton()
            .setLabel("Pre-Home")
            .setStyle("SECONDARY")
            .setCustomId("Home")
            .setEmoji("917193155231744041")
        var button5 = new MessageButton()
            .setLabel("Chiudi")
            .setStyle("DANGER")
            .setCustomId("Chiudi")
            .setEmoji("807328110588330005")

        var row = new MessageActionRow()
            .addComponents(button1)
            .addComponents(button2)
            .addComponents(button3)
        var row2 = new MessageActionRow()
            .addComponents(button4)
            .addComponents(button5)

        const page0 = new Discord.MessageEmbed()
        .setTitle("**__Aiuto Comandi Slash [Home]__**")
        .setDescription(`**Hey ${interaction.user}, questa è la home dell'aiuto comandi slash. Con i vari bottoni potrai andare nella categoria che ti serve!**`)
        .setFooter("Pagina 0/3", "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
        .setColor("RANDOM")

        interaction.update({ embeds: [page0], components: [row, row2], ephemeral: true })
        } else if(interaction.customId === "Utilities") {
        var page1 = new Discord.MessageEmbed()
            .setTitle("**__Aiuto Comandi [Pagina 1, Utilities / Fun Commands]__**")
            .setDescription(`
**\`{arg}\` indica che l'argomento è richiesto.
\`<arg>\` indica che l'argomento è facoltativo.
\`(arg)\` indica che l'argomento è una breve descrizione del comando.
            
\`${prefix2}afk + <motivo>\` (Per mettere il proprio status AFK)
\`${prefix2}avatar + {@utente}\` (Per vedere l'avatar di un utente)
\`${prefix2}bot-info\` (Per vedere le info sul bot)
\`${prefix2}bug + {messaggio}\` (Per segnalare un bug ai developer del bot)
\`${prefix2}channel-info + {#canale}\` (Per mostrare le info su un canale)
\`${prefix2}help\` (Per mostrare la lista di tutti i comandi)
\`${prefix2}idea + {messaggio}\` (Per inviare un consiglio ai developer del bot)
\`${prefix2}inviti + {@utente}\` (Per mostrare tutti gli inviti di un utente)
\`${prefix2}link\` (Per avere tutti i link ufficiali del bot)
\`${prefix2}ping\` (Per mostrare tutti i ping del bot)
\`${prefix2}poll + {messaggio}\` (Per fare un sondaggio veloce)
\`${prefix2}remind + {#canale} + {tempo} + {messaggio}\` (Per creare un promemoria all'interno del server)
\`${prefix2}role-info + {@ruolo}\` (Per mostrare le info su un ruolo)
\`${prefix2}server-info\` (Per mostrare le info sul server)
\`${prefix2}suggest + {messaggio}\` (Per creare un sondaggio avanzato)
\`${prefix2}user-info + {@utente}\` (Per mostrare le info su un utente)
\`${prefix2}vote + {@utente}\` (Per votare il ban di un utente)**
`)
            .setFooter("Pagina 1/" + totalPage2, "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
            .setColor("RANDOM")

        var button1 = new MessageButton()
            .setLabel("Utilities / Fun Commands")
            .setStyle("SECONDARY")
            .setCustomId("Utilities")
            .setEmoji("873702205151129661")
            .setDisabled(true)
        var button2 = new MessageButton()
            .setLabel("Staff Commands")
            .setStyle("PRIMARY")
            .setCustomId("Staff")
            .setEmoji("898158243195539516")
        var button3 = new MessageButton()
            .setLabel("Administration Commands")
            .setStyle("SUCCESS")
            .setCustomId("Admin")
            .setEmoji("807328205807550515")
        var button4 = new MessageButton()
            .setLabel("Pre-Home")
            .setStyle("SECONDARY")
            .setCustomId("Home")
            .setEmoji("917193155231744041")
        var button5 = new MessageButton()
            .setLabel("Chiudi")
            .setStyle("DANGER")
            .setCustomId("Chiudi")
            .setEmoji("807328110588330005")

        var row = new MessageActionRow()
            .addComponents(button1)
            .addComponents(button2)
            .addComponents(button3)
        var row2 = new MessageActionRow()
            .addComponents(button4)
            .addComponents(button5)

            interaction.update({ embeds: [page1], components: [row, row2], ephemeral: true })
        } else if(interaction.customId === "Staff") {
            var page2 = new Discord.MessageEmbed()
            .setTitle("**__Aiuto Comandi [Pagina 2, Staff Commands]__**")
            .setDescription(`
**\`{arg}\` indica che l'argomento è richiesto.
\`<arg>\` indica che l'argomento è facoltativo.
\`(arg)\` indica che l'argomento è una breve descrizione del comando.
            
\`${prefix2}accept-suggest + {ID messaggio} + {motivo}\` (Per accettare un suggerimento avanzato)
\`${prefix2}ban + {@utente} + <motivo> + <durata>\` (Per bannare un utente dal server)
\`${prefix2}ban-with-id + {ID utente} + <motivo> + <durata>\` (Per bannare un utente dal server tramite l'id)
\`${prefix2}clear + {quantità}\` (Per eliminare una quantità precisa di messaggi)
\`${prefix2}deny-suggest + {ID messaggio} + {motivo}\` (Per rifiutare un suggerimento avanzato)
\`${prefix2}give-role + {@utente} + {@ruolo} + <motivo>\` (Per aggiungere un ruolo ad un utente)
\`${prefix2}kick + {@utente} + <motivo>\` (Per espelllere un utente dal server)
\`${prefix2}list-warn + {@utente}\` (Per mostrare la lista dei warn presi di un utente)
\`${prefix2}lock\` (Per chiudere un canale)
\`${prefix2}lockdown\` (Per chiudere tutti i canali del server)
\`${prefix2}mute + {@utente} + <motivo> + <durata>\` (Per mutare un utente all'interno del server)
\`${prefix2}nickname + {@utente} + {nickname}\` (Per cambiare il nickname ad un utente)
\`${prefix2}rimandato + {@utente} + <motivo>\` (Per rifiutare la whitelist di un utente)
\`${prefix2}nuke\` (Per eliminare e ricreeare un canale)
\`${prefix2}police-off\` (Per mandare le azioni criminali offline)
\`${prefix2}police-on\` (Per mandare le azioni criminali online)
\`${prefix2}remove-warn + {ID warn} + <motivo>\` (Per rimuovere un warn ad un utente)
\`${prefix2}rpoff\` (Per mandare l'rp offline)
\`${prefix2}rpon\` (Per mandare l'rp online)
\`${prefix2}say + {messaggio}\` (Per far ripetere al bot un messaggio)
\`${prefix2}scritto + {@utente} + <motivo>\` (Per accettare la whitelist scritta di un utente)
\`${prefix2}slowmode + {tempo}\` (Per impostare lo slowmode ad un canale)
\`${prefix2}steal-emoji + {emoji} + <nome>\` (Per aggiungere un emoji proveniente da un altro server)
\`${prefix2}take-role + {@utente} + {@ruolo}\` (Per rimuovere un ruolo ad un utente)
\`${prefix2}tell + {messaggio}\` (Per far ripetere al bot un messaggio in formato embed)
\`${prefix2}timeout + {@utente} + {durata} + <motivo>\` (Per mettere in timeout un utente all'interno del server)
\`${prefix2}unban + {ID utente} + {motivo}\` (Per sbannare un utente all'interno del server)
\`${prefix2}unlock\` (Per sbloccare un canale)
\`${prefix2}unlockdown\` (Per sbloccare tutti i canali del server)
\`${prefix2}unmute + {@utente} + <motivo>\` (Per smutare un utente all'interno del server)
\`${prefix2}warn + {@utente} + <motivo>\` (Per warnare un utente all'interno del server)
\`${prefix2}passato + {@utente} + <motivo>\` (Per accettare la whitelist di un utente)
\`${prefix2}wl-off\` (Per mettere le whitelist orali offline)
\`${prefix2}wl-on\` (Per mettere le whitelist orali online)
\`${prefix2}ticket-add + {@utente}\` (Per aggiungere un utente ad un ticket)
\`${prefix2}ticket-close\` (Per chiudere un ticket)
\`${prefix2}ticket-remove + {@utente}\` (Per rimuovere un utente ad un ticket)
\`${prefix2}ticket-transcript\` (Per salvare il transcript del ticket)**
`)
            .setFooter("Pagina 2/" + totalPage2, "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
            .setColor("RANDOM")

        var button1 = new MessageButton()
            .setLabel("Utilities / Fun Commands")
            .setStyle("SECONDARY")
            .setCustomId("Utilities")
            .setEmoji("873702205151129661")
        var button2 = new MessageButton()
            .setLabel("Staff Commands")
            .setStyle("PRIMARY")
            .setCustomId("Staff")
            .setEmoji("898158243195539516")
            .setDisabled(true)
        var button3 = new MessageButton()
            .setLabel("Administration Commands")
            .setStyle("SUCCESS")
            .setCustomId("Admin")
            .setEmoji("807328205807550515")
        var button4 = new MessageButton()
            .setLabel("Pre-Home")
            .setStyle("SECONDARY")
            .setCustomId("Home")
            .setEmoji("917193155231744041")
        var button5 = new MessageButton()
            .setLabel("Chiudi")
            .setStyle("DANGER")
            .setCustomId("Chiudi")
            .setEmoji("807328110588330005")

        var row = new MessageActionRow()
            .addComponents(button1)
            .addComponents(button2)
            .addComponents(button3)
        var row2 = new MessageActionRow()
            .addComponents(button4)
            .addComponents(button5)

            interaction.update({ embeds: [page2], components: [row, row2], ephemeral: true })
        } else if(interaction.customId === "Admin") {
            var page3 = new Discord.MessageEmbed()
            .setTitle("**__Aiuto Comandi [Pagina 3, Administrator Commands]__**")
            .setDescription(`
**\`{arg}\` indica che l'argomento è richiesto.
\`<arg>\` indica che l'argomento è facoltativo.
\`(arg)\` indica che l'argomento è una breve descrizione del comando.
            
\`${prefix2}backup-info + {ID backup}\` (Per mostrare le info su un backup)
\`${prefix2}backup-create\` (Per creare un backup all'interno del server)
\`${prefix2}disable-command + {comando}\` (Per disabilitare un comando all'interno del server)
\`${prefix2}enable-command + {comando}\` (Per abilitare un comando all'interno del server)
\`${prefix2}backup-load + {ID backup}\` (Per caricare un backup all'interno del server)
\`${prefix2}remove-all-warn + {@utente}\` (Per rimuovere tutti i warn ad un utente)
\`${prefix2}ticket-send + {ID pannello}\` (Per inviare un pannello dei tickets)
\`${prefix2}rr-add-role + {@ruolo} + <descrizione + <emoji>\` (Per aggiungere un ruolo al pannello dei reaction roles)
\`${prefix2}rr-remove-role + {@ruolo}\` (Per rimuovere un ruolo dal pannello dei reaction roles)
\`${prefix2}rr-panel-send\` (Per inviare il pannello dei reaction roles)**
`)
            .setFooter("Pagina 3/" + totalPage2, "https://cdn.discordapp.com/attachments/844701498116931604/870992144737894430/IMG_20210730_132734_824.jpg")
            .setColor("RANDOM")

        var button1 = new MessageButton()
            .setLabel("Utilities / Fun Commands")
            .setStyle("SECONDARY")
            .setCustomId("Utilities")
            .setEmoji("873702205151129661")
        var button2 = new MessageButton()
            .setLabel("Staff Commands")
            .setStyle("PRIMARY")
            .setCustomId("Staff")
            .setEmoji("898158243195539516")
        var button3 = new MessageButton()
            .setLabel("Administration Commands")
            .setStyle("SUCCESS")
            .setCustomId("Admin")
            .setEmoji("807328205807550515")
            .setDisabled(true)
        var button4 = new MessageButton()
            .setLabel("Pre-Home")
            .setStyle("SECONDARY")
            .setCustomId("Home")
            .setEmoji("917193155231744041")
        var button5 = new MessageButton()
            .setLabel("Chiudi")
            .setStyle("DANGER")
            .setCustomId("Chiudi")
            .setEmoji("807328110588330005")

        var row = new MessageActionRow()
            .addComponents(button1)
            .addComponents(button2)
            .addComponents(button3)
        var row2 = new MessageActionRow()
            .addComponents(button4)
            .addComponents(button5)

            interaction.update({ embeds: [page3], components: [row, row2], ephemeral: true })
        }
    }
});