require('dotenv').config(); 
const express = require('express'); 
const socket = require('socket.io'); 
const os = require("os");
 


//App setup

var app = express(); 
const port = process.env.PORT; 
console.log(port); 
const env = process.env.PROD;
console.log(env); 
var server = app.listen(port, function() {
    console.log('Listening on port ' + port); 
    console.log(os.hostname());
    console.log(server.address());
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


        console.log("Min ID er: " + my_id)
        console.log("Din ID = " + toUser.id);

        users.forEach(x => {
            if(x['id'] == toUser.id && toUser.id != my_id) {
                console.log("remote")
                x.remoteDescription = offer;
            } 
            if(x['id'] == my_id && x['id'] != toUser.id) {
                console.log("local")
                x.localDescription = offer;
            }
        })
        io.emit(users);
    });
    
});


