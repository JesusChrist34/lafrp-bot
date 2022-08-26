const {readdirSync} = require('fs');
const ascii = require('ascii-table')
let table = new ascii("Commands");
table.setHeading('Command', ' Load status');
module.exports= (bot) => {
    readdirSync('./SlashCommands/').forEach(dir => {
        const commands = readdirSync(`./SlashCommands/${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of commands){
            let pull = require(`../SlashCommands/${dir}/${file}`);
            if(pull.name){
                bot.commands.set(pull.name, pull);
                table.addRow(file,'✅')
            } else {
                table.addRow(file, '❌ -> Manca un nome al comando, o il nome non è una stringa')
                continue;
            }if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => bot.aliases.set(alias, pull.name))
        }
    });
    console.log(table.toString());
}
