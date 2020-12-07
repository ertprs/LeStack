const execute = (leStack, msg, args) => {
return msg.reply(`
-------Lestack (Ajuda)-------
$help -> Mostra os comandos
`)
}
module.exports = {
  name: "help",
  about: 'Mostra os comandos',
  execute
}