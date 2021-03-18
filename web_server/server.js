var express = require('express'); 
var socket = require('socket.io'); 
//App setup

var app = express(); 
var server = app.listen(8001, function() {
    console.log('Listening on port 8001'); 
});

const users = []; 

var io = socket(server); 
let my_id;

io.on('connection', (client) => {

    client.on('username', (username) => {
        const user = {
            "name": username, 
            "id": client.id,
            "localDescription": null,
            "remoteDescription": null,
        }; 
        my_id = client.id;
        users.push(user); 
        //console.log("Bruker sin id: " + user['id']); 
        //console.log("Din id = " + client.id);
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

    client.on('offer', (offer, toUser) => {
        users.forEach(x => {
            if(x['id'] == toUser.id && toUser.id != my_id) {
                x.remoteDescription = offer;
            } 
            if(x['id'] == my_id && x['id'] != toUser.id) {
                x.localDescription = offer;
            }
        })
        io.emit('users', Object.values(users));

        setTimeout(() => {io.emit("answer", user.id)}, 250);
    });
    
});


