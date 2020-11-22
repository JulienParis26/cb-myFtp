# cd-myFtp

You MUST running the Server (myFtpServer.js) and the Client (myFtpServer.js) at the same time in a different shell to run the commands below.


## Commands

* USER "username": check if the user exist
* PASS "password": authenticate the user with a password
* LIST: list the current directory of the server
* CWD "directory": change the current directory of the server
* RETR "filename": transfer a copy of the file FILE from the server to the client
* STOR "filename": transfer a copy of the file FILE from the client to the server
* PWD: display the name of the current directory of the server
* HELP: send helpful information to the client
* QUIT: close the connection and stop the program


## Usage

```node
Server : 
~/.../myFtp ❯❯❯ node myFtpServer.js <port>
```
* port is the port number on which the server socket is listening. The server must be able to handle several clients at the same time.

```node
Client : 
~/.../myFtp ❯❯❯ node myFtpClient.js <host> <port>
```
* host is the name (or the IP address) of the computer where the server is hosted.
port is the port number on which the server is listening.


## GITHUB link
[myFTP](https://github.com/pu-erh/myftp/)
