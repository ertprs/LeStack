const fs = require('fs')
const path = require('path')

/*
src/main.js
07/12/2020   -  Weslley Borges dos Santos
Esse é o arquivo com as funções que envolvem vários pastas;
*/

let commands

function getCommand(commandName) {
  for(command in commands){
    if (commandName == command.name){
      getedCommand = require(command.archive)
      return getdCommand
    }
  }
}

// Vai limpar a lista de comandos e reescreve-la
function refreshCommands() {
  commands = []

  const CommandFiles = fs
  .readdirSync(path.join(__dirname,"./commands"))
  .filter(filename => filename.endsWith(".js"))
  
  for(filename of CommandFiles){
    const command = require(`./commands/${filename}`)
    commands.push({command: command.name, archive: command})
  }
  console.log(commands)
}


exports.module = [
  refreshCommands,
  getCommand
]