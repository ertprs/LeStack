const fs = require('fs')
const system = require('./systems')

const { Client} = require('whatsapp-web.js')
const configs = require("./configurations")

/*
src/main.js
05/12/2020   -  Weslley Borges dos Santos
Esse é o arquivo principal do bot, onde ocorre suacnexão e chamada de eventos;
*/

const SESSION_FILE_PATH = '../session.json';
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
		sessionData = require(SESSION_FILE_PATH);
}


// Você pode usar uma sessão existente e escapar do escaneamento de QR adicionado uma "sessão" objeto nas opções do leStack.
// Esse objeto deve incluir WABrowserId, WASecretBundle, WAToken1 e WAToken2.
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const leStack = new Client({ 
	puppeteer: { 
		headless: false, 
		executablePath: chromePath
	},
	session: sessionData
})



// Gera e escaneia o QRCode com o seu celular
leStack.on('qr', qr => {
  console.log('QR Code recebido: ', qr)
})

leStack.on('authenticated', (session) => {
	console.log('AUTHENTICATED', session);
	sessionData = session;
	
	fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), async (err) => {
		if (err) console.error("Opa, houve um erro:\n",err);
	})
})

leStack.on('auth_failure', msg => {
	console.error('Falhana conexão: \n', msg)
});


leStack.on('ready', () => {
	console.log('Cheguei')
	system.refreshCommands()
})

leStack.on('message', msg => {

	if(!msg.body.startsWith(configs.prefix) && msg.getChat.name == " Stack de Programadores"){
		return console.log(`Mensagem Recebida------------\nAutor = ${msg.author}\nMensagem = ${msg.body}\n`)

	} else if (msg.body.startsWith(configs.prefix) && msg.getChat.name == " Stack de Programadores") {

		const args = msg.body.slice(configs.prefix.length).split(" ")
		const commandName = args.shift()

		console.log(commandName)

		try { //Procura o comando na pasta "Comandos" para executá-lo
			const command = system.getCommand(commandName)
			command.execute(leStack, msg, args)
		} catch(e) {
			msg.reply("o comando não foi encontrado :(")
			console.log(e)
		}
	
	}
})


leStack.initialize()