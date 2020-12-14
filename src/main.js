const fs = require('fs')
const path = require('path')
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


/*
Você pode usar uma sessão existente e escapar do escaneamento de QR adicionado uma "sessão" objeto nas opções do leStack.
Esse objeto deve incluir WABrowserId, WASecretBundle, WAToken1 e WAToken2.
*/
const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe'
const leStack = new Client({ 
	puppeteer: { 
		headless: true, 
		//executablePath: chromePath
	},
	session: sessionData
})



// Gera e escaneia o QRCode com o seu celular
leStack.on('qr', (qr) => {
  qrcode.generate(qr, {small: true});
})

leStack.on('authenticated', (session) => {
	console.log('AUTHENTICATED', session);
	sessionData = session;
	
	fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), async (err) => {
		if (err) console.error("Opa, houve um erro:\n",err);
	})
})

leStack.on('auth_failure', msg => {
	console.error('Falha na conexão: \n', msg)
});

leStack.on('ready', () => {
	console.log('Cheguei')
	setInterval(getHour(), 60000)
})



/*
	Funções disparadas quando enviam uma mensagem
*/

leStack.on('message', async (msg) => {
	const chat = await msg.getChat()
	if (!msg.body.startsWith(configs.prefix)) {
		return console.log(`MENSAGEM RECEBIDA\n______________________\nAUTOR = ${msg.author}\nONDE = ${chat.name}\nMENSAGEM = ${msg.body}\n`)
	} 


	try { //Procura o comando na pasta "Comandos" para executá-lo

		const args = msg.body.slice(configs.prefix.length).split(" ")
		const commandName = args.shift()

		console.log(args)
		console.log(commandName)

		const CommandFiles = fs
		.readdirSync(path.join(__dirname,"./commands"))
		.filter(filename => filename.endsWith(".js"))
			
		for(filename of CommandFiles){
			const command = require(`./commands/${filename}`)
			if ( command.name == commandName ) {
				return command.execute(leStack, msg, args)
			}
		}
		msg.reply("o comando não foi encontrado :(")

	} catch(e) {
		msg.reply("Houve um erro nessa bagaça, chame um adm, na moral.")
		console.log(e)
	}

})

leStack.initialize()

/*Funções menores*/

function getHour() {
	now = Date
	if (now.getHours() == 12 && now.getMinutes() == 00) {
		leStack.sendMessage("", `BOT: Agora é 12:00 krl!\nComer, comer! Comer, comer!\nÉ o melhor para poder crescer!`)
	}
}