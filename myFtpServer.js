const net = require('net')
const fs =  require('fs')
const readline = require('readline');
const { ENGINE_METHOD_DIGESTS, ENETUNREACH } = require('constants');
const { exit } = require('process');
const process = require('process');

const PORT = process.argv[2] // Default PORT : 5000

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})


const server = net.createServer((socket) => {
  console.log('New connection')

  socket.on('data', (data) => {
    const [directive, parameter] = data.toString().split(' ')
    let reading = fs.readFileSync('db.json');
    let user = JSON.parse(reading);


    switch(directive) {
        case 'USER':          
          let checkUser = Boolean
          checkUser = 0

          user.forEach(elementUser => {
            let userVerif = elementUser["username"]

              if (userVerif == parameter) {
                 checkUser = true
              }           
            })  
              if (checkUser) {
                socket.write('\nPlease enter your password')
                socket.username = parameter
              }

              else {
                socket.write('\nPlease enter your username')
              }
        break

        case 'PASS':
            let result = user.filter(e => e.username == socket.username)
              let checkPass = Boolean
              checkPass = 0

            result.forEach(elementPass => {
                let passwordVerif = elementPass["password"]

                if (passwordVerif == parameter) {
                  checkPass = true
                  console.log(checkPass)
                  }
                });

                if (checkPass) {
                  socket.write('\n>> Well done! you are connected\n>> Use the command "HELP" for more information')
                  socket.username = parameter
                  socket.pass = true

                } else {
                  socket.write('\nPlease enter the correct password')
                }
          break

        case 'LIST': 
          if (socket.pass == true) {
            fs.readdir(__dirname, (err, files) => {
              
              if(err) {
                return console.error(err)
              }
              socket.write(files.join('\n'))
            })
            
          } else {
            socket.write("\n>> Access denied: You don't have the permission\n>> You must login before")
          }

          break
        
        case 'CWD': 
          if (socket.pass == true) {
          // Printing current directory of the server
            socket.write(`Current directory of the server: ${process.cwd()}`)
              
            try {
              process.chdir(parameter)
              socket.write(`Server directory after changing: ${process.cwd()}`)
              
            } catch (err) {
              socket.write(`Error occured while change directory: ${err}`)
            }

          } else {
            socket.write("\n>> Access denied: You don't have the permission\n>> You must login before")
          }

          break

        case 'RETR':
          if (socket.pass == true) {
            let filefromServer = fs.readFile(`${parameter}`, 'utf8', (err, data) => {
              
              if (err) {
                return console.error(err)
              }
              socket.write(`\n---------- File content ----------\n\n${data}`)
            })

          } else {
            socket.write("\n>> Access denied: You don't have the permission\n>> You must login before")
          }
          
          break;

        case 'STOR':
          if (socket.pass == true) {
            let fileFromClient = fs.readFile(`${parameter}`, 'utf8', (err, data) => {
              
              if (err) {
                return console.error(err)
              }
              console.log(`\n---------- File content ----------\n\n${data}`)
            })

          } else {
            socket.write("\n>> Access denied: You don't have the permission\n>> You must login before")
          }
          break
        
        case 'PWD':
          if (socket.pass == true) {
            socket.write(`\n>> Current directory of the server: ${process.cwd()}`)
          } else {
            socket.write("\n>> Access denied: You don't have the permission\n>> You must login before")
          }
          
          break

        case 'HELP':
          socket.write("---------- Commands ----------\nUSER <username> : enter username \nPASS : <password> enter your password \nLIST : list the current directory of the server \nCWD <directory> : change the current directory of the server \nRETR : <filename> : transfer a copy of the file FILE from the server to the client \nSTOR : <filename> : transfer a copy of the file FILE from the client to the server \nPWD : display the name of the current directory of the server\nHELP : send helpful information to the client\nQUIT : send helpful information to the client")
          break
        
        case 'QUIT':
          console.log('Server exit')
          socket.write('\nSERVER IS CLOSED\n>> Please restart the server & client to continue')
          process.exit()
          break
    }
  })
})



server.listen(PORT, () => {
  console.log(`>>> Server started at port ${PORT}`)
})

