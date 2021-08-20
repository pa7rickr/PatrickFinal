const lolcatjs = require('lolcatjs')
const figlet = require('figlet')
let { spawn } = require('child_process')
const http = require("http")
let path = require('path')
const CFonts  = require('cfonts')
const fs = require('fs')
lolcatjs.options.seed = Math.round(Math.random() * 1000);
lolcatjs.options.colors = true;

nocache('./index.js'), module => console.log(`${module} is now updated!`)
function nocache(module, cb = () => { }) {
fs.watchFile(require.resolve(module), async () => {
await uncache(require.resolve(module))
  cb(module)
  })
}
 function uncache(module = '.') {
    return new Promise((resolve, reject) => {
       try {
          delete require.cache[require.resolve(module)]
          resolve()
          } catch (e) {
            reject(e)
          }
     })
}

const server = http.createServer((req, res) => {
	if (req.url == "/") {
		res.end(fs.readFileSync("templates/index.html", "utf-8"));
	} else {
		res.end("404");
	}
})

const io = require("socket.io")(server);
io.on("connection", (socket) => {
	conn.on("qr", async (qr) => {
		const imgURI = await qrcode.toDataURL(qr);
		socket.emit("qr", imgURI);
	});

	conn.on("open", () => {
		socket.emit("connected");
	});
})


server.listen(process.env.PORT || 3000);

function start() {
  let args = [path.join('index.js'), ...process.argv.slice(2)]
  CFonts.say([process.argv[0], ...args].join(' '), {
    font: 'console',
    align: 'center',
    gradient: ['red', 'magenta']
  })
  let p = spawn(process.argv[0], args, {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc']
  })
  .on('message', data => {
    if (data == 'reset') {
      console.log('RESET')
      p.kill()
      start()
      delete p
    }
  })
}
start()
