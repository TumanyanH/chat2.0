const con = require('./database/connection')
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
    socket.username = 'Anonymous';

    socket.on('username_change', (data) => {
        socket.username = data.username
        query = "INSERT INTO example (name) VALUES ('" + socket.username + "')";
        con.exec(query)
    })

    socket.on('new_message', (data) => {
        var query = "INSERT INTO messages (name, message) values ('" + socket.username + "', '" + data.message + "')";
        con.exec(query)
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




