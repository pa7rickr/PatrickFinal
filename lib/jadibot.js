
let { WAConnection, MessageType, Mimetype} = require('@adiwajshing/baileys')
let qrcode = require('qrcode')
const fs = require('fs')

listjadibot = [];

const jadibot = async(reply,client,id) => {
	conn = new WAConnection()
    conn.logger.level = 'warn'
    conn.version = [2, 2123, 8]
    conn.browserDescription = [ 'Numpang PatrickBot', '', '3.0' ]
    conn.on('qr', async qr => {
    	let bot = await qrcode.toDataURL(qr, { scale: 8 })
    	let buffer = new Buffer.from(bot.replace('data:image/png;base64,', ''), 'base64')
       	bot = await client.sendMessage(id,buffer,MessageType.image,{caption:'Scan QR Untuk menjadi bot\n*Rules:*\nQR akan diganti setiap 30 detik'})
    	setTimeout(() => {
       	client.deleteMessage(id, bot.key)
       },30000)
    })
    conn.on('connecting', () => {
    })
    conn.on('open', () => {
    	reply(`Sukses Jadi BOT\n\n*Device*:\n\n ${JSON.stringify(conn.user,null,2)}`)
    })
    await conn.connect({timeoutMs: 30 * 1000})
    listjadibot.push(conn.user)
    conn.on('group-participants-update', async (anu) => {
	if (!welcome.includes(anu.jid)) return
	try {
		const mdata = await conn.groupMetadata(anu.jid)
		num = anu.participants[0]
		console.log(anu)
		ini_user = conn.contacts[num]
		namaewa = ini_user.notify
		member = mdata.participants.length
		try {
			var ppimg = await conn.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
		} catch {
			var ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
		}

		try {
			var ppgc = await conn.getProfilePicture(anu.jid)
		} catch {
			var ppgc = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
		}
		try {
			var iwelcome = await getBuffer(`http://hadi-api.herokuapp.com/api/card/welcome2?nama=${encodeUrl(namaewa)}&descriminator=${member}&memcount=${member}&gcname=${encodeUrl(mdata.subject)}&gcicon=${ppgc}&pp=${ppimg}&bg=https://i.ibb.co/LvCNb3H/Background03.jpg`)
		} catch {
			var iwelcome = `${ppimg}`
		}
		try {
			var imageleave = await getBuffer(`http://hadi-api.herokuapp.com/api/card/goodbye2?nama=${encodeUrl(namaewa)}&descriminator=${member}&memcount=${member}&gcname=${encodeUrl(mdata.subject)}&gcicon=${ppgc}&pp=${ppimg}&bg=https://i.ibb.co/LvCNb3H/Background03.jpg`)
		} catch {
			var imageleave = `${ppimg}`
		}
		shortpc = await axios.get(`https://tinyurl.com/api-create.php?url=${ppimg}`)
		shortgc = await axios.get(`https://tinyurl.com/api-create.php?url=${ppgc}`)
		if (anu.action == 'add') {
			teks = 
`*Halo* *${ini_user.notify}*
Welcome To *${mdata.subject}*
*> Nama:*
*> Umur:*
*> Hobby:*
*> Gender:*
*> Asal Kota:*
*Jika Privasi ketik Private di kolom*
*Semoga Betah di group🌈*`
			conn.sendMessage(mdata.id, iwelcome, MessageType.image, {
				caption: teks,
				contextInfo: {
					'mentionedJid': [num]
				}
			})
		} else
		if (anu.action == 'remove') {
			teks = `  Goodbye ${namaewa} 👋🍁`
			conn.sendMessage(mdata.id, imageleave, MessageType.image, {
				caption: teks,
				contextInfo: {
					'mentionedJid': [num]
				}
			})
		} else
		if (anu.action == 'promote') {
			img = await getBuffer(`http://hadi-api.herokuapp.com/api/card/promote?nama=${encodeUrl(namaewa)}&member=${member}&pesan=Selamat anda menjadi admin group!&pp=${shortpc.data}&bg=https://dappa-result.herokuapp.com/bgverify.jpeg`)
			teks = ` Information *${mdata.subject}*
>  Terdeteksi *Di-Promote*
>  Nomor: ${num.replace('@s.whatsapp.net', '')}
>  @${num.split('@')[0]}`
			conn.sendMessage(mdata.id, img, MessageType.image, {
				caption: teks,
				contextInfo: {
					'mentionedJid': [num]
				}
			})
		} else
		if (anu.action == 'demote') {
			img = await getBuffer(`http://hadi-api.herokuapp.com/api/card/demote?nama=${encodeUrl(namaewa)}&member=${member}&pesan=Awokawok di unadmin, mampus:v&pp=${shortpc.data}&bg=https://dappa-result.herokuapp.com/bgverify.jpeg`)
			teks = 
` Information *${mdata.subject}*
>  Terdeteksi *Di-Demote*
>  Nomor: ${num.replace('@s.whatsapp.net', '')}
>  @${num.split('@')[0]}`
			conn.sendMessage(mdata.id, img, MessageType.image, {
				caption: teks,
				contextInfo: {
					'mentionedJid': [num]
				}
			})
		}
	} catch (e) {
		console.log('Error : %s', color(e, 'red'))
	}
}) 
      conn.on("message-delete", async (m) => {
    if (m.key.remoteJid == "status@broadcast") return;
    if (!m.key.fromMe && m.key.fromMe) return;
    m.message =
      Object.keys(m.message)[0] === "ephemeralMessage"
        ? m.message.ephemeralMessage.message
        : m.message;
    const jam = moment.tz("Asia/Jakarta").format("HH:mm:ss");
    let d = new Date();
    let locale = "id";
    let gmt = new Date(0).getTime() - new Date("1 Januari 2021").getTime();
    let weton = ["Pahing", "Pon", "Wage", "Kliwon", "Legi"][
      Math.floor((d * 1 + gmt) / 84600000) % 5
    ];
    let week = d.toLocaleDateString(locale, { weekday: "long" });
    let calender = d.toLocaleDateString(locale, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const type = Object.keys(m.message)[0];
    conn.sendMessage(m.key.remoteJid,
`\`\`\` Anti Delete\`\`\`
> Nama : @${m.participant.split("@")[0]}
> Waktu : ${jam} ${week} ${calender}
> Type : ${type}`,MessageType.text, { 
        quoted: m.message, contextInfo: { 
             mentionedJid: [m.participant]
        } 
     });
    conn.copyNForward(m.key.remoteJid, m.message);
  });
conn.on('CB:Blocklist', json => {
	if (blocked.length > 2) return
	for (let i of json[1].blocklist) {
		blocked.push(i.replace('c.us', 's.whatsapp.net'))
	}
})
    conn.on('chat-update', async (message) => {
        require('../start.js')(conn, message)
    })
}

const stopjadibot = (reply) => {
	conn = new WAConnection();
	conn.close()
	reply('Sukses stop jadibot')
}

module.exports = {
	jadibot,
	stopjadibot,
	listjadibot
}
