/*
${INF} Created by RIFZA
${INF} Thanks to Rifza
${INF} Thanks to all creator bot WhatsApp
*/
const fs = require('fs')
const axios = require('axios')
const cheerio = require('cheerio')
const hasil = []  
 
 async function wallpaperaccess(query) {
 return new Promise((resolve, reject) => {
 axios.get('https://wallpaperaccess.com/search?q=' + query)
   .then((res) => { 
   var $ = cheerio.load(res.data)   
   $("#collections_segment a").each(function(a, z) {
	const link = 'https://wallpaperaccess.com' + $(z).find('img').attr('data-src')	
     hasil.push({ link })
      })
       resolve(hasil)
      
     }).catch(reject)
   }
  )
 }
 console.log(hasil)	
 module.exports = { wallpaperaccess }
