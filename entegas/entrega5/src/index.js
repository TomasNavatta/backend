const app = require("./server");
const { Server } = require('socket.io')

const PORT = 3001

const chat = []



const httpServer = app.listen(PORT, () => {
    console.log(`Server running at port: ${PORT}`);
})

const io = new Server(httpServer)

io.on('connection', socket => {
    socket.on('newUser', data =>{
        socket.broadcast.emit('userConnected', data)
        socket.emit('messagesLogs', chat)
    })

    socket.on('messages', data =>{
        chat.push(data)

        io.emit('messagesLogs', chat)
    })
})

