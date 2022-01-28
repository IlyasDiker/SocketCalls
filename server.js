const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');


const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`);
})