$( function() {
    var socket = io.connect('localhost:3000')

    var username = $('#username_input')
    var username_btn = $('#username_btn')
    var message = $('#message_input')
    var message_btn = $('#message_btn')
    var chatroom = $('#chatroom')
    var typing = $('#typing')

    username_btn.click(function() {
        var new_username = username.val()
        socket.emit('username_change', {
            username : new_username
        })
    })

    message_btn.click(function() {
        var new_message = message.val()
        socket.emit('new_message', {
            message : new_message
        })
        message.val('')
    })

    socket.on('new_message', (data) => {
        chatroom.append('<p><b>'+ data.username +' : </b> ' + data.message + ' </p>')
    })

    message.focusin(function() {
        socket.emit('typing')
    })

    socket.on('typing', (data) => {
        typing.text(data.username + ' is typing...');
    })
    
    message.focusout(function() {
        socket.emit('typing_break')
    })

    socket.on('typing_break', function() {
        typing.text('')
    })
    
})
