const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', socket => {
    socket.emit('message', 'Welcome');

    socket.on('userJoined', (user)=>{
        io.emit('userJoined', user);
    })
    
    socket.on('disconnect', ()=>{
        io.emit('message', 'user left chat');
    })

    socket.on('chatMessage', (data) => {
        console.log(data);
        io.emit('chatMessage', data);
    })
})

server.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})