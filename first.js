 "use strict";
 const proces = require('process') 
 proces.on('uncaughtException', console.error)
 
 const { 
 default: 
   makeWASocket,
   useSingleFileAuthState,
   DisconnectReason,
   fetchLatestBaileysVersion,
   makeInMemoryStore,
   jidDecode
 } = require('@adiwajshing/baileys');
 
 const PhoneNumber = require('awesome-phonenumber')
 const { Boom } = require('@hapi/boom')   
 const fs = require('fs')      
 const pino = require ('pino'); 
 const CFonts = require('cfonts');
 const Options = require('./FunctionMD/settings/options.js')
 const { info } = Options
 const { color, bgcolor, ConsoleLog, getBuffer } = require('./FunctionMD/function.js')
 const { state, saveState } = useSingleFileAuthState('./auth_info_multi.json');    
 const { groupResponse } = require('./FunctionMD/response/group.js')
 const { move } = require('./FunctionMD/base/mybase')
 const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
 

 
 try{
 async function connectToWhatsApp () {
 
 setTimeout( () => {

 CFonts.say(info.botName, {
	font: 'chrome',
	align: 'center',
	colors: ['black'],
	background: 'blackBright',
	letterSpacing: 1,
	space: true,
 });
 CFonts.say(info.ownerName, {
	font: 'console',
	align: 'center',
	colors: ['white'],
	background: 'transparent',
	letterSpacing: 1,
	space: true,
 });
 }, 5000)
      
 const { version } = await fetchLatestBaileysVersion()  
 const sock = makeWASocket({ 
   logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        browser: ['TOXIC BOT', 'Aloha', '5.4'],
        auth: state,
        version
 })
 
 store.bind(sock.ev) 
 sock.decodeJid = (jid) => {
    if (!jid) return jid
    if (/:\d+@/gi.test(jid)) {
        let decode = jidDecode(jid) || {}
          return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }
    
    
   sock.sendContact = (jid, numbers, name, quoted, mbuh) => {
	 let number = numbers.replace(/[^0-9]/g, '')
     const vcard = 'BEGIN:VCARD\n' 
     + 'VERSION:3.0\n' 
     + 'FN:' + name + '\n'
	 + 'ORG:;\n'
	 + 'TEL;type=CELL;type=VOICE;waid=' + number + ':+' + number + '\n'
	 + 'END:VCARD'
  	 return sock.sendMessage(jid, { contacts: { displayName: name, contacts: [{ vcard }] }, mentions : mbuh ? mbuh : []},{ quoted: quoted })
   }
    
 sock.ev.on('connection.update', async (update) => {
      const { connection, lastDisconnect } = update

      if (connection === 'connecting'){
             console.log('[ INF ]', update) 
             }                         	             
       if (connection === 'close') {
         let messageconnect = new Boom(lastDisconnect?.error)?.output.statusCode
            if (messageconnect === DisconnectReason.badSession) { 
               console.log(`Sorry, it looks like the session file is disabled. Please re-scan🙏`)      
               sock.logout();         
              } else if (messageconnect === DisconnectReason.connectionClosed) { 
               console.log("Connection lost, trying to reconnect🔄"); 
               connectToWhatsApp(); 
              } else if (messageconnect === DisconnectReason.connectionReplaced) { 
               console.log("Another connection is replaced, please close this connection first");    
               sock.logout();           
              } else if (messageconnect === DisconnectReason.restartRequired) { 
               console.log("An error occurred, reconnecting🔄"); 
               connectToWhatsApp();
              } else if (messageconnect === DisconnectReason.connectionLost) { 
               console.log("Connection lost from the web, trying to reconnect🔄"); 
               connectToWhatsApp();               
              } else if (messageconnect === DisconnectReason.loggedOut) { 
              console.log(`Device is out, please re-scan🔄`);    
              sock.logout();               
              } else if (messageconnect === DisconnectReason.timedOut) { 
               console.log("Connection reached the limit, please reload🔄"); 
               connectToWhatsApp(); 
             } else sock.end(`Reason : ${messageconnect}|${connection}`)
           }                         
        })    
        
 sock.ev.on('creds.update', saveState);  
 
 store.bind(sock.ev)  
 
  sock.ev.on('messages.upsert', async ({ messages }) => {
  
    const m = messages[0];        
    const from = m.key.remoteJid

    await move(sock, m, store)
    require('./FunctionMD/message/Thunder-XM_Multi-Device.js')(sock, m, store)           
    await sock.sendPresenceUpdate('composing', from)   
  })
  
  sock.ev.on('group-participants.update', async (update) =>{
   groupResponse(sock, update)
   console.log(update)
   })         
 /*
 * Run main file;
 */
  }
 connectToWhatsApp()
 
 } catch(e) { 
  e = String(e) 
  if (e.includes('Connection Closed')){ return }
  if (e.includes('Timed Out')){ return }
  
  console.log(e)
 }
 const LordThunder = require.resolve(__filename)
 fs.watchFile(LordThunder, () => {
 fs.unwatchFile(LordThunder)
 console.log(color(`New! >`, 'yellow'), color(`${__filename}`, 'orange'))
 delete require.cache[LordThunder]
 require(LordThunder)
 } )
# TOCIX-BOT
