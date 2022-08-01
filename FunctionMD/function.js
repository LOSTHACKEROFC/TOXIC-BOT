const fetch = require('node-fetch')
const axios = require('axios');
const chalk = require('chalk')
const fs = require('fs')
const getBuffer = async (url, options) => {
	try {
		options ? options : {}
		const res = await axios({
			method: "get",
			url,
			headers: {
				'DNT': 1,
				'Upgrade-Insecure-Request': 1
			},
			...options,
			responseType: 'arraybuffer'
		})
		return res.data
	} catch (e) {
		console.log(`Error : ${e}`)
	}
}
const getRandom = (ext) => {
	return `${Math.floor(Math.random() * 10000)}${ext}`
}
const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            resolve(json)
        })
        .catch((err) => {
            reject(err)
        })
})
const runtime = function(seconds) {
 seconds = Number(seconds);
    var d = Math.floor(seconds / (3600 * 24));
    var h = Math.floor(seconds % (3600 * 24) / 3600);
    var m = Math.floor(seconds % 3600 / 60);
    var s = Math.floor(seconds % 60);
    var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " day, ") : "";
    var hDisplay = h > 0 ? h + (h == 1 ? " hours, " : " hours, ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minute, ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " second") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay;
}

const color = (text, color) => {
  return !color ? chalk.gray(text) : chalk.keyword(color)(text)}

const bgcolor = (text, bgcolor) => {
 return !bgcolor ? chalk.green(text) : chalk.bgKeyword(bgcolor)(text)}

const ConsoleLog = (text, color) => {
 return !color ? chalk.yellow('[RIFZA] ') + chalk.green(text) : chalk.yellow('[Rifza ') + chalk.keyword(color)(text)}
        
module.exports = { getBuffer, getRandom, fetchJson, runtime, chalk, color, bgcolor, ConsoleLog }
const LordRifza = require.resolve(__filename)
fs.watchFile(LordRifza, () => {
fs.unwatchFile(LordRifza)
console.log(color(`New! >`, 'yellow'), color(`${__filename}`, 'green'))
delete require.cache[LordRifza]
require(LordRifza)})