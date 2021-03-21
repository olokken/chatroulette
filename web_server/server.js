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
        }; 
        my_id = client.id;
        users.push(user); 
        //console.log("Bruker sin id: " + user['id']); 
        //console.log("Din id = " + client.id);
        io.emit('users', Object.values(users));
        io.emit("connected", user); 
    });

    client.on("disconnect", () => {
        users.forEach(x => {
            if (x['id'] == client.id) {
                let index = users.indexOf(x);
                users.splice(index, 1); 
            }
        });
        io.emit("disconnected", client.id);
      });

    client.on('offer', payload => {
        io.to(payload.target).emit("offer", payload);
    });

    client.on("answer", payload => {
        io.to(payload.target).emit("answer", payload);
    });

    client.on("ice-candidate", incoming => {
        io.to(incoming.target).emit("ice-candidate", incoming.candidate);
    });    

    client.on("roomID", romInfo => {
        io.to(romInfo.target).emit("romInvitasjon",  romInfo.romID);
    })

});

