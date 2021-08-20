const express = require('express');
const server = express();

server.all('/', (req, res) => {
  res.send('axis stats : \nOnline')
})

function keepAlive() {
  server.listen(3000, () => {
    console.log("Server Is Ready!")
  })
}

module.exports = keepAlive;
