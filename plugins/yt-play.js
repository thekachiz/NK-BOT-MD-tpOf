/**
[ By @NeKosmic || https://github.com/NeKosmic/ ]
**/
let handler = async (m, { conn, command, text }) => {
	if (!text) return m.reply(`Que desea buscar en Youtube?, Ejemplo de uso: \n\n${Prefijo + command} mtc s3rl`)
	let playtext = encodeURIComponent(text)
	let numran = pickRandom([0, 1, 2])
	let myapiyts = await fetchJson(`https://latam-api.vercel.app/api/yts?apikey=${MyApiKey}&q=${playtext}`)
	let myapidl = await fetchJson(`https://latam-api.vercel.app/api/ytmp3_2?apikey=${MyApiKey}&q=${myapiyts.resultados[numran].url}`)
	let ytthumb = await getBuffer(myapidl.logo)
	await conn.sendMessage(m.chat, {text: `
*βοΈ Titulo:* ${myapidl.titulo}
*ποΈ TamaΓ±o:* ${myapidl.peso}
*πͺ Resultado:* ${numran}/3

[βγ€βγ€γ€ββγ€γ€β·γ€β»]


_Enviando audio, espere..._
`.trim(), contextInfo:{"externalAdReply":{"title": `${myapidl.titulo}`,"body": `βγ€γ€βγ€γ€ββγ€γ€β·γ€γ€β»`,"previewType": "PHOTO","thumbnailUrl": ``,"thumbnail": ytthumb,"sourceUrl": myapidl.descarga }}}, {quoted: m })
conn.sendMessage(m.chat, { audio: { url: myapidl.descarga }, mimetype: 'audio/mpeg', fileName: `${myapidl.titulo}.mp3` }, { quoted: m }).catch(e => {
m.reply(`Ocurrio un error, por favor use el comando:\n\n${Prefijo}audio ${text}\n`)
})
}

handler.help = ['play <texto>']
handler.tags = ['servicio']
handler.command = /^play$/i

export default handler