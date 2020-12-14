const execute = (leStack, msg, args) => {
  args.shift()
  console.log(args)

  if (args != "") {
    const CommandFiles = fs
		.readdirSync(path.join(__dirname,"../commands"))
		.filter(filename => filename.endsWith(".js"))
			
    for (filename of CommandFiles) {
      const command = require(`../commands/${filename}`)

      if (command.name == args)  return msg.reply(command.name+":\n"+command.about)
    }
    return msg.reply("Não existe um commando com esse nome...")
  }
  return msg.reply("Tá dando erro nessa merda.")
}

module.exports = {
  name: "about",
  help: 'Fala sobre uma funcionalidade',
  about: 'Fala detalhadamente sobre uma certa funcionalidade:\nExemplo: !about help',
  execute
}