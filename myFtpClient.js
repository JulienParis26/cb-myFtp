const net = require('net')
const fs = require ('fs')
const { createInterface } = require ('readline')

const PORT = process.argv[3] // Default PORT : 5000
const HOST = process.argv[2] // Dafault HOST : 127.0.0.1

// Readline
const rl = createInterface ({
  input: process.stdin,
  output: process.stdout
})

// Client connect
const client = new net.Socket()

client.connect(PORT, HOST, () => {
  console.log('>> Use the command "HELP" for more information!')

  rl.on('line', (input) => {
    console.log(input)
    client.write(input)
  })

})


client.on('data', (data) => {
  console.log(data.toString())
})
