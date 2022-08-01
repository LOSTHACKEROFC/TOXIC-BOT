  const { getBuffer } = require('../function.js')
  const groupResponse = async (sock, update) => {
   const metadata = await sock.groupMetadata(update.id)   
   for (let participant of update.participants) {
    try{
       let metadata = await sock.groupMetadata(update.id)
       let participants = update.participants
       for (let num of participants) {
         try {
           ppuser = await sock.profilePictureUrl(num, 'image')
         } catch {
           ppuser = 'https://telegra.ph/file/265c672094dfa87caea19.jpg'
         }
         if (update.action == 'add') {
          var button = [
             { 
              buttonId: `ahsudahlah`, 
              buttonText: { 
               displayText: `Welcome Jaan👋` 
               }, type: 1 
              }
             ]
        sock.sendMessage(
         update.id, 
         { 
         caption: `*Hello @${num.split("@")[0]} Welcome to ${metadata.subject}* \n\nDon't forget to get acquainted with the admin here\nfan don't forget to obey the rules in this group*`, 
         location: { 
          jpegThumbnail: await getBuffer(ppuser) 
         }, 
         buttons: button, 
         footer: 'TOXIC BOT', mentions: [num] })
         } 
        else 
        if (update.action == 'remove') {
          var button = [
             { 
              buttonId: `ahsudahlah`, 
              buttonText: { 
               displayText: `CHALA JA BSDK😤` 
               }, type: 1 
              }
             ]
        sock.sendMessage(
           update.id, 
          { 
           caption: `*@${num.split("@")[0]} leave the group ${metadata.subject}*\nWhy did he come out huh?, ummm...`, 
           location: { jpegThumbnail: await getBuffer(ppuser) 
          }, 
           buttons: button, 
           footer: 'TOXIC BOT', 
           mentions: [num] 
             }
             )
             }
            }
        } catch (err) {
        console.log(err)
      }
    }   
  }
module.exports = { groupResponse }  
