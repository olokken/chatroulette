var express = require('express'); 
var socket = require('socket.io'); 
//App setup

var app = express(); 
var server = app.listen(8000, function() {
    console.log('Listening on port 8000'); 
});

const users = {}; 

var io = socket(server); 

io.on('connection', (socket) => {

    io.on('username', (username) => {
        const user = {
            name: username, 
            id: socket.id
        }; 
        users[client.id] = user;
        io.emit("connected", user)
        io.emit('users', Object.values(users)); 
    });

    client.on("disconnect", () => {
        const username = users[client.id];
        delete users[client.id];
        io.emit("disconnected", client.id);
      });
});


