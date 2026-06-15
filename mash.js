process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '1'
import './config.js'
import { watchFile, unwatchFile } from 'fs'
import cfonts from 'cfonts'
import { createRequire } from 'module'
import { fileURLToPath, pathToFileURL } from 'url'
import { platform } from 'process'
import * as ws from 'ws'
import fs, { readdirSync, statSync, unlinkSync, existsSync, mkdirSync, readFileSync, watch } from 'fs'
import yargs from 'yargs'
import { spawn } from 'child_process'
import lodash from 'lodash'
import { mashJadiBot } from './plugins/jadibot.js'
import chalk from 'chalk'
import syntaxerror from 'syntax-error'
import { format } from 'util'
import path, { join, dirname } from 'path'
import { Boom } from '@hapi/boom'
import { makeWASocket, protoType, serialize } from './lib/simple.js'
import { Low, JSONFile } from 'lowdb'
import store from './lib/store.js'
import pino from 'pino'
const { proto } = (await import('@whiskeysockets/baileys')).default
import pkg from 'google-libphonenumber'
const { PhoneNumberUtil } = pkg
const phoneUtil = PhoneNumberUtil.getInstance()
const { DisconnectReason, useMultiFileAuthState, MessageRetryMap, fetchLatestBaileysVersion, makeCacheableSignalKeyStore, jidNormalizedUser } = await import('@whiskeysockets/baileys')
import readline from 'readline'
import NodeCache from 'node-cache'
const { CONNECTING } = ws
const { chain } = lodash
const PORT = process.env.PORT || process.env.SERVER_PORT || 3000

// ══════════════════════════════════════
//   🦅 MURATA BOT - BANNER
// ══════════════════════════════════════

function printBanner() {
  const white = chalk.whiteBright
  const gray  = chalk.gray
  const cyan  = chalk.cyanBright
  const dim   = chalk.cyan

  const catAscii = [
    `░░▓██▓░░░                           ░░██████████▓██▓░ ░`,
    `░░▓█▓░░ ░                           ░ ░███████████▓█▓░ `,
    `░█▓░░ ░░                                ░██████████▓▓█▓`,
    `▓▓░▓▓░▓  ░                            ░░ ░█████████▓███`,
    `░░█▓▓▓█░░░                              ░ ░████████████`,
    `░██░▓▓██░ ░                              ░  ░████▓█▓███`,
    `█▓░▓▓██▓ ░                                ░░ ░████▓▓▓██`,
    `█▓█▓▓██░ ░                                 ░░░▓█████░▓█`,
    `▓██▓██▓░░          ░░░░░░░░                ░ ░█▓████▓▓█`,
    `▓██▓█▓ ░       ░░░░        ░                ░░█▓██▓▓███`,
    `██▓██░░░     ░░    ░░▓▓███░   ░░░      ░░   ░ ▓▓██░▓███`,
    `▓█░██░ ░   ░░  ░░▓█████████░░    ░░░░░░  ░░░░░░▓█████▓▓`,
    `▓▓▓██░ ░ ░░  ░▓███████████████░░░      ░░    ░░░██▓███▓`,
    `▓ ███░ ░░  ░▓███▓░░██████████████▓▓▓▓▓▓█▓░░░░░░░███████`,
    `█░███░   ░███▓░░   ▓█████████████████████▓░░░░░░██████▓`,
    `░▓█░█░ ░░████▓░ ░░░██████████▓░░░▓███████░░░░░░░██████░`,
    `░▓▓░▓ ▓████████████████████▓░    ░▓███████▓░░░▓░██████ `,
    `▓▓▓▓░ ▓██████████████████░   ░░░░░░░░░░▓▓▓░░░░█░▓█▓███░`,
    `▓▓█▓  ▓███████████████████▓░░░  ░  ░ ░░▓▓░░░░▓█▓▓█▓███░`,
    `░██░░░██▓██████████████████░░░     ░░ ░░      ░░▓█████░`,
    `░▓▓░░░▓█░▓█████▓▓████████▓░ ░  ░░░░  ░▓░░░░░░░░░▓██▓▓█░`,
    ` ▓▓░░░░░░▓░▓███▓░▓██████░  ░ ░░░▓███▓█░    ░░░░░░█▓▓▓▓░`,
    `  ░░░ ░░░█░░░ ▓██▓▓▓▓█▓░░░░     ░░██████▓░░    ░░▓▓▓▓▓░`,
    ` ░ ░░ ░░░░░ ░░░ ░▓▓▓▓▓░░░ ░░░░░░░░░░░░▓█████▓░░░░▓░░░░░`,
    `         ░░░▓░ ░▓░░█████▓░░  ░░░        ░▓██████▓▓▓░░░█`,
    `░      ░░░░░░  ▓▓ ░████████░░    ░░░░░░    ░▓▓█████▓░▓▓`,
    ` ░ ░░        ░░░▓░░███████████▓▓░        ░    ░▓▓██████`,
    ` ░ ░░ ░  ░ ░░░░░░ ░██████████████░░░░░▓░░░░░░▓▓▓███████`,
  ]

  const murataText = [
    "  ███╗   ███╗██╗   ██╗██████╗  █████╗ ████████╗ █████╗  ",
    "  ████╗ ████║██║   ██║██╔══██╗██╔══██╗╚══██╔══╝██╔══██╗ ",
    "  ██╔████╔██║██║   ██║██████╔╝███████║   ██║   ███████║ ",
    "  ██║╚██╔╝██║██║   ██║██╔══██╗██╔══██║   ██║   ██╔══██║ ",
    "  ██║ ╚═╝ ██║╚██████╔╝██║  ██║██║  ██║   ██║   ██║  ██║ ",
    "  ╚═╝     ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝  ╚═╝ ",
  ]

  console.log('')
  console.log(cyan('⌬──══─┈•⤣🦅⤤•┈─══──⌬──══─┈•⤣🦅⤤•┈─══──⌬'))
  console.log('')

  for (const line of catAscii) {
    let colored = ''
    for (const ch of line) {
      if (ch === '█')      colored += white(ch)   // أبيض ناصع
      else if (ch === '▓') colored += chalk.whiteBright(ch)
      else if (ch === '░') colored += gray(ch)    // رمادي
      else                 colored += ' '
    }
    console.log('    ' + colored)
  }

  console.log('')
  for (const line of murataText) console.log(white(line))
  console.log('')
  console.log(cyan('  ┌─────────────────────────────────────────────────────┐'))
  console.log(cyan('  │') + white('          🦅  B O T   A C T I V E  🦅              ') + cyan('│'))
  console.log(cyan('  │') + dim('              Owner: 201030943917                   ') + cyan('│'))
  console.log(cyan('  │') + dim('              Version: 1.0.0  |  Node.js            ') + cyan('│'))
  console.log(cyan('  └─────────────────────────────────────────────────────┘'))
  console.log('')
  console.log(cyan('⌬──══─┈•⤣🦅⤤•┈─══──⌬──══─┈•⤣🦅⤤•┈─══──⌬'))
  console.log('')
}

printBanner()

protoType()
serialize()

global.__filename = function filename(pathURL = import.meta.url, rmPrefix = platform !== 'win32') {
  return rmPrefix ? /file:\/\/\//.test(pathURL) ? fileURLToPath(pathURL) : pathURL : pathToFileURL(pathURL).toString()
}
global.__dirname = function dirname(pathURL) {
  return path.dirname(global.__filename(pathURL, true))
}
global.__require = function require(dir = import.meta.url) {
  return createRequire(dir)
}

global.API = (name, path = '/', query = {}, apikeyqueryname) =>
  (name in global.APIs ? global.APIs[name] : name) + path +
  (query || apikeyqueryname ? '?' + new URLSearchParams(Object.entries({
    ...query,
    ...(apikeyqueryname ? { [apikeyqueryname]: global.APIKeys[name in global.APIs ? global.APIs[name] : name] } : {})
  })) : '')

global.timestamp = { start: new Date }

const __dirname = global.__dirname(import.meta.url)

global.opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
global.prefix = new RegExp('^[#/!.]')

global.db = new Low(/https?:\/\//.test(opts['db'] || '') ? new cloudDBAdapter(opts['db']) : new JSONFile('./src/database/database.json'))
global.DATABASE = global.db

global.loadDatabase = async function loadDatabase() {
  if (global.db.READ) {
    return new Promise((resolve) => {
      const check = () => {
        if (!global.db.READ) resolve(global.db.data == null ? global.loadDatabase() : global.db.data)
        else setTimeout(check, 500)
      }
      setTimeout(check, 500)
    })
  }
  if (global.db.data !== null) return
  global.db.READ = true
  await global.db.read().catch(console.error)
  global.db.READ = null
  global.db.data = {
    users: {},
    chats: {},
    stats: {},
    msgs: {},
    sticker: {},
    settings: {},
    ...(global.db.data || {}),
  }
  global.db.chain = chain(global.db.data)
}
loadDatabase()

const { state, saveCreds } = await useMultiFileAuthState('./Mashsession')
const msgRetryCounterCache = new NodeCache()
const { version } = await fetchLatestBaileysVersion()
let phoneNumber = global.botNumber

const methodCodeQR = process.argv.includes("qr")
const methodCode = !!phoneNumber || process.argv.includes("code")
const MethodMobile = process.argv.includes("mobile")
const colores = chalk.bgCyan.white
const opcionQR = chalk.bold.green
const opcionTexto = chalk.bold.cyan
const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (texto) => new Promise((resolver) => rl.question(texto, resolver))

let opcion
if (methodCodeQR) opcion = '1'
if (!methodCodeQR && !methodCode && !fs.existsSync(`./Mashsession/creds.json`)) {
  do {
    opcion = await question(colores(' 🦅 MURATA BOT - Select connection method:\n') + opcionQR('1. QR Code\n') + opcionTexto('2. Pairing Code (8 digits)\n--> '))
    if (!/^[1-2]$/.test(opcion)) console.log(chalk.bold.redBright(`✦ Only 1 or 2 are allowed.`))
  } while (opcion !== '1' && opcion !== '2' || fs.existsSync(`./Mashsession/creds.json`))
}

console.info = () => {}
console.debug = () => {}

const connectionOptions = {
  logger: pino({ level: 'silent' }),
  printQRInTerminal: opcion == '1' ? true : methodCodeQR ? true : false,
  mobile: MethodMobile,
  browser: opcion == '1' ? [`MURATA-BOT`, 'Edge', '20.0.04'] : methodCodeQR ? [`MURATA-BOT`, 'Edge', '20.0.04'] : ['Ubuntu', 'Edge', '110.0.1587.56'],
  auth: {
    creds: state.creds,
    keys: makeCacheableSignalKeyStore(state.keys, pino({ level: 'fatal' }).child({ level: 'fatal' })),
  },
  markOnlineOnConnect: true,
  generateHighQualityLinkPreview: true,
  getMessage: async (clave) => {
    let jid = jidNormalizedUser(clave.remoteJid)
    let msg = await store.loadMessage(jid, clave.id)
    return msg?.message || ""
  },
  msgRetryCounterCache,
  defaultQueryTimeoutMs: undefined,
  version,
  cachedGroupMetadata: async (jid) => global.groupCache?.[jid] || null,

  // ✅ منع انقطاع الاتصال
  keepAliveIntervalMs: 15000,
  connectTimeoutMs: 60000,
}

global.conn = makeWASocket(connectionOptions)

// ── Group metadata cache ──
global.groupCache = {}
conn.ev.on('groups.update', (updates) => {
  for (const update of updates) {
    if (global.groupCache[update.id]) Object.assign(global.groupCache[update.id], update)
  }
})
conn.ev.on('group-participants.update', async ({ id }) => {
  try { global.groupCache[id] = await conn.groupMetadata(id).catch(() => null) } catch {}
})

if (!fs.existsSync(`./Mashsession/creds.json`)) {
  if (opcion === '2' || methodCode) {
    opcion = '2'
    if (!conn.authState.creds.registered) {
      let addNumber
      if (!!phoneNumber) {
        addNumber = phoneNumber.replace(/[^0-9]/g, '')
      } else {
        do {
          phoneNumber = await question(chalk.bgBlack(chalk.bold.cyanBright(`\n🦅 MURATA BOT\n✦ Enter WhatsApp number with country code\n${chalk.bold.yellowBright(`Example: 201234567890`)}\n${chalk.bold.cyanBright('---> ')}`)))
          phoneNumber = phoneNumber.replace(/\D/g, '')
          if (!phoneNumber.startsWith('+')) phoneNumber = `+${phoneNumber}`
        } while (!await isValidPhoneNumber(phoneNumber))
        rl.close()
        addNumber = phoneNumber.replace(/\D/g, '')
        setTimeout(async () => {
          let codeBot = await conn.requestPairingCode(addNumber)
          codeBot = codeBot?.match(/.{1,4}/g)?.join("-") || codeBot
          console.log(chalk.bold.cyanBright(`\n╔══════════════════════════╗`))
          console.log(chalk.bold.white(`  🦅 Pairing Code: ${chalk.bgCyan.black(` ${codeBot} `)}`))
          console.log(chalk.bold.cyanBright(`╚══════════════════════════╝\n`))
        }, 3000)
      }
    }
  }
}

conn.isInit = false
conn.well = false

// ── حفظ DB كل 5 دقائق ──
if (!opts['test']) {
  if (global.db) setInterval(async () => {
    if (global.db.data) await global.db.write()
  }, 5 * 60 * 1000)
}

async function connectionUpdate(update) {
  const { connection, lastDisconnect, isNewLogin } = update
  global.stopped = connection
  if (isNewLogin) conn.isInit = true
  const code = lastDisconnect?.error?.output?.statusCode || lastDisconnect?.error?.output?.payload?.statusCode

  if (code && code !== DisconnectReason.loggedOut) {
    await global.reloadHandler(true).catch(console.error)
    global.timestamp.connect = new Date
  }

  if (global.db.data == null) loadDatabase()
  if (update.qr != 0 && update.qr != undefined || methodCodeQR) {
    if (opcion == '1' || methodCodeQR) console.log(chalk.bold.cyanBright(`\n🦅 Scan QR Code - expires in 45 seconds`))
  }
  if (connection == 'open') {
    console.log(chalk.bold.cyanBright(`
╔══════════════════════════╗
  🦅  MURATA BOT Connected ✅
╚══════════════════════════╝`))
  }
  let reason = new Boom(lastDisconnect?.error)?.output?.statusCode
  if (connection === 'close') {
    if (reason === DisconnectReason.badSession) {
      console.log(chalk.bold.redBright(`\n⚠️ Bad session - delete Mashsession folder and reconnect`))
    } else if (reason === DisconnectReason.connectionClosed) {
      console.log(chalk.bold.yellowBright(`\n⚠️ Connection closed, reconnecting...`))
      await global.reloadHandler(true).catch(console.error)
    } else if (reason === DisconnectReason.connectionLost) {
      console.log(chalk.bold.blueBright(`\n⚠️ Connection lost, reconnecting...`))
      await global.reloadHandler(true).catch(console.error)
    } else if (reason === DisconnectReason.connectionReplaced) {
      console.log(chalk.bold.yellowBright(`\n⚠️ Connection replaced - close old session first`))
    } else if (reason === DisconnectReason.loggedOut) {
      console.log(chalk.bold.redBright(`\n⚠️ Logged out - delete Mashsession folder and reconnect`))
      await global.reloadHandler(true).catch(console.error)
    } else if (reason === DisconnectReason.restartRequired) {
      console.log(chalk.bold.cyanBright(`\n✧ Connecting to server...`))
      await global.reloadHandler(true).catch(console.error)
    } else if (reason === DisconnectReason.timedOut) {
      console.log(chalk.bold.yellowBright(`\n⧖ Connection timed out, reconnecting...`))
      await global.reloadHandler(true).catch(console.error)
    } else {
      console.log(chalk.bold.redBright(`\n⚠️ Unknown disconnect: ${reason || 'Not found'}`))
    }
  }
}

process.on('uncaughtException', console.error)

// ✅ حماية من الأخطاء غير المعالجة
process.on('unhandledRejection', (reason) => {
  console.log(chalk.bold.yellowBright(`[MURATA] Unhandled Rejection: ${reason}`))
})

// ✅ Ping كل 20 ثانية لمنع انقطاع Spaceify
setInterval(() => {
  try {
    if (conn?.ws?.readyState === 1) {
      conn.ws.ping()
    } else if (conn?.ws?.readyState === 3) {
      console.log(chalk.bold.yellowBright(`[MURATA] WebSocket مغلق، جاري إعادة الاتصال...`))
      global.reloadHandler(true).catch(console.error)
    }
  } catch (e) {
    console.log(chalk.bold.red(`[MURATA] Ping error: ${e.message}`))
  }
}, 20 * 1000)

let isInit = true
let handler = await import('./handler.js')
global.reloadHandler = async function (restatConn) {
  try {
    const Handler = await import(`./handler.js?update=${Date.now()}`).catch(console.error)
    if (Object.keys(Handler || {}).length) handler = Handler
  } catch (e) { console.error(e) }

  if (restatConn) {
    const oldChats = global.conn.chats
    try { global.conn.ws.close() } catch {}
    conn.ev.removeAllListeners()
    global.conn = makeWASocket(connectionOptions, { chats: oldChats })
    isInit = true
  }

  if (!isInit) {
    conn.ev.off('messages.upsert', conn.handler)
    conn.ev.off('connection.update', conn.connectionUpdate)
    conn.ev.off('creds.update', conn.credsUpdate)
  }

  conn.handler = handler.handler.bind(global.conn)
  conn.connectionUpdate = connectionUpdate.bind(global.conn)
  conn.credsUpdate = saveCreds.bind(global.conn, true)

  conn.ev.on('messages.upsert', conn.handler)
  conn.ev.on('connection.update', conn.connectionUpdate)
  conn.ev.on('creds.update', conn.credsUpdate)
  isInit = false
  return true
}

global.rutaJadiBot = join(__dirname, './Mashjadibts')

if (global.MashJadiBots) {
  if (!existsSync(global.rutaJadiBot)) {
    mkdirSync(global.rutaJadiBot, { recursive: true })
    console.log(chalk.bold.cyan(`[MURATA] SubBots folder created`))
  } else {
    console.log(chalk.bold.cyan(`[MURATA] SubBots folder ready`))
  }
  const readRutaJadiBot = readdirSync(rutaJadiBot)
  if (readRutaJadiBot.length > 0) {
    const creds = 'creds.json'
    for (const gjbts of readRutaJadiBot) {
      const botPath = join(rutaJadiBot, gjbts)
      const readBotPath = readdirSync(botPath)
      if (readBotPath.includes(creds)) {
        mashJadiBot({ pathMashJadiBot: botPath, m: null, conn, args: '', usedPrefix: '.', command: 'serbot' })
      }
    }
  }
}

const pluginFolder = global.__dirname(join(__dirname, './plugins/index'))
const pluginFilter = (filename) => /\.js$/.test(filename)
global.plugins = {}

async function filesInit() {
  const files = readdirSync(pluginFolder).filter(pluginFilter)
  await Promise.allSettled(files.map(async (filename) => {
    try {
      const file = global.__filename(join(pluginFolder, filename))
      const module = await import(file)
      global.plugins[filename] = module.default || module
    } catch (e) {
      conn.logger.error(e)
      delete global.plugins[filename]
    }
  }))
}
filesInit().then((_) => Object.keys(global.plugins)).catch(console.error)

global.reload = async (_ev, filename) => {
  if (pluginFilter(filename)) {
    const dir = global.__filename(join(pluginFolder, filename), true)
    if (filename in global.plugins) {
      if (existsSync(dir)) conn.logger.info(` updated plugin - '${filename}'`)
      else {
        conn.logger.warn(`deleted plugin - '${filename}'`)
        return delete global.plugins[filename]
      }
    } else conn.logger.info(`new plugin - '${filename}'`)
    const err = syntaxerror(readFileSync(dir), filename, {
      sourceType: 'module',
      allowAwaitOutsideFunction: true,
    })
    if (err) conn.logger.error(`syntax error while loading '${filename}'\n${format(err)}`)
    else {
      try {
        const module = await import(`${global.__filename(dir)}?update=${Date.now()}`)
        global.plugins[filename] = module.default || module
      } catch (e) {
        conn.logger.error(`error require plugin '${filename}\n${format(e)}'`)
      } finally {
        global.plugins = Object.fromEntries(Object.entries(global.plugins).sort(([a], [b]) => a.localeCompare(b)))
      }
    }
  }
}
Object.freeze(global.reload)
watch(pluginFolder, global.reload)
await global.reloadHandler()

function clearTmp() {
  const tmpDir = join(__dirname, 'tmp')
  if (!existsSync(tmpDir)) return
  try {
    readdirSync(tmpDir).forEach(file => {
      try { unlinkSync(join(tmpDir, file)) } catch {}
    })
  } catch {}
}

function purgeMashsession() {
  try {
    readdirSync('./Mashsession')
      .filter(file => file.startsWith('pre-key-'))
      .forEach(file => {
        try { unlinkSync(`./Mashsession/${file}`) } catch {}
      })
  } catch (err) {
    console.log(chalk.bold.red(`[MURATA] Error purging session: ` + err))
  }
}

function purgeMashsessionB() {
  try {
    if (!existsSync(`./${jadi}/`)) return
    readdirSync(`./${jadi}/`).forEach(directorio => {
      const dirPath = `./${jadi}/${directorio}`
      if (statSync(dirPath).isDirectory()) {
        readdirSync(dirPath)
          .filter(f => f.startsWith('pre-key-'))
          .forEach(f => { try { unlinkSync(`${dirPath}/${f}`) } catch {} })
      }
    })
  } catch (err) {
    console.log(chalk.bold.red(`[MURATA] Error cleaning SubBot sessions: ` + err))
  }
}

setInterval(async () => {
  if (global.stopped === 'close' || !conn?.user) return
  clearTmp()
  console.log(chalk.bold.cyanBright(`[MURATA] Tmp cleaned ♻️`))
}, 30 * 60 * 1000)

setInterval(async () => {
  if (global.stopped === 'close' || !conn?.user) return
  purgeMashsession()
  console.log(chalk.bold.cyanBright(`[MURATA] Session cleaned ♻️`))
}, 30 * 60 * 1000)

setInterval(async () => {
  if (global.stopped === 'close' || !conn?.user) return
  purgeMashsessionB()
}, 30 * 60 * 1000)

async function _quickTest() {
  const test = await Promise.all([
    spawn('ffmpeg'),
    spawn('ffprobe'),
    spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-filter_complex', 'color', '-frames:v', '1', '-f', 'webp', '-']),
    spawn('convert'),
    spawn('magick'),
    spawn('gm'),
    spawn('find', ['--version']),
  ].map((p) => Promise.race([
    new Promise((resolve) => { p.on('close', (code) => resolve(code !== 127)) }),
    new Promise((resolve) => { p.on('error', (_) => resolve(false)) })
  ])))
  const [ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find] = test
  global.support = Object.freeze({ ffmpeg, ffprobe, ffmpegWebp, convert, magick, gm, find })
}

_quickTest().then(() => conn.logger.info(chalk.bold.cyanBright(`\n🦅 MURATA BOT Ready ✅\n`))).catch(console.error)

async function isValidPhoneNumber(number) {
  try {
    number = number.replace(/\s+/g, '')
    if (number.startsWith('+521')) number = number.replace('+521', '+52')
    else if (number.startsWith('+52') && number[4] === '1') number = number.replace('+52 1', '+52')
    const parsedNumber = phoneUtil.parseAndKeepRawInput(number)
    return phoneUtil.isValidNumber(parsedNumber)
  } catch { return false }
}
