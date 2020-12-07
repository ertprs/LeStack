const execute = (leStack, msg, args) => {
msg.reply(`
-------Lestack (Ajuda)-------
!Help -> Mostra os comandos
`)
}
module.exports = {
  name: "Help",
  archive: "./commands/help.js",
  execute
}