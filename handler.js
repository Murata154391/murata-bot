import { generateWAMessageFromContent } from '@whiskeysockets/baileys'
import { smsg } from './lib/simple.js'
import { format } from 'util'
import { fileURLToPath } from 'url'
import path, { join } from 'path'
import { unwatchFile, watchFile } from 'fs'
import chalk from 'chalk'
import fetch from 'node-fetch'
import ws from 'ws'
import { tr, translateText } from './lib/_checkLang.js'

const baileys = await import('@whiskeysockets/baileys')
const { proto, jidNormalizedUser, areJidsSameUser } = baileys

const isNumber = (x) => typeof x === 'number' && !isNaN(x)

const delay = (ms) =>
  isNumber(ms) &&
  new Promise((resolve) =>
    setTimeout(function () {
      clearTimeout(this)
      resolve()
    }, ms)
  )

function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

function logInfo(label, msg) {
  console.log(chalk.cyan(`[${label}]`) + ' ' + chalk.white(msg))
}

function logWarn(label, msg) {
  console.log(chalk.yellow(`[${label}]`) + ' ' + chalk.white(msg))
}

function logError(label, msg) {
  console.log(chalk.red(`[${label}]`) + ' ' + chalk.white(msg))
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   GROUP METADATA CACHE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const groupMetadataCache = new Map()
const GROUP_CACHE_TTL = 5 * 60 * 1000

async function getGroupMetadata(conn, jid) {
  const now = Date.now()
  const cached = groupMetadataCache.get(jid)
  if (cached && now - cached.ts < GROUP_CACHE_TTL) return cached.data
  try {
    const data = global.cachedGroupMetadata
      ? await global.cachedGroupMetadata(jid).catch(() => null)
      : await conn.groupMetadata(jid).catch(() => null)
    if (data) groupMetadataCache.set(jid, { data, ts: now })
    return data || {}
  } catch {
    return {}
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   ANTI-SPAM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const spamMap = new Map()
const SPAM_WINDOW = 3000
const SPAM_MAX    = 5

function isSpamming(sender) {
  const now = Date.now()
  if (!spamMap.has(sender)) {
    spamMap.set(sender, { count: 1, first: now })
    return false
  }
  const entry = spamMap.get(sender)
  if (now - entry.first > SPAM_WINDOW) {
    spamMap.set(sender, { count: 1, first: now })
    return false
  }
  entry.count++
  if (entry.count > SPAM_MAX) {
    logWarn('SPAM', sender)
    return true
  }
  return false
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   USER DEFAULTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ensureUserDefaults(user, m) {
  const def     = (key, val) => { if (!(key in user) || !isNumber(user[key]) && typeof val === 'number') user[key] = val }
  const defBool = (key, val) => { if (!(key in user)) user[key] = val }
  const defStr  = (key, val) => { if (!user[key]) user[key] = val }

  def('exp', 0);            if (user.exp < 0) user.exp = 0
  def('money', 150);        if (user.money < 0) user.money = 0
  def('limit', 15);         if (user.limit < 0) user.limit = 0
  def('glimit', 15)
  def('level', 0)
  def('pointxp', 0)
  def('joincount', 1);      if (user.joincount < 0) user.joincount = 0
  def('warn', 0)
  def('afk', -1)
  def('reporte', 0)
  def('antispam', 0)
  def('antispamlastclaim', 0)
  def('spam', 0)
  def('spammer', 0)
  def('mesagge', 0)
  defBool('premium', false)
  defBool('muto', false)
  defBool('registered', false)
  defBool('registroR', false)
  defBool('registroC', false)
  defBool('warnPv', false)
  defBool('shield', false)
  defStr('role', '*NOVATO(A)* 🪤')
  defStr('job', 'Desempleo')
  defStr('lbars', '[▒▒▒▒▒▒▒▒▒]')
  defStr('packname', null)
  defStr('author', null)

  def('IDregister', 0)
  def('regTime', -1)
  def('reglast', 0)
  def('unreglast', 0)
  def('premiumDate', -1)
  def('tprem', 0)
  def('premLimit', 0)

  if (!user.registered) {
    defStr('name', m?.name || '')
    def('age', 0)
    def('descripcion', 0)
    def('genero', 0)
    def('identidad', 0)
    def('pasatiempo', 0)
    def('tiempo', 0)
    def('miestado', 0)
    def('midLanguage', 0)
  }

  def('stamina', 100)
  def('health', 100)
  def('healt', 100)
  def('mana', 0)
  def('laper', 100)
  def('haus', 100)
  def('strength', 0)
  def('agility', 0)
  def('intelligence', 0)
  def('skillexp', 0)
  def('hero', 1)
  def('herolastclaim', 0)
  def('tigame', 50)

  const resources = [
    'anggur','apel','bibitanggur','bibitapel','bibitjeruk','bibitmangga','bibitpisang',
    'emas','jeruk','kayu','makanan','mangga','pisang','semangka','stroberi',
    'aqua','arc','arcdurability','arlok','armor','armordurability','armormonster',
    'as','atm','axe','axedurability','ayam','ayamb','ayambakar','ayamg','ayamgoreng',
    'babi','babihutan','babipanggang','bandage','bank','banteng','batu','bawal',
    'bawalbakar','bayam','berlian','botol','bow','bowdurability','boxs','brick',
    'brokoli','buaya','buntal','cat','catexp','catlastfeed','centaur','centaurexp',
    'centaurlastclaim','centaurlastfeed','clay','coal','coin','common','crystal',
    'cumi','cupon','diamond','dog','dogexp','doglastfeed','dory','dragon','dragonexp',
    'dragonlastfeed','emerald','enchant','esteh','expg','exphero','eleksirb',
    'emasbatang','emasbiasa','fideos','fishingrod','fishingroddurability','fortress',
    'fox','foxexp','foxlastfeed','fullatm','gadodado','gajah','ganja','gardenboxs',
    'gems','glass','glory','gold','griffin','griffinexp','griffinlastclaim',
    'griffinlastfeed','gulai','gurita','harimau','healthmonster','healtmonster',
    'hiu','horse','horseexp','horselastfeed','ikan','ikanbakar','iron','jagung',
    'jagungbakar','joinlimit','judilast','kaleng','kambing','kangkung','kapak',
    'kardus','katana','katanadurability','kentang','kentanggoreng','kepiting',
    'kepitingbakar','kerbau','kubis','kucing','kucinglastclaim','kuda','kudalastclaim',
    'kyubi','kyubiexp','kyubilastclaim','kyubilastfeed','labu','lastadventure',
    'lastbansos','lastberbru','lastberkebon','lastbunga','lastbunuhi','lastcoins',
    'lastclaim','lastcode','lastcofre','lastcodereg','lastcrusade','lastdagang',
    'lastdiamantes','lastduel','lastdungeon','lasteasy','lastfight','lastfishing',
    'lastgift','crime','lastgojek','lastgrab','lasthourly','halloween','lasthunt',
    'lastIstigfar','lastjb','lastkill','lastlink','lastlumber','lastmancingeasy',
    'lastmancingextreme','lastmancinghard','lastmancingnormal','lastmining','lastmisi',
    'lastmonthly','lastmulung','lastnambang','lastnebang','lastngocok','lastngojek',
    'lastopen','lastpekerjaan','lastpago','lastpotionclaim','lastrampok',
    'lastramuanclaim','lastrob','lastroket','lastsda','lastseen','lastSetStatus',
    'lastsironclaim','lastsmancingclaim','laststringclaim','lastswordclaim',
    'lastturu','lastwar','lastwarpet','lastweaponclaim','lastweekly','lastwork',
    'legendary','lele','leleb','lelebakar','leleg','limitjoinfree','lion','lionexp',
    'lionlastfeed','lobster','lumba','magicwand','magicwanddurability','makanancentaur',
    'makanangriffin','makanankyubi','makanannaga','makananpet','makananphonix',
    'makananserigala','monyet','mythic','naga','nagalastclaim','net','nila','nilabakar',
    'note','ojekk','oporayam','orca','pancing','pancingan','panda','pasangan','paus',
    'pausbakar','pepesikan','pertambangan','pertanian','pet','petFood','phonix',
    'phonixexp','phonixlastclaim','phonixlastfeed','pickaxe','pickaxedurability',
    'pillhero','potion','psenjata','psepick','ramuan','ramuancentaurlast',
    'ramuangriffinlast','ramuanherolast','ramuankucinglast','ramuankudalast',
    'ramuankyubilast','ramuannagalast','ramuanphonixlast','ramuanrubahlast',
    'ramuanserigalalast','rendang','rhinoceros','rhinocerosexp','rhinoceroslastfeed',
    'robo','roboxp','rock','roket','roti','rubah','rubahlastclaim','rumahsakit',
    'sampah','sand','sapi','sapir','seedbayam','seedbrokoli','seedjagung','seedkangkung',
    'seedkentang','seedkubis','seedlabu','seedtomat','seedwortel','serigala',
    'serigalalastclaim','snlast','soda','sop','banco','spinlast','ssapi','steak',
    'stick','string','superior','suplabu','sushi','sword','sworddurability','tiketcoin',
    'tomat','trash','trofi','troopcamp','tumiskangkung','udang','udangbakar','umpan',
    'uncoommon','upgrader','vodka','wallet','weapon','weapondurability','wolf',
    'wolfexp','wolflastfeed','wood','wortel','IDregister','anakanjing','anakcentaur',
    'anakgriffin','anakkucing','anakkuda','anakkyubi','anaknaga','anakpancingan',
    'anakphonix','anakrubah','anakserigala','anjing','anjinglastclaim','korbanngocok',
    'kerjadelapan','kerjadelapanbelas','kerjadua','kerjaduabelas','kerjaduadelapan',
    'kerjaduadua','kerjaduaempat','kerjaduaenam','kerjadualima','kerjaduapuluh',
    'kerjaduasatu','kerjaduasembilan','kerjaduatiga','kerjaduatujuh','kerjaempat',
    'kerjaempatbelas','kerjaenam','kerjaenambelas','kerjalima','kerjalimabelas',
    'kerjasatu','kerjasebelas','kerjasembilan','kerjasembilanbelas','kerjasepuluh',
    'kerjatiga','kerjatigabelas','kerjatigapuluh','kerjatujuh','kerjatujuhbelas',
    'fantasy_character','fantasy_character2','fantasy_character3','fantasy_character4',
    'fantasy_character5','juegos','halloween','lastbansos','lastcodereg','lastIstigfar',
    'lastgift','crime','lastpago','lastramuanclaim','lastsda','snlast','lastwarpet',
    'banco','mensaje','ojekk','oporayam','pancing',
    'totalCommands','totalWins','totalLosses','totalGames','dailyBonus','weekStreak'
  ]

  for (const key of resources) {
    if (!isNumber(user[key])) user[key] = 0
  }

  if (!Array.isArray(user.fantasy)) user.fantasy = []
  if (user.berlian < 10 && !isNumber(user.berlian)) user.berlian = 10
  if (user.diamond < 3  && !isNumber(user.diamond))  user.diamond  = 3
  if (!isNumber(user.pancingan)) user.pancingan = 1
  if (!user.lastDailyStreak) user.lastDailyStreak = 0
  if (!isNumber(user.streak)) user.streak = 0

  return user
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   CHAT DEFAULTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ensureChatDefaults(chat) {
  const def = (key, val) => { if (!(key in chat)) chat[key] = val }
  def('isBanned', false); def('welcome', true); def('detect', false)
  def('sWelcome', ''); def('sBye', ''); def('sPromote', ''); def('sDemote', '')
  def('sCondition', ''); def('sAutorespond', ''); def('delete', false)
  def('modohorny', true); def('stickers', false); def('autosticker', false)
  def('audios', true); def('antiver', false); def('antiPorn', true)
  def('antiLink', false); def('antiLink2', false); def('antiTiktok', false)
  def('antiYoutube', false); def('antiTelegram', false); def('antiFacebook', false)
  def('antiInstagram', false); def('antiTwitter', false); def('antiDiscord', false)
  def('antiThreads', false); def('antiTwitch', false); def('antifake', false)
  def('reaction', true); def('viewonce', false); def('modoadmin', false)
  def('autorespond', true); def('antitoxic', true); def('game', true)
  def('game2', true); def('simi', false); def('antiTraba', true)
  def('primaryBot', null); def('autolevelup', false); def('expired', 0)
  def('horarioNsfw', { inicio: '00:00', fin: '23:59' })
  def('slowMode', false); def('slowModeDelay', 5000); def('muteAll', false)
  def('onlyAdmins', false); def('antiFlood', true); def('greetingSticker', false)
  return chat
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   SETTINGS DEFAULTS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
function ensureSettingsDefaults(settings, opts) {
  const def = (key, val) => { if (!(key in settings)) settings[key] = val }
  def('self', false); def('autoread', false); def('autoread2', false)
  def('restrict', false); def('temporal', false); def('anticommand', false)
  def('antiPrivate', false); def('antiCall', true); def('antiSpam', true)
  def('modoia', false); def('jadibotmd', true)
  def('prefix', opts['prefix'] || '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®&.\\-.@')
  def('logCommands', true); def('autoReact', true); def('broadcastNews', false)
  return settings
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   MAIN HANDLER
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export async function handler(chatUpdate) {
  this.msgqueque = this.msgqueque || []
  this.uptime    = this.uptime    || Date.now()

  if (!chatUpdate?.messages) return
  this.pushMessage(chatUpdate.messages).catch(console.error)

  let m = chatUpdate.messages[chatUpdate.messages.length - 1]
  if (!m) return

  if (global.db.data == null) await global.loadDatabase()

  try {
    m = smsg(this, m) || m
    if (!m) return

    if (!m.text) {
      const ir = m.message?.interactiveResponseMessage
      if (ir) {
        try {
          const params = JSON.parse(ir.nativeFlowResponseMessage?.paramsJson || '{}')
          m.text = params.id || ir.nativeFlowResponseMessage?.name || ''
        } catch {}
      }
      const lr = m.message?.listResponseMessage
      if (lr) m.text = lr.singleSelectReply?.selectedRowId || ''
      const br = m.message?.buttonsResponseMessage
      if (br) m.text = br.selectedButtonId || ''
      const tr2 = m.message?.templateButtonReplyMessage
      if (tr2) m.text = tr2.selectedId || ''
      const pu = m.message?.pollUpdateMessage
      if (pu) {
        try {
          const votes = pu?.vote?.selectedOptions || []
          if (votes.length) m.text = votes[0] || ''
        } catch {}
      }
    }

    m.exp   = 0
    m.limit = false
    m.money = false

    try {
      if (typeof global.db.data.users[m.sender] !== 'object') global.db.data.users[m.sender] = {}
      ensureUserDefaults(global.db.data.users[m.sender], m)

      let akinator = global.db.data.users[m.sender].akinator
      if (typeof akinator !== 'object') {
        global.db.data.users[m.sender].akinator = {
          sesi: false, server: null, frontaddr: null,
          session: null, signature: null, question: null,
          progression: null, step: null, soal: null
        }
      } else {
        const ak = global.db.data.users[m.sender].akinator
        if (!('sesi'        in ak)) ak.sesi        = false
        if (!('server'      in ak)) ak.server      = null
        if (!('frontaddr'   in ak)) ak.frontaddr   = null
        if (!('session'     in ak)) ak.session     = null
        if (!('signature'   in ak)) ak.signature   = null
        if (!('question'    in ak)) ak.question    = null
        if (!('progression' in ak)) ak.progression = null
        if (!('step'        in ak)) ak.step        = null
        if (!('soal'        in ak)) ak.soal        = null
      }

      if (typeof global.db.data.chats[m.chat] !== 'object') global.db.data.chats[m.chat] = {}
      ensureChatDefaults(global.db.data.chats[m.chat])

      if (typeof global.db.data.settings[this.user.jid] !== 'object') global.db.data.settings[this.user.jid] = {}
      ensureSettingsDefaults(global.db.data.settings[this.user.jid], opts)
    } catch (e) {
      console.error(chalk.red('[DB-INIT ERROR]'), e)
    }

    const settings      = global.db.data.settings[this.user.jid]
    const defaultPrefix = '*/i!#$%+£¢€¥^°=¶∆×÷π√✓©®&.\\-.@'
    let prefix

    if (settings.prefix) {
      if (settings.prefix.includes(',')) {
        const prefixes = settings.prefix.split(',').map((p) => p.trim())
        prefix = new RegExp('^(' + prefixes.map((p) => p.replace(/[|\\{}()[\]^$+*.\-\^]/g, '\\$&')).join('|') + ')')
      } else if (settings.prefix === defaultPrefix) {
        prefix = new RegExp('^[' + settings.prefix.replace(/[|\\{}()[\]^$+*.\-\^]/g, '\\$&') + ']')
      } else {
        prefix = new RegExp('^' + settings.prefix.replace(/[|\\{}()[\]^$+*.\-\^]/g, '\\$&'))
      }
    } else {
      prefix = new RegExp('')
    }

    const detectwhat = m.sender.includes('@lid') ? '@lid' : '@s.whatsapp.net'
    const isROwner   = [...global.owner.map((n) => n)]
      .map((v) => v.replace(/[^0-9]/g, '') + detectwhat)
      .includes(m.sender)
    const isOwner    = isROwner || m.fromMe
    const isMods     = isOwner || global.mods
      .map((v) => v.replace(/[^0-9]/g, '') + detectwhat)
      .includes(m.sender)
    const isPrems    = isROwner || global.db.data.users[m.sender].premiumTime > 0

    if (opts['queque'] && m.text && !(isMods || isPrems)) {
      let queque = this.msgqueque
      const time = 1000 * 5
      const previousID = queque[queque.length - 1]
      queque.push(m.id || m.key.id)
      setInterval(async function () {
        if (queque.indexOf(previousID) === -1) clearInterval(this)
        await delay(time)
      }, time)
    }

    const blockedPrefixes = ['EVO', 'Lyru-', 'EvoGlobalBot-', 'B24E', 'FizzxyTheGreat-']
    const isBlockedId =
      blockedPrefixes.some((p) => m.id.startsWith(p)) ||
      (m.id.startsWith('BAE5') && m.id.length === 16) ||
      (m.id.startsWith('8SCO') && m.id.length === 20)
    if (isBlockedId) return

    if (opts['nyimak'])                                    return
    if (!isROwner && opts['self'])                         return
    if (opts['pconly'] && m.chat.endsWith('g.us'))         return
    if (opts['gconly'] && !m.chat.endsWith('g.us'))        return
    if (opts['swonly'] && m.chat !== 'status@broadcast')   return
    if (typeof m.text !== 'string') m.text = ''

    m.exp += Math.ceil(Math.random() * 10)

    let usedPrefix
    const _user = global.db.data?.users?.[m.sender]

    const groupMetadata = m.isGroup ? await getGroupMetadata(this, m.chat) : {}
    const participants  = Array.isArray(groupMetadata?.participants) ? groupMetadata.participants : []

    const decode  = (j) => this.decodeJid(j)
    const norm    = (j) => jidNormalizedUser(decode(j))
    const numOnly = (j) => String(decode(j)).split('@')[0].replace(/[^0-9]/g, '')

    const meIdRaw  = this.user?.id || this.user?.jid
    const meLidRaw = (this.user?.lid || conn?.user?.lid || '').toString().replace(/:.*/, '') || null
    const botNum   = numOnly(meIdRaw)

    const botCandidates = [
      decode(meIdRaw), jidNormalizedUser(decode(meIdRaw)), botNum,
      meLidRaw && `${meLidRaw}@lid`,
      meLidRaw && jidNormalizedUser(`${meLidRaw}@lid`),
      meLidRaw && `${meLidRaw}@s.whatsapp.net`
    ].filter(Boolean)

    const senderCandidates = [
      decode(m.sender), jidNormalizedUser(decode(m.sender)), numOnly(m.sender)
    ]

    const participantsMap = {}
    for (const p of participants) {
      const raw = p.jid || p.id
      const dj  = decode(raw)
      const nj  = jidNormalizedUser(dj)
      const no  = numOnly(dj)
      participantsMap[dj] = p
      participantsMap[nj] = p
      participantsMap[no] = p
    }

    const pick = (cands) => {
      for (const k of cands) if (participantsMap[k]) return participantsMap[k]
      return participants.find((p) =>
        cands.some((c) => areJidsSameUser(norm(p.jid || p.id), jidNormalizedUser(decode(c))))
      ) || null
    }

    const user       = m.isGroup ? pick(senderCandidates) || {} : {}
    const bot        = m.isGroup ? pick(botCandidates)    || {} : {}
    const isRAdmin   = user?.admin === 'superadmin'
    const isAdmin    = isRAdmin || user?.admin === 'admin' || user?.admin === true
    const isBotAdmin = bot?.admin === 'admin' || bot?.admin === 'superadmin' || bot?.admin === true

    m.isWABusiness = global.conn.authState?.creds?.platform === 'smba' || global.conn.authState?.creds?.platform === 'smbi'
    m.isChannel    = m.chat.includes('@newsletter') || m.sender.includes('@newsletter')

    const chatData = global.db.data.chats[m.chat] || {}
    if (m.isGroup && chatData.slowMode && !isAdmin && !isOwner) {
      const key      = `slow_${m.chat}_${m.sender}`
      const lastTime = global._slowCache?.get(key) || 0
      const delay2   = chatData.slowModeDelay || 5000
      if (Date.now() - lastTime < delay2) return
      if (!global._slowCache) global._slowCache = new Map()
      global._slowCache.set(key, Date.now())
    }

    const dbUser = global.db.data.users[m.sender] || {}
    const dbChat = global.db.data.chats[m.chat]   || {}

    if (!isROwner && dbChat.isBanned) return
    if (m.text && dbUser.banned && !isROwner) {
      if (dbUser.antispam > 2) return
      m.reply(
        `🚫 *مـحـظـور - لا يمكنك استخدام الأوامر*\n` +
        `📑 *السبب: ${dbUser.messageSpam === 0 ? 'غير محدد' : dbUser.messageSpam}*\n` +
        `⚠️ \`\`\`للاعتراض تواصل مع المالك:\`\`\`👉 *${global.nomorown}@s.whatsapp.net*`
      )
      dbUser.antispam++
      return
    }

    if (!isOwner && isSpamming(m.sender)) {
      logWarn('ANTI-SPAM', `blocked: ${m.sender}`)
      return
    }

    const ___dirname = path.join(path.dirname(fileURLToPath(import.meta.url)), './plugins')

    for (const name in global.plugins) {
      const plugin = global.plugins[name]
      if (!plugin || plugin.disabled) continue

      const __filename = join(___dirname, name)

      if (typeof plugin.all === 'function') {
        try {
          await plugin.all.call(this, m, { chatUpdate, __dirname: ___dirname, __filename })
        } catch (e) {
          console.error(chalk.red(`[PLUGIN.ALL ERROR] ${name}`), e)
          for (const [jid] of global.owner.filter((number, _, isDeveloper) => isDeveloper && number)) {
            const data = (await conn.onWhatsApp(jid))[0] || {}
            if (data.exists)
              m.reply(
                `${lenguajeGB['smsCont1']()}\n\n${lenguajeGB['smsCont2']()}\n*_${name}_*\n\n` +
                `${lenguajeGB['smsCont3']()}\n*_${m.sender}_*\n\n${lenguajeGB['smsCont4']()}\n*_${m.text}_*\n\n` +
                `${lenguajeGB['smsCont5']()}\n\`\`\`${format(e)}\`\`\`\n\n${lenguajeGB['smsCont6']()}`.trim(),
                data.jid
              )
          }
        }
      }

      if (!opts['restrict'] && plugin.tags?.includes('admin')) continue

      const str2Regex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&')
      const _prefix   = plugin.customPrefix || this.prefix || prefix

      const matchCandidates =
        _prefix instanceof RegExp ? [[_prefix.exec(m.text), _prefix]]
        : Array.isArray(_prefix) ? _prefix.map((p) => { const re = p instanceof RegExp ? p : new RegExp(str2Regex(p)); return [re.exec(m.text), re] })
        : typeof _prefix === 'string' ? [[new RegExp(str2Regex(_prefix)).exec(m.text), new RegExp(str2Regex(_prefix))]]
        : [[null, null]]

      const match = matchCandidates.find((p) => p[0])

      if (typeof plugin.before === 'function') {
        const shouldSkip = await plugin.before.call(this, m, {
          match, conn: this, participants, groupMetadata,
          user, bot, isROwner, isOwner, isRAdmin, isAdmin,
          isBotAdmin, isPrems, chatUpdate, __dirname: ___dirname, __filename
        })
        if (shouldSkip) continue
      }

      if (typeof plugin !== 'function') continue
      if (!match) continue

      usedPrefix = (match[0] || [])[0] || ''
      const noPrefix = m.text.slice(usedPrefix.length)
      let [command, ...args] = noPrefix.trim().split(/\s+/).filter(Boolean)
      args         = args || []
      const _args  = noPrefix.trim().split(/\s+/).slice(1)
      const text   = _args.join(' ')
      command      = (command || '').toLowerCase()
      const fail   = plugin.fail || global.dfail

      const isAccept =
        plugin.command instanceof RegExp ? plugin.command.test(command)
        : Array.isArray(plugin.command) ? plugin.command.some((cmd) => cmd instanceof RegExp ? cmd.test(command) : cmd === command)
        : typeof plugin.command === 'string' ? plugin.command === command
        : false

      if (!isAccept) continue

      m.plugin = name

      if (m.chat in global.db.data.chats || m.sender in global.db.data.users) {
        const chatDB      = global.db.data.chats[m.chat]
        const exemptFiles = ['owner-unbanchat.js', 'owner-exec.js', 'owner-exec2.js', 'tool-delete.js']
        if (!exemptFiles.includes(name) && chatDB?.isBanned && !isROwner) return
      }

      const adminMode = global.db.data.chats[m.chat]?.modoadmin
      if (adminMode && !isOwner && !isROwner && m.isGroup && !isAdmin) continue

      if (plugin.rowner && plugin.owner && !(isROwner || isOwner)) { fail('owner',    m, this); continue }
      if (plugin.rowner && !isROwner)                               { fail('rowner',   m, this); continue }
      if (plugin.owner  && !isOwner)                                { fail('owner',    m, this); continue }
      if (plugin.mods   && !isMods)                                 { fail('mods',     m, this); continue }
      if (plugin.premium && !isPrems)                               { fail('premium',  m, this); continue }
      if (plugin.group  && !m.isGroup)                              { fail('group',    m, this); continue }
      if (plugin.botAdmin && !isBotAdmin)                           { fail('botAdmin', m, this); continue }
      if (plugin.admin  && !isAdmin)                                { fail('admin',    m, this); continue }
      if (plugin.private && m.isGroup)                              { fail('private',  m, this); continue }
      if (plugin.register && _user?.registered === false)           { fail('unreg',    m, this); continue }

      m.isCommand = true

      const xp = 'exp' in plugin ? parseInt(plugin.exp) : 10
      if (xp > 2000) { m.reply('Exp limit'); continue }

      if (!isPrems && plugin.money && global.db.data.users[m.sender].money < plugin.money * 1) {
        this.sendMessage(m.chat, { text: '🦅 MURATA BOT', contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, description: null, title: gt, body: '🦅 MURATA BOT', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb } } }, { quoted: m })
        continue
      }

      m.exp += xp

      if (!isPrems && plugin.limit && global.db.data.users[m.sender].limit < plugin.limit * 1) {
        this.sendMessage(m.chat, { text: `${lenguajeGB['smsCont7']()} *${usedPrefix}buy*`, contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, description: null, title: gt, body: '🦅 MURATA BOT', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb } } }, { quoted: m })
        continue
      }

      if (plugin.level > _user?.level) {
        this.sendMessage(m.chat, { text: `${lenguajeGB['smsCont9']()} *${plugin.level}* ${lenguajeGB['smsCont10']()} *${_user?.level}* ${lenguajeGB['smsCont11']()} *${usedPrefix}nivel*`, contextInfo: { externalAdReply: { mediaUrl: null, mediaType: 1, description: null, title: gt, body: '🦅 MURATA BOT', previewType: 0, thumbnail: gataImg, sourceUrl: accountsgb } } }, { quoted: m })
        continue
      }

      const extra = {
        match, usedPrefix, noPrefix, _args, args,
        command, text, conn: this, participants,
        groupMetadata, user, bot, isROwner, isOwner,
        isRAdmin, isAdmin, isBotAdmin, isPrems,
        chatUpdate, __dirname: ___dirname, __filename
      }

      if (settings.logCommands) logInfo('CMD', `${m.sender} » ${command}`)

      const uData = global.db.data.users[m.sender]
      if (uData) uData.totalCommands = (uData.totalCommands || 0) + 1

      try {
        await plugin.call(this, m, extra)
        if (!isPrems) m.limit = m.limit || plugin.limit || false
        m.money = m.money || plugin.money || false
      } catch (e) {
        m.error = e
        console.error(chalk.red(`[PLUGIN ERROR] ${name}`), e)
        if (e) {
          let errText = format(e) || 'Error desconocido'
          for (const api in global.APIs) {
            const key = global.APIs[api].key
            if (key) errText = errText.replace(new RegExp(key, 'g'), 'Admin')
          }
          if (e.name) {
            for (const [jid] of global.owner.filter((number, _, isDev) => isDev && number)) {
              const data = (await conn.onWhatsApp(jid))[0] || {}
              if (data.exists)
                m.reply(
                  `${lenguajeGB['smsCont1']()}\n\n${lenguajeGB['smsCont2']()}\n*_${name}_*\n\n` +
                  `${lenguajeGB['smsCont3']()}\n*_${m.sender}_*\n\n${lenguajeGB['smsCont4']()}\n*_${m.text}_*\n\n` +
                  `${lenguajeGB['smsCont5']()}\n\`\`\`${format(e)}\`\`\`\n\n${lenguajeGB['smsCont6']()}`.trim(),
                  data.jid
                )
            }
          }
          m.reply(errText)
        }
      } finally {
        if (typeof plugin.after === 'function') {
          try {
            await plugin.after.call(this, m, extra)
          } catch (e) {
            console.error(chalk.red(`[PLUGIN.AFTER ERROR] ${name}`), e)
          }
        }
        if (m.limit) m.reply(+m.limit + lenguajeGB.smsCont8())
      }

      if (m.money) m.reply(+m.money + ' 🦅 MURATA BOT')
      break
    }

  } catch (e) {
    console.error(chalk.red('[HANDLER ERROR]'), e)
  } finally {
    if (opts['queque'] && m.text) {
      const idx = this.msgqueque.indexOf(m.id || m.key.id)
      if (idx !== -1) this.msgqueque.splice(idx, 1)
    }

    const stats = global.db.data.stats

    if (m) {
      const utente = global.db.data.users[m.sender]

      if (utente?.muto === true) {
        await conn.sendMessage(m.chat, {
          delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant }
        })
      }

      if (m.sender && utente) {
        utente.exp   += m.exp
        utente.limit -= m.limit * 1
        utente.money -= m.money * 1

        if (m.plugin) {
          const now = Date.now()
          if (m.plugin in stats) {
            const stat = stats[m.plugin]
            if (!isNumber(stat.total))       stat.total       = 1
            if (!isNumber(stat.success))     stat.success     = m.error != null ? 0 : 1
            if (!isNumber(stat.last))        stat.last        = now
            if (!isNumber(stat.lastSuccess)) stat.lastSuccess = m.error != null ? 0 : now
            stat.total += 1
            stat.last   = now
            if (m.error == null) { stat.success++; stat.lastSuccess = now }
          } else {
            stats[m.plugin] = {
              total: 1, success: m.error != null ? 0 : 1,
              last: now, lastSuccess: m.error != null ? 0 : now
            }
          }
        }
      }
    }

    try {
      if (!opts['noprint'])
        await (await import('./lib/print.js')).default(m, this)
    } catch (e) {
      console.log(m, m.quoted, e)
    }

    const settingsREAD = global.db.data.settings[this.user.jid] || {}
    if (opts['autoread'])        await this.readMessages([m.key])
    if (settingsREAD.autoread2)  await this.readMessages([m.key])

    const chatReact = global.db.data.chats[m.chat]
    if (chatReact?.reaction && m.text && m.text.match(/(ción|dad|aje|oso|izar|mente|البوت|tion|age|بوتات|ate|and|بوت|ify)/gi)) {
      const emojis = [
        '😀','😃','😄','😁','😆','🥹','😅','😂','🤣','🥲','☺️','😊','😇',
        '🙂','🙃','😉','😌','😍','🥰','😘','😗','😙','😚','😋','😛','😝',
        '😜','🤪','🤨','🧐','🤓','😎','🥸','🤩','🥳','😏','😒','😞','😔',
        '😟','😕','🙁','☹️','😣','😖','😫','😩','🥺','😢','😭','😤','😠',
        '😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗','🤔',
        '🫣','🤭','🫢','🫡','🤫','🫠','🤥','😶','🫥','😐','🫤','😑','🫨',
        '😬','🙄','😯','😦','😧','😮','😲','🥱','😴','🤤','😪','😵','😵‍💫',
        '🤐','🥴','🤢','🤮','🤧','😷','🤒','🤕','🤑','🤠','😈','👿','👺',
        '🤡','💩','👻','😺','😸','😹','😻','😼','😽','🙀','😿','😾','🫶',
        '👍','✌️','🙏','🫵','🤏','🤌','☝️','🫦','🫂','🐱','🤹‍♀️','🤹‍♂️',
        '🗿','✨','🦅','🔥','🌈','🩷','❤️','🧡','💛','💚','🩵','💙','💜',
        '🖤','🩶','🤍','🤎','💔','❤️‍🔥','❤️‍🩹','❣️','💕','💞','💓','💗',
        '💖','💘','💝','🏳️‍🌈','👊','👀','💋','🫰','💅','👑','🐣','🐤','🐈'
      ]
      if (!m.fromMe) this.sendMessage(m.chat, { react: { text: pickRandom(emojis), key: m.key } })
    }
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   PARTICIPANTS UPDATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export async function participantsUpdate({ id, participants, action }) {
  if (opts['self'])    return
  if (this.isInit)     return
  if (global.db.data == null) await loadDatabase()

  const chat = global.db.data.chats[id] || {}
  let text    = ''

  switch (action) {
    case 'add':
    case 'remove':
      if (!chat.welcome) break
      const groupMetadata = (await this.groupMetadata(id)) || {}

      for (const user of participants) {
        let pp = global.gataImg
        try { pp = await this.profilePictureUrl(user, 'image') } catch {}

        const apii         = await this.getFile(pp)
        const botInGroup   = groupMetadata.participants?.find((u) => this.decodeJid(u.id) === this.user.jid) || {}
        const isBotAdminNn = botInGroup?.admin === 'admin'

        text = (
          action === 'add'
            ? (chat.sWelcome || this.welcome || conn.welcome || 'Welcome, @user!')
                .replace('@subject', await this.getName(id))
                .replace('@desc', groupMetadata.desc?.toString() || '🦅 MURATA BOT')
            : (chat.sBye || this.bye || conn.bye || 'Bye, @user!')
        ).replace('@user', '@' + user.split('@')[0])

        if (chat.antifake && isBotAdminNn && action === 'add') {
          const defaultPrefixes = [2, 4, 6, 7, 8, 9]
          const prefixes =
            (Array.isArray(chat.sCondition) && chat.sCondition.length > 0) || chat.sCondition !== ''
              ? chat.sCondition : defaultPrefixes
          const startsWithPrefix = prefixes.some((p) => user.startsWith(`+${p}`))
          if (startsWithPrefix)
            await conn.sendMessage(id, { text: mid.mAdvertencia + mid.mFake2(user), mentions: [user] })
        }

        const fkontak2 = {
          key: { participants: '0@s.whatsapp.net', remoteJid: 'status@broadcast', fromMe: false, id: 'Halo' },
          message: {
            contactMessage: {
              vcard: `BEGIN:VCARD\nVERSION:3.0\nN:Sy;Bot;;;\nFN:y\nitem1.TEL;waid=${user.split('@')[0]}:${user.split('@')[0]}\nitem1.X-ABLabel:Ponsel\nEND:VCARD`
            }
          },
          participant: '0@s.whatsapp.net'
        }

        this.sendMessage(id, {
          text,
          contextInfo: {
            forwardingScore: 9999999, isForwarded: true, mentionedJid: [user],
            externalAdReply: {
              showAdAttribution: true, renderLargerThumbnail: true,
              thumbnail: apii.data,
              title: [wm, '💠 ' + gt + ' ', '🦅 MURATA BOT'].getRandom(),
              containsAutoReply: true, mediaType: 1,
              sourceUrl: 'https://wa.me/201030943917'
            }
          }
        }, { quoted: fkontak2 })

        apii.data = ''
      }
      break

    case 'promote':
    case 'daradmin':
    case 'darpoder':
      text = (chat.sPromote || this.spromote || conn.spromote || '@user ```is now Admin```')
        .replace('@user', '@' + participants[0].split('@')[0])
      break

    case 'demote':
    case 'quitarpoder':
    case 'quitaradmin':
      text = (chat.sDemote || this.sdemote || conn.sdemote || '@user ```is no longer Admin```')
        .replace('@user', '@' + participants[0].split('@')[0])
      if (!chat.detect) break
      break
  }

  if (text) await this.sendMessage(id, { text, mentions: this.parseMention(text) })
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   GROUPS UPDATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export async function groupsUpdate(groupsUpdate) {
  for (const groupUpdate of groupsUpdate) {
    const id = groupUpdate.id
    if (!id) continue
    const chats = global.db.data?.chats?.[id]
    if (!chats?.detect) continue
    const text = ''
    if (!text) continue
    await this.sendMessage(id, { text, mentions: this.parseMention(text) })
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   CALL UPDATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export async function callUpdate(callUpdate) {
  const isAnticall = global.db.data.settings[this.user.jid]?.antiCall
  if (!isAnticall) return

  for (const nk of callUpdate) {
    if (!nk.isGroup && nk.status === 'offer') {
      logWarn('CALL', `blocked call from ${nk.from}`)
      await this.reply(
        nk.from,
        `${lenguajeGB['smsCont15']()} *@${nk.from.split('@')[0]}*, ` +
        `${nk.isVideo ? lenguajeGB.smsCont16() : lenguajeGB.smsCont17()} ` +
        `${lenguajeGB['smsCont18']()}`,
        false,
        { mentions: [nk.from] }
      )
      await this.updateBlockStatus(nk.from, 'block')
    }
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   DELETE UPDATE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
export async function deleteUpdate(message) {
  try {
    const { fromMe, id, participant, remoteJid } = message
    if (fromMe) return

    const msg  = this.serializeM(this.loadMessage(id))
    const chat = global.db.data.chats[msg?.chat] || {}

    if (!chat?.delete || !msg) return

    const isGroup   = remoteJid.endsWith('@g.us')
    const isPrivate = !isGroup && remoteJid.endsWith('@s.whatsapp.net')
    if (!isGroup && !isPrivate) return

    const antideleteMessage =
      `*╭━━⬣ ${lenguajeGB['smsCont19']()} ⬣━━ 𓃠*\n` +
      `${lenguajeGB['smsCont20']()} @${participant.split('@')[0]}\n` +
      `${lenguajeGB['smsCont21']()}\n` +
      `*╰━━━⬣ ${lenguajeGB['smsCont19']()} ⬣━━╯*`

    await this.sendMessage(
      msg.chat,
      { text: antideleteMessage.trim(), mentions: [participant] },
      { quoted: msg }
    )
    this.copyNForward(msg.chat, msg).catch((e) => console.log(e, msg))
  } catch (e) {
    console.error(chalk.red('[DELETE-UPDATE ERROR]'), e)
  }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//   DFAIL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
global.dfail = (type, m, conn) => {
  const border = '*〄━═─━━⌬《•🌗•》⌬━━─═━〄*'
  const line   = '  ┊ׁ۪❈ֺ۪┊ִׁ✧'

  const messages = {
    rowner:   `${border}\n${line} هذا الأمـر مخصص لـلمـطـور الـرئـيـسـي فقط ✧\n${border}`,
    owner:    `${border}\n${line} هـذا الأمـر مخصص لـلمـالـك فقط ✧\n${border}`,
    mods:     `${border}\n${line} هـذا الأمـر مخصص لـلمـشـرفـيـن فقط ✧\n${border}`,
    premium:  `${border}\n${line} هـذا الأمـر مخصص لأعضاء ❪VIP❫ فقط ✧\n${border}`,
    group:    `${border}\n${line} هـذا الأمـر يعمل في المجـمـو؏ـات فقط ✧\n${border}`,
    private:  `${border}\n${line} هـذا الأمـر يعمل في الخاص فقط ✧\n${border}`,
    admin:    `${border}\n${line} هـذا الأمـر مخصص لمشرفي المجموعـة ✧\n${border}`,
    botAdmin: `${border}\n${line} يجب أن يكون البوت أدمن لتفعيل هذا الأمر ✧\n${border}`,
    unreg:
      `${border}\n` +
      `  ┊ׁ⇇ يجب أن تكون مسجل لاستخدام هذا الأمر\n` +
      `  ┊•⪼ استخدم الأمر: .تسجيل اسمك.عمرك\n` +
      `  ┊•⪼ مثال: .تسجيل MURATA.19\n${border}`,
    restrict: `${border}\n${line} هـذا الأمـر مغلق من طرف المطور ✧\n*〄━═─━━⌬《🌗》⌬━━─═━〄*`
  }

  const msg = messages[type]
  if (!msg) return

  return conn.reply(m.chat, msg, m, {
    contextInfo: {
      externalAdReply: {
        title:       '📖 ' + (global.saludo || '') + ' ' + (global.nombre || ''),
        body:         global.dev     || '',
        sourceUrl:    global.channel || '',
        thumbnailUrl: typeof random1 === 'function' ? random1() : ''
      }
    }
  })
}
