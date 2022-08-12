const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const socketIo = require('socket.io')
const http = require('http')
const path = require('path')
// const router = require('express-promise-router')()
// const oracledb = require('oracledb')
const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 2000;

const io = socketIo(server,{ 
  cors: {
    origin: 'http://localhost:3000'
  }
}) 

if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, "client/build")))
}

io.on('connection',(socket)=>{
  console.log('client connected: ',socket.id)
  
  socket.join('chat-room')
  
  socket.on('disconnect',(reason)=>{
    // console.log(reason)
  })
})


app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

app.use('/apis', require('./routes/router'))

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

exports.messageSent = (room, msg) => io.to(room).emit(msg);
