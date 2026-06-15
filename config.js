import { watchFile, unwatchFile } from 'fs' 
import chalk from 'chalk'
import { fileURLToPath } from 'url'
import fs from 'fs'
import cheerio from 'cheerio'
import fetch from 'node-fetch'
import axios from 'axios'
import moment from 'moment-timezone' 

// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022
// [ES] > Agrega el n\u00famero que ser\u00e1 Bot y los que ser\u00e1n propietarios.
// [EN] > Add the number that will be Bot and those that will be owners.
global.owner = [
'201030943917',
]
global.ownerLid = '43808800657500'

global.mods = []
global.prems = []

//cambia a false Desactivar en "auto-reconexion" de sub-bots
global.MashJadibts = true

// Cambiar a false para usar el Bot desde el mismo numero del Bot.
global.isBaileysFail = false
// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022

// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022
// \u2770\u2770 RENDER \u2771\u2771
//Kurt18: Obtener el c\u00f3digo QR por la URL del Hosting
global.obtenerQrWeb = 0 //Solo valores: 1 o 0
//Kurt18: Aplica para Host Render.com
global.keepAliveRender = 0 //Solo valores: 1 o 0
// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022

// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022
// \u2770\u2770 methodCode \u2771\u2771
// [ES] > Agregue el n\u00famero del Bot en "botNumberCode" si desea recibir c\u00f3digo de 8 d\u00edgitos sin registrar el n\u00famero en la consola.
// [EN] > Add the Bot number in "botNumberCode" if you want to receive 8-digit code without registering the number in the console.
global.botNumberCode = '' //example: "+59309090909"
global.confirmCode = '' // No tocar esto : Do not touch this line
// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022

// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022
// \u2770\u2770 Multi Idioma Din\u00e1mico : Dynamic Multi Language (MID-GB) \u2771\u2771
// [ES] > Agregu\u00e9 uno de los idiomas disponibles para el Bot en "mid".
// [EN] > I added one of the languages available for the Bot in "mid".
global.libreria = 'Baileys'
global.baileys = 'V 6.7.16' 
global.languaje = 'Arabic'
global.vs = '2.2.0'
global.nameqr = 'MURATA-BOT'
global.namebot = '\ud83e\udd85 \ud835\udc74\ud835\udc7c\ud835\udc79\ud835\udc68\ud835\udc7b\ud835\udc68 \ud835\udc69\ud835\udc76\ud835\udc7b'
global.Mashsession = 'Mashsession'
global.jadi = 'Mashjadibts' 
// \u2770\u2770 IDIOMAS DISPONIBLES : AVAILABLE LANGUAGES \u2771\u2771
// Espa\u00f1ol \ud83d\udc49 es
// English \ud83d\udc49 en
// [ES] > Si "default_language" esta vac\u00edo, su idioma predeterminado ser\u00e1 Espa\u00f1ol o se usar\u00e1 el idioma que cada usuario haya seleccionado al momento de registrarse.
// [EN] > If "default_language" is empty, your default language will be Spanish or the language that each user has selected at the time of registration will be used.
// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022

// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022
// \u2770\u2770 API KEYS \u2771\u2771
global.baileys = '@whiskeysockets/baileys'
global.apis = 'https://api.delirius.store'

global.APIs = {
lolhuman: {url: 'https://api.lolhuman.xyz/api', key: 'MashDiosV3'},
stellar: {url: 'https://api.stellarwa.xyz', key: 'Mash'},
skizo: {url: 'https://skizo.tech/api', key: 'Mash'},
alyachan: {url: 'https://api.alyachan.dev/api', key: null},
exonity: {url: 'https://exonity.tech/api', key: 'Mash'},
ryzendesu: {url: 'https://api.ryzendesu.vip/api', key: null},
neoxr: {url: 'https://api.neoxr.eu/api', key: 'Mash'},
davidcyriltech: {url: 'https://api.davidcyriltech.my.id', key: null},
dorratz: {url: 'https://api.dorratz.com', key: null},
siputzx: {url: 'https://api.siputzx.my.id/api', key: null},
vreden: {url: 'https://api.vreden.web.id/api', key: null},
fgmods: {url: 'https://api.fgmods.xyz/api', key: 'elrebelde21'},
popcat: {url: 'https://api.popcat.xyz', key: null}
}
// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022

// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022
// \u2770\u2770 bibliotecas : libraries \u2771\u2771
global.cheerio = cheerio
global.fs = fs
global.fetch = fetch
global.axios = axios
global.moment = moment
// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022

// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022
// [ES] > Agregate a ti, colaboradores o ayudates, aparecer\u00e1 en el comando de lista de contactos.
// [EN] > Adding yourself, collaborators or helpers will appear in the contact list command.
global.official = [
// Agregate si eres Owner
['201030943917', 'MURATA \ud83e\udd85', 1],
]

global.mail = '' // Add email
global.desc = '' // Add short description (20 caractres max)
global.desc2 = '' // Add long description (90 caractres max) (Este par\u00e1metro se aplicar\u00e1 s\u00f3lo si su whasapp no tiene descripci\u00f3n)
global.country = '' // Add country, example: \ud83c\uddea\ud83c\udde8
// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022

global.packname = '\ud83e\udd85 MURATA BOT' //"BY: ESCANOR \ud83d\udc08"
global.author =
'Owner: 201030943917' //"\ud835\ude42\ud835\ude56\ud835\ude69\ud835\ude56 \ud835\ude3f\ud835\ude5e\ud835\ude64\ud835\ude68"

// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022
// [ES] > INFORMACI\u00d3N DE VERSIONES DEL BOT, POR FAVOR
// MANTENGA ESTO SIN MODIFICAR, NOS ESFORZAMOS A DIARIO POR OFRECERLES UN BOT PARA LA COMUNIDAD, SEA AGRADECIDO \ud83d\ude09
// [EN] > BOT VERSION INFORMATION, PLEASE KEEP THIS UNCHANGED, WE STRIVE DAILY TO PROVIDE YOU WITH A BOT FOR THE COMMUNITY, BE GRATEFUL
global.vs = '1.7.0'
global.vsJB = '\u0627\u0644\u0627\u0635\u062f\u0627\u0631 \u0627\u0644\u0627\u062d\u062f\u062b'
global.gt = 'MURATA BOT'
global.imagen = fs.readFileSync('./Menu2.jpg')

// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022

global.rg = '*\u2570\u22b1\u2705\u22b1\u0627\u0644\u0640\u0640\u0646\u0640\u0640\u062a\u0640\u0640\u0627\u0626\u0640\u0640\u062c\u2705\u22b1\u256e*\n'
global.resultado = rg

global.ag = '*\u2570\u22b1\u26a0\ufe0f\u22b1\u062a\u0640\u0640\u062d\u0640\u0640\u0630\u064a\u0640\u0640\u0631\u26a0\ufe0f\u22b1\u256e*\n'
global.advertencia = ag

global.iig = '*\u2570\u22b1\u2755\u22b1\u0645\u0640\u0640\u0639\u0640\u0640\u0644\u0640\u0640\u0648\u0645\u0640\u0640\u0627\u062a\u22b1\u22b1\u256e*\n'
global.informacion = iig

global.fg = '*\u2570\u22b1\u274c\u062e\u0640\u0640\u0637\u0640\u0640\u0623\u274c\u22b1\u256e**\n'
global.fallo = fg

global.mg = '*\u2570\u22b1\u2757\ufe0f\u22b1\u0627\u0633\u0640\u0640\u062a\u062e\u0640\u0640\u062f\u0627\u0645 \u062e\u0640\u0640\u0627\u0637\u0640\u0640\u0626\u2757\ufe0f\u22b1\u256e*\n'
global.mal = mg

global.eeg = '*\u2570\u22b1\ud83d\udce9\u22b1\u062a\u0640\u0640\u0642\u0640\u0640\u0631\u064a\u0640\u0640\u0631\ud83d\udce9\u22b1\u256e*\n'
global.envio = eeg

global.eg = '*\u2570\u22b1\ud83d\udc9a\u062e\u0640\u0640\u0631\u0648\u062c\ud83d\udc9a\u22b1\u256e*\n'
global.exito = eg

// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022
global.wm = '\ud83e\udd85 MURATA BOT'
global.igfg = '\ud83e\udd85 MURATA BOT'
global.nomorown = '201030943917'
global.pdoc = [
'application/vnd.openxmlformats-officedocument.presentationml.presentation',
'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
'application/vnd.ms-excel',
'application/msword',
'application/pdf',
'text/rtf'
]
// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022

// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022
// \u2770 RPG \u2771
global.flaaa = [
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=water-logo&script=water-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextColor=%23000&shadowGlowColor=%23000&backgroundColor=%23000&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=crafts-logo&fontsize=90&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=amped-logo&doScale=true&scaleWidth=800&scaleHeight=500&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&text=',
'https://www6.flamingtext.com/net-fu/proxy_form.cgi?&imageoutput=true&script=sketch-name&doScale=true&scaleWidth=800&scaleHeight=500&fontsize=100&fillTextType=1&fillTextPattern=Warning!&fillColor1Color=%23f2aa4c&fillColor2Color=%23f2aa4c&fillColor3Color=%23f2aa4c&fillColor4Color=%23f2aa4c&fillColor5Color=%23f2aa4c&fillColor6Color=%23f2aa4c&fillColor7Color=%23f2aa4c&fillColor8Color=%23f2aa4c&fillColor9Color=%23f2aa4c&fillColor10Color=%23f2aa4c&fillOutlineColor=%23f2aa4c&fillOutline2Color=%23f2aa4c&backgroundColor=%23101820&text='
]

global.cmenut = '\u2756\u2013\u2013\u2013\u2013\u2013\u2013\u300e'
global.cmenub = '\u250a\u2726 '
global.cmenuf = '\u2570\u2501\u2550\u2505\u2550\u2501\u2013\u2013\u2013\u2013\u2013\u2013\u0e51\n'
global.cmenua = '\n\u2315 \u2759\u2758\u2759\u2759\u2758\u2759\u275a\u2759\u2758\u2759\u2759\u275a\u2759\u2758\u2759\u2758\u2759\u275a\u2759\u2758\u2759\u2759\u275a\u2759\u2758\u2759\u2759\u2758\u2759\u275a\u2759\u2758 \u2315\n     '

global.dmenut = '*\u2756\u2500\u2505\u2500\u2500\u2505\u3008*'
global.dmenub = '*\u250a\u00bb*'
global.dmenub2 = '*\u250a*'
global.dmenuf = '*\u2570\u2505\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2505\u2726*'
global.htjava = '\u2af9\u2afa'

global.htki = '*\u2b51\u2022\u0329\u0329\u0359\u22b1\u2022\u2022\u2022\u2022 \u262a*'
global.htka = '*\u262a \u2022\u2022\u2022\u2022\u0329\u0329\u0359\u22b0\u2022\u2b51*'

global.comienzo = '\u2022 \u2022 \u25d5\u25d5\u2550\u2550\u2550\u2550'
global.fin = ' \u2022 \u2022'

global.botdate = `\u2af9\u2afa Date :  ${moment.tz('Asia/Riyadh').format('DD/MM/YY')}` //Asia/Riyadh
global.bottime = `\ud835\udde7 \ud835\udddc \ud835\udde0 \ud835\uddd8 : ${moment.tz('Asia/Riyadh').format('HH:mm:ss')}` //Asia/Riyadh
global.fgif = {
key: {
participant: '0@s.whatsapp.net'
},
message: {
videoMessage: {
title: wm,
h: 'Hmm',
seconds: '999999999',
gifPlayback: 'true',
caption: bottime,
jpegThumbnail: fs.readFileSync('./Menu2.jpg')
}
}
}

global.multiplier = 85 // Cuanto m\u00e1s alto, m\u00e1s dif\u00edcil subir de nivel

//Emojis RPG - Referencias
global.rpg = {
emoticon(string) {
string = string.toLowerCase()
let emot = {
level: '\ud83e\uddec Nivel : Level',
limit: lenguajeGB.eDiamante(),
exp: lenguajeGB.eExp(),
bank: '\ud83c\udfe6 Banco : Bank',
diamond: lenguajeGB.eDiamantePlus(),
health: '\u2764\ufe0f Salud : Health',
kyubi: lenguajeGB.eMagia(),
joincount: lenguajeGB.eToken(),
emerald: lenguajeGB.eEsmeralda(),
stamina: lenguajeGB.eEnergia(),
role: '\ud83d\udcaa Rango | Role',
premium: '\ud83c\udf9f\ufe0f Premium',
pointxp: '\ud83d\udce7 Puntos Exp : Point Xp',
gold: lenguajeGB.eOro(),

trash: lenguajeGB.eBasura(),
crystal: '\ud83d\udd2e Cristal : Crystal',
intelligence: '\ud83e\udde0 Inteligencia : Intelligence',
string: lenguajeGB.eCuerda(),
keygold: '\ud83d\udd11 Llave de Oro : Key Gold',
keyiron: '\ud83d\udddd\ufe0f Llave de Hierro : Key Iron',
emas: lenguajeGB.ePinata(),
fishingrod: '\ud83c\udfa3 Ca\u00f1a de Pescar : Fishing Rod',
gems: '\ud83c\udf40 Gemas : Gemas',
magicwand: '\u2695\ufe0f Varita M\u00e1gica : Magic Wand',
mana: '\ud83e\ude84 Hechizo : Spell',
agility: '\ud83e\udd38\u200d\u2642\ufe0f Agilidad : Agility',
darkcrystal: '\u2660\ufe0f Cristal Oscuro : Dark Glass',
iron: lenguajeGB.eHierro(),
rock: lenguajeGB.eRoca(),
potion: lenguajeGB.ePocion(),
superior: '\ud83d\udcbc Superior : Superior',
robo: '\ud83d\ude94 Robo : Robo',
upgrader: '\ud83e\uddf0 Aumentar Mejora : Upgrade',
wood: lenguajeGB.eMadera(),

strength: '\ud83e\uddb9\u200d \u2640\ufe0f Fuerza : Strength',
arc: '\ud83c\udff9 Arco : Arc',
armor: '\ud83e\udd7c Armadura : Armor',
bow: '\ud83c\udff9 Super Arco : Super Bow',
pickaxe: '\u26cf\ufe0f Pico : Peak',
sword: lenguajeGB.eEspada(),

common: lenguajeGB.eCComun(),
uncoommon: lenguajeGB.ePComun(),
mythic: lenguajeGB.eCMistica(),
legendary: lenguajeGB.eClegendaria(),
petFood: lenguajeGB.eAMascots(), //?
pet: lenguajeGB.eCMascota(), //?

bibitanggur: lenguajeGB.eSUva(),
bibitapel: lenguajeGB.eSManzana(),
bibitjeruk: lenguajeGB.eSNaranja(),
bibitmangga: lenguajeGB.eSMango(),
bibitpisang: lenguajeGB.eSPlatano(),

ayam: '\ud83d\udc13 Pollo : Chicken',
babi: '\ud83d\udc16 Puerco : Pig',
Jabali: '\ud83d\udc17 Jabal\u00ed : Wild Boar',
bull: '\ud83d\udc03 Toro : Bull',
buaya: '\ud83d\udc0a Cocodrilo : Alligator',
cat: lenguajeGB.eGato(),
centaur: lenguajeGB.eCentauro(),
chicken: '\ud83d\udc13 Pollo : Chicken',
cow: '\ud83d\udc04 Vaca : Cow',
dog: lenguajeGB.ePerro(),
dragon: lenguajeGB.eDragon(),
elephant: '\ud83d\udc18 Elefante : Elephant',
fox: lenguajeGB.eZorro(),
giraffe: '\ud83e\udd92 Jirafa : Giraffe',
griffin: lenguajeGB.eAve(), //Mascota : Griffin',
horse: lenguajeGB.eCaballo(),
kambing: '\ud83d\udc10 Cabra : Goat',
kerbau: '\ud83d\udc03 B\u00fafalo : Buffalo',
lion: '\ud83e\udd81 Le\u00f3n : Lion',
money: lenguajeGB.eMashCoins(),
monyet: '\ud83d\udc12 Mono : Monkey',
panda: '\ud83d\udc3c Panda',
snake: '\ud83d\udc0d Serpiente : Snake',
phonix: '\ud83d\udd4a\ufe0f F\u00e9nix : Phoenix',
rhinoceros: '\ud83e\udd8f Rinoceronte : Rhinoceros',
wolf: lenguajeGB.eLobo(),
tiger: '\ud83d\udc05 Tigre : Tiger',
cumi: '\ud83e\udd91 Calamar : Squid',
udang: '\ud83e\udd90 Camar\u00f3n : Shrimp',
ikan: '\ud83d\udc1f Pez : Fish',

fideos: '\ud83c\udf5d Fideos : Noodles',
ramuan: '\ud83e\uddea Ingrediente NOVA : Ingredients',
knife: '\ud83d\udd2a Cuchillo : Knife'
}
let results = Object.keys(emot)
.map((v) => [v, new RegExp(v, 'gi')])
.filter((v) => v[1].test(string))
if (!results.length) return ''
else return emot[results[0][0]]
}
}

global.rpgg = {
//Solo emojis
emoticon(string) {
string = string.toLowerCase()
let emott = {
level: '\ud83e\uddec',
limit: '\ud83d\udc8e',
exp: '\u26a1',
bank: '\ud83c\udfe6',
diamond: '\ud83d\udc8e+',
health: '\u2764\ufe0f',
kyubi: '\ud83c\udf00',
joincount: '\ud83e\ude99',
emerald: '\ud83d\udc9a',
stamina: '\u2728',
role: '\ud83d\udcaa',
premium: '\ud83c\udf9f\ufe0f',
pointxp: '\ud83d\udce7',
gold: '\ud83d\udc51',

trash: '\ud83d\uddd1',
crystal: '\ud83d\udd2e',
intelligence: '\ud83e\udde0',
string: '\ud83d\udd78\ufe0f',
keygold: '\ud83d\udd11',
keyiron: '\ud83d\udddd\ufe0f',
emas: '\ud83e\ude85',
fishingrod: '\ud83c\udfa3',
gems: '\ud83c\udf40',
magicwand: '\u2695\ufe0f',
mana: '\ud83e\ude84',
agility: '\ud83e\udd38\u200d\u2642\ufe0f',
darkcrystal: '\u2660\ufe0f',
iron: '\u26d3\ufe0f',
rock: '\ud83e\udea8',
potion: '\ud83e\udd64',
superior: '\ud83d\udcbc',
robo: '\ud83d\ude94',
upgrader: '\ud83e\uddf0',
wood: '\ud83e\udeb5',

strength: '\ud83e\uddb9\u200d \u2640\ufe0f',
arc: '\ud83c\udff9',
armor: '\ud83e\udd7c',
bow: '\ud83c\udff9',
pickaxe: '\u26cf\ufe0f',
sword: '\u2694\ufe0f',

common: '\ud83d\udce6',
uncoommon: '\ud83e\udd61',
mythic: '\ud83d\uddf3\ufe0f',
legendary: '\ud83c\udf81',
petFood: '\ud83c\udf56',
pet: '\ud83c\udf71',

bibitanggur: '\ud83c\udf47',
bibitapel: '\ud83c\udf4e',
bibitjeruk: '\ud83c\udf4a',
bibitmangga: '\ud83e\udd6d',
bibitpisang: '\ud83c\udf4c',

ayam: '\ud83d\udc13',
babi: '\ud83d\udc16',
Jabali: '\ud83d\udc17',
bull: '\ud83d\udc03',
buaya: '\ud83d\udc0a',
cat: '\ud83d\udc08',
centaur: '\ud83d\udc10',
chicken: '\ud83d\udc13',
cow: '\ud83d\udc04',
dog: '\ud83d\udc15',
dragon: '\ud83d\udc09',
elephant: '\ud83d\udc18',
fox: '\ud83e\udd8a',
giraffe: '\ud83e\udd92',
griffin: '\ud83e\udd85', //Mascota : Griffin',
horse: '\ud83d\udc0e',
kambing: '\ud83d\udc10',
kerbau: '\ud83d\udc03',
lion: '\ud83e\udd81',
money: '\ud83d\udc31',
monyet: '\ud83d\udc12',
panda: '\ud83d\udc3c',
snake: '\ud83d\udc0d',
phonix: '\ud83d\udd4a\ufe0f',
rhinoceros: '\ud83e\udd8f',
wolf: '\ud83d\udc3a',
tiger: '\ud83d\udc05',
cumi: '\ud83e\udd91',
udang: '\ud83e\udd90',
ikan: '\ud83d\udc1f',

fideos: '\ud83c\udf5d',
ramuan: '\ud83e\uddea',
knife: '\ud83d\udd2a'
}
let results = Object.keys(emott)
.map((v) => [v, new RegExp(v, 'gi')])
.filter((v) => v[1].test(string))
if (!results.length) return ''
else return emott[results[0][0]]
}
}
global.rpgshop = {
//Tienda
emoticon(string) {
string = string.toLowerCase()
let emottt = {
exp: lenguajeGB.eExp(),
limit: lenguajeGB.eDiamante(),
diamond: lenguajeGB.eDiamantePlus(),
joincount: lenguajeGB.eToken(),
emerald: lenguajeGB.eEsmeralda(),
berlian: lenguajeGB.eJoya(),
kyubi: lenguajeGB.eMagia(),
gold: lenguajeGB.eOro(),
money: lenguajeGB.eMashCoins(),
tiketcoin: lenguajeGB.eMashTickers(),
stamina: lenguajeGB.eEnergia(),
potion: lenguajeGB.ePocion(),
aqua: lenguajeGB.eAgua(),
trash: lenguajeGB.eBasura(),
wood: lenguajeGB.eMadera(),
rock: lenguajeGB.eRoca(),
batu: lenguajeGB.ePiedra(),
string: lenguajeGB.eCuerda(),
iron: lenguajeGB.eHierro(),
coal: lenguajeGB.eCarbon(),
botol: lenguajeGB.eBotella(),
kaleng: lenguajeGB.eLata(),
kardus: lenguajeGB.eCarton(),
eleksirb: lenguajeGB.eEletric(),
emasbatang: lenguajeGB.eBarraOro(),
emasbiasa: lenguajeGB.eOroComun(),
rubah: lenguajeGB.eZorroG(),
sampah: lenguajeGB.eBasuraG(),
serigala: lenguajeGB.eLoboG(),
kayu: lenguajeGB.eMaderaG(),
sword: lenguajeGB.eEspada(),
umpan: lenguajeGB.eCarnada(),
healtmonster: lenguajeGB.eBillete(),
emas: lenguajeGB.ePinata(),
pancingan: lenguajeGB.eGancho(),
pancing: lenguajeGB.eCanaPescar(),

common: lenguajeGB.eCComun(),
uncoommon: lenguajeGB.ePComun(),
mythic: lenguajeGB.eCMistica(),
pet: lenguajeGB.eCMascota(), //?
gardenboxs: lenguajeGB.eCJardineria(), //?
legendary: lenguajeGB.eClegendaria(),

anggur: lenguajeGB.eUva(),
apel: lenguajeGB.eManzana(),
jeruk: lenguajeGB.eNaranja(),
mangga: lenguajeGB.eMango(),
pisang: lenguajeGB.ePlatano(),

bibitanggur: lenguajeGB.eSUva(),
bibitapel: lenguajeGB.eSManzana(),
bibitjeruk: lenguajeGB.eSNaranja(),
bibitmangga: lenguajeGB.eSMango(),
bibitpisang: lenguajeGB.eSPlatano(),

centaur: lenguajeGB.eCentauro(),
griffin: lenguajeGB.eAve(),
kucing: lenguajeGB.eGato(),
naga: lenguajeGB.eDragon(),
fox: lenguajeGB.eZorro(),
kuda: lenguajeGB.eCaballo(),
phonix: lenguajeGB.eFenix(),
wolf: lenguajeGB.eLobo(),
anjing: lenguajeGB.ePerro(),

petFood: lenguajeGB.eAMascots(), //?
makanancentaur: lenguajeGB.eCCentauro(),
makanangriffin: lenguajeGB.eCAve(),
makanankyubi: lenguajeGB.eCMagica(),
makanannaga: lenguajeGB.eCDragon(),
makananpet: lenguajeGB.eACaballo(),
makananphonix: lenguajeGB.eCFenix()
}
let results = Object.keys(emottt)
.map((v) => [v, new RegExp(v, 'gi')])
.filter((v) => v[1].test(string))
if (!results.length) return ''
else return emottt[results[0][0]]
}
}

global.rpgshopp = {
//Tienda
emoticon(string) {
string = string.toLowerCase()
let emotttt = {
exp: '\u26a1',
limit: '\ud83d\udc8e',
diamond: '\ud83d\udc8e+',
joincount: '\ud83e\ude99',
emerald: '\ud83d\udc9a',
berlian: '\u2666\ufe0f',
kyubi: '\ud83c\udf00',
gold: '\ud83d\udc51',
money: '\ud83d\udc31',
tiketcoin: '\ud83c\udfab',
stamina: '\u2728',

potion: '\ud83e\udd64',
aqua: '\ud83d\udca7',
trash: '\ud83d\uddd1',
wood: '\ud83e\udeb5',
rock: '\ud83e\udea8',
batu: '\ud83e\udd4c',
string: '\ud83d\udd78\ufe0f',
iron: '\u26d3\ufe0f',
coal: '\u26b1\ufe0f',
botol: '\ud83c\udf76',
kaleng: '\ud83e\udd6b',
kardus: '\ud83e\udea7',

eleksirb: '\ud83d\udca1',
emasbatang: '\u303d\ufe0f',
emasbiasa: '\ud83e\udded',
rubah: '\ud83e\udd8a\ud83c\udf2b\ufe0f',
sampah: '\ud83d\uddd1\ud83c\udf2b\ufe0f',
serigala: '\ud83d\udc3a\ud83c\udf2b\ufe0f',
kayu: '\ud83d\udef7',
sword: '\u2694\ufe0f',
umpan: '\ud83e\udeb1',
healtmonster: '\ud83d\udcb5',
emas: '\ud83e\ude85',
pancingan: '\ud83e\ude9d',
pancing: '\ud83c\udfa3',

common: '\ud83d\udce6',
uncoommon: '\ud83e\udd61',
mythic: '\ud83d\uddf3\ufe0f',
pet: '\ud83d\udceb', //?
gardenboxs: '\ud83d\udc90', //?
legendary: '\ud83c\udf81',

anggur: '\ud83c\udf47',
apel: '\ud83c\udf4e',
jeruk: '\ud83c\udf4a',
mangga: '\ud83e\udd6d',
pisang: '\ud83c\udf4c',

bibitanggur: '\ud83c\udf3e\ud83c\udf47',
bibitapel: '\ud83c\udf3e\ud83c\udf4e',
bibitjeruk: '\ud83c\udf3e\ud83c\udf4a',
bibitmangga: '\ud83c\udf3e\ud83e\udd6d',
bibitpisang: '\ud83c\udf3e\ud83c\udf4c',

centaur: '\ud83d\udc10',
griffin: '\ud83e\udd85',
kucing: '\ud83d\udc08',
naga: '\ud83d\udc09',
fox: '\ud83e\udd8a',
kuda: '\ud83d\udc0e',
phonix: '\ud83d\udd4a\ufe0f',
wolf: '\ud83d\udc3a',
anjing: '\ud83d\udc36',

petFood: '\ud83c\udf56', //?
makanancentaur: '\ud83d\udc10\ud83e\udd69',
makanangriffin: '\ud83e\udd85\ud83e\udd69',
makanankyubi: '\ud83c\udf00\ud83e\udd69',
makanannaga: '\ud83d\udc09\ud83e\udd69',
makananpet: '\ud83c\udf71\ud83e\udd69',
makananphonix: '\ud83d\udd4a\ufe0f\ud83e\udd69'
}
let results = Object.keys(emotttt)
.map((v) => [v, new RegExp(v, 'gi')])
.filter((v) => v[1].test(string))
if (!results.length) return ''
else return emotttt[results[0][0]]
}
}
// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022

// IDs de canales
global.ch = {
ch1: '120363423359642420@newsletter',
ch2: '120363423359642420@newsletter'
}
// \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022 \u2022

let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update '" + file + "' detected, reloading..."))
  import(`${file}?update=${Date.now()}`)
})