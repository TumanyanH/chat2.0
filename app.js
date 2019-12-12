const express = require("express")
const app = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('index')
})

server = app.listen(3000)

const io = require("socket.io")(server)

io.on('connection', (socket) => {
    console.log('new user connected')
    socket.username = 'Anonymous'

    socket.on('username_change', (data) => {
        socket.username = data.username
        console.log('someone changed his username to : ' + socket.username)
    })

    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', {
            username : socket.username,
            message : data.message,
        })
    })

    socket.on('typing', () => {
        io.sockets.emit('typing', {
            username : socket.username
        })
    })

    socket.on('typing_break', () => {
        io.sockets.emit('typing_break')
    })
})




