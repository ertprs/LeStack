const path = require("path")
const fs = require("fs")

/*
	src/commands/help.js
	07/12/2020   -  Weslley Borges dos Santos
	Esse é o arquivo com o comando que mostra os comandos do bot.
*/

const execute = (leStack, msg, args) => {
  let message = '|-|-|-|-| LeStack |-|-|-|-|\n'

  const CommandFiles = fs
		.readdirSync(path.join(__dirname,"../commands"))
		.filter(filename => filename.endsWith(".js"))
			
	for(filename of CommandFiles){
    const command = require(`../commands/${filename}`)
    message += `$${command.name} -> ${command.about}\n`
	}
  msg.reply(message)
}

module.exports = {
  name: "help",
  about: 'Mostra os comandos.',
  execute
}