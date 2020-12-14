const execute = (leStack, msg, args) => {
  args.shift()

  if (args[0] == "create") {
    let lista = {
      name: args.shift(),
      itens: []
    }
    return msg.reply(`LISTA ${lista.name} CRIADA COM SUCESSO!`)
  }
  else if (args[0] == "add" && args.shift() != "" && lista) {
    lista.itens.push(args.shift())
    return msg.reply("ITEM ADICIONADO À LISTA!")
  }
}


module.exports = {
  name: "list",
  help: 'Commandos para criação de lista e ordenação (sorteio).',
  about: '!list create <nome_da_lista> -> cria uma nova lista\n!list add <alguma_coisa> -> Adiciona um item à lista\n!list sort -> Sorteia os itens da lista, colocando em uma nova ordem',
  execute
}