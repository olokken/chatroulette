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
            "id": client.id,
            "localDescription": null,
            "remoteDescription": null,
        }; 
        users.push(user); 
        console.log(user['id']); 
        console.log(io.id);
        console.log(client.id);
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

    client.on('offer', (offer,user) => {
        users.forEach(x => {
            if(x['id'] = user.id) {
                x.localDescription = offer;
            }
        })
        io.emit(users);
    });
    
});


