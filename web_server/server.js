<<<<<<< HEAD
require('dotenv').config(); 
const express = require('express'); 
const socket = require('socket.io'); 
const os = require("os");
const path = require('path'); 
 


//App setup

var app = express(); 

app.use(express.static(path.join('../klient/build/')));

app.get('/', (req, res) => {
    res.sendFile(path.join('../klient/build/index.html')); 
}); 



const port = process.env.PORT || 3000; 
console.log(port); 
var server = app.listen(port, function() {
    console.log('Listening on port ' + port); 
    //console.log(os.hostname());
    //console.log(server.address());
=======
const express = require('express'); 
const socket = require('socket.io'); 
//App setup

const app = express(); 
const server = app.listen(8001, function() {
    console.log('Listening on port 8001'); 
>>>>>>> WebRTC
});

const users = []; 

const io = socket(server); 

io.on('connection', (client) => {

    client.on('username', (username) => {
        const user = {
            "name": username, 
            "id": client.id,
        }; 
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

<<<<<<< HEAD
        console.log("Min ID er: " + my_id); 
        console.log("Din ID = " + toUser.id);
=======
    client.on('ice-candidate', incoming => {
        io.to(incoming.target).emit('ice-candidate', incoming.candidate);
    });    
>>>>>>> WebRTC

    client.on("roomID", romInfo => {
        io.to(romInfo.target).emit("romInvitasjon",  romInfo);
    })

});

