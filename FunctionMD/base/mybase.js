 const { 
  getContentType,
  prepareWAMessageMedia,
  generateWAMessage,
  generateWAMessageFromContent,
  proto
 } = require('@adiwajshing/baileys')
 const fs = require('fs')
 const { 
  color 
 } = require('../function.js')
 const moment = require("moment-timezone")

 exports.move = (sock, m, store) => {
 //
 let morph = m
 if (!m) return m
 if (morph.key) {
        ID = m.key.id
        m.isBaileys = ID.startsWith('BAE5') && ID.length === 16               
        m.sender = sock.decodeJid(m.Me && sock.user.id || m.participant || m.key.participant || m.key.remoteJid || '')        
    }
    
 if (m.message) { 
   m.xtype = getContentType(m.message)
   m.isMedia = (m.xtype === 'imageMessage' || m.xtype === 'videoMessage')
   m.content = JSON.stringify(m.message)
   m.isQuotedImage = m.xtype === 'extendedTextMessage' && m.content.includes('imageMessage')
   m.isQuotedVideo = m.xtype === 'extendedTextMessage' && m.content.includes('videoMessage')
   m.isQuotedAudio = m.xtype === 'extendedTextMessage' && m.content.includes('audioMessage')
   m.isQuotedSticker = m.xtype === 'extendedTextMessage' && m.content.includes('stickerMessage')
   m.isQuotedLocation = m.xtype === 'extendedTextMessage' && m.content.includes('locationMessage')        
   m.msg = (m.xtype == 'viewOnceMessage' ? m.message[m.xtype].message[getContentType(m.message[m.xtype].message)] : m.message[m.xtype])
   if (m.msg) { 
   let quoted = m.quoted = m.msg.contextInfo ? m.msg.contextInfo.quotedMessage : null  
   if (m.quoted) {
   let type = getContentType(quoted)
   if (['productMessage'].includes(type)) {
     type = getContentType(m.quoted)
    	 m.quoted = m.quoted[type]
	}
   if (typeof m.quoted === 'string') m.quoted = {
	text: m.quoted
	}
	try{
	    const context = m.message[m.xtype].contextInfo.quotedMessage
        if(context["ephemeralMessage"]){
            m.quotedMsg = context.ephemeralMessage.message
        }else{
            m.quotedMsg = context
        }
        m.isQuotedMsg = true
        m.quotedMsg.sender = m.message[m.xtype].contextInfo.participant
        m.quotedMsg.fromMe = m.quotedMsg.sender === conn.user.id.split(':')[0]+'@s.whatsapp.net' ? true : false
        m.quotedMsg.type = Object.keys(m.quotedMsg)[0]
        let ane = m.quotedMsg
        m.quotedMsg.chats = (ane.type === 'conversation' && ane.conversation) ? ane.conversation : (ane.type == 'imageMessage') && ane.imageMessage.caption ? ane.imageMessage.caption : (ane.type == 'documentMessage') && ane.documentMessage.caption ? ane.documentMessage.caption : (ane.type == 'videoMessage') && ane.videoMessage.caption ? ane.videoMessage.caption : (ane.type == 'extendedTextMessage') && ane.extendedTextMessage.text ? ane.extendedTextMessage.text : (ane.type == 'buttonsMessage') && ane.buttonsMessage.contentText ? ane.buttonsMessage.contentText : ""
        m.quotedMsg.id = m.message[m.xtype].contextInfo.stanzaId
    }catch{
        m.quotedMsg = null
        m.isQuotedMsg = false
    }
    m.quoted.id = m.msg.contextInfo.stanzaId
    m.quoted.chat = m.msg.contextInfo.remoteJid || m.chat
    m.quoted.isBaileys = m.quoted.id ? m.quoted.id.startsWith('BAE5') && m.quoted.id.length === 16 : false
    m.quoted.sender = sock.decodeJid(m.msg.contextInfo.participant)
    m.quoted.fromMe = m.quoted.sender === (sock.user && sock.user.id)
    m.quoted.text = m.quoted.text || m.quoted.caption || m.quoted.conversation || m.quoted.contentText || m.quoted.selectedDisplayText || m.quoted.title || ''
    m.quoted.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []
    }  
   }   
  }
  m.getGroupAdmins = function(participants){
    let admins = []
	for (let i of participants) {
		i.admin !== null ? admins.push(i.id) : ''
	}
	return admins
} 
  m.reply = async (jid, teks, quoted) => {
    sock.sendMessage(jid, 
        { text: teks },
        quoted)  

        }
 
 m.createMsg = async (
    jidnya, 
    kontennya, 
    optionnya
 ) => 
   
   {
   return await generateWAMessage(
    jidnya, 
    kontennya, 
   {
    ...optionnya,
    userJid: sock.authState.creds.me.id,
    upload: sock.waUploadToServer
    }
   )
  }  
            
 m.sendButton = async (id, text1, text2, button, desc1, yo) => {
 var templates = await generateWAMessageFromContent(id, {
    "templateMessage": {
      "hydratedTemplate": {
        ...yo.message,
        "hydratedContentText": text1,
        "hydratedFooterText": text2, 
        "hydratedButtons": button
      }
    }, mentions: [m.sender]
  }, {})
  sock.relayMessage(id, templates.message, { messageId: templates.key.id })
  }
  const times = moment().tz('Asia/Jakarta').format('HH:mm:ss')
  if(times < "23:59:00"){
    m.sayingtime         = 'Good night'
    m.timoji = '🌃'}
  if(times < "19:00:00"){
    m.sayingtime         = 'Good afternoon'
    m.timoji = '🌆'}
  if(times < "18:00:00"){
    m.sayingtime         = 'Good afternoon'
    m.timoji = '🌇'}
  if(times < "15:00:00"){
    m.sayingtime         = 'Good afternoon'
    m.timoji = '🌞'}
  if(times < "11:00:00"){
    m.sayingtime         = 'Good morning'
    m.timoji = '🌅'}
  if(times < "05:00:00"){
    m.sayingtime         = 'Good night'
    m.timoji = '🌃' }  

    m.tanggal10 = new Date('1 May 2022 00:00:00').getTime();
    m.sekarang1 = new Date().getTime();
    m.selisih = m.tanggal10 - m.sekarang1;
    m.harinye = Math.floor(m.selisih / (1000 * 60 * 60 * 24));
    m.jamnye = Math.floor(m.selisih % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    m.menitnye = Math.floor(m.selisih % (1000 * 60 * 60) / (1000 * 60));
    m.detiknye = Math.floor(m.selisih % (1000 * 60) / (1000));
  
  m.templateButon5IMG = async (jid , text = '' , footer = '', img, button = [], options = {}) =>{
        let message = await prepareWAMessageMedia({ 
                       image: img 
                      }, { 
                       upload: 
                       sock.waUploadToServer 
                      })
        let template = generateWAMessageFromContent(jid, proto.Message.fromObject({
         templateMessage: {
         hydratedTemplate: {
         imageMessage: message.imageMessage,
               "hydratedContentText": text,
               "hydratedFooterText": footer,
               "hydratedButtons": button
              }
             }
           }), 
          options

        )
        sock.relayMessage(jid, template.message, { messageId: template.key.id })
      }   
  }
 
  const LordThunder = require.resolve(__filename)
  fs.watchFile(LordThunder, () => {
  fs.unwatchFile(LordThunder)
  console.log(color(`New! >`, 'yellow'), color(`${__filename}`, 'orange'))
  delete require.cache[LordThunder]
  require(LordThunder)
  } )