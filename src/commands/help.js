const path = require("path")
const fs = require("fs")

/*
	src/commands/help.js
	07/12/2020   -  Weslley Borges dos Santos
	Esse é o arquivo com o comando que mostra os comandos do bot.
*/

const execute = (leStack, msg, args) => {
  let message = '-_-_-_-_-_-_ LeStack -_-_-_-_-_-_ \n'

  const CommandFiles = fs
		.readdirSync(path.join(__dirname,"../commands"))
		.filter(filename => filename.endsWith(".js"))
			
	for (filename of CommandFiles) {
    const command = require(`../commands/${filename}`)
    message += `$${command.name} -> ${command.help}\n`
	}
  msg.reply(message)
}

module.exports = {
  name: "help",
  help: "Mostra os comandos.",
  about: "Mostra um resumo sobre cada funcionalidade do bot, dependendo se o usuário é um membro normal ou ADM",
  execute
}