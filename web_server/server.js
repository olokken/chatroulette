var express = require('express'); 
var socket = require('socket.io'); 
//App setup

var app = express(); 
var server = app.listen(8001, function() {
    console.log('Listening on port 8001'); 
});

const users = []; 

var io = socket(server); 

io.on('connection', (client) => {

    client.on('username', (username) => {
        const user = {
            "name": username, 
            "id": client.id
        }; 
        users.push(user); 
        console.log(user['id']); 
        io.emit('users', Object.values(users)); 
    });

    client.on("disconnect", () => {
        users.forEach(x => {
            if (x['id'] == client.id) {
                users.pop(x); 
            }
        });
        io.emit("disconnected", client.id);
      });
});


