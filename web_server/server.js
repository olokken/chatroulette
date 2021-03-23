require('dotenv').config();
const express = require('express'); 
const path = require('path');
const socket = require('socket.io'); 
//App setup
const app = express(); 
app.use(express.static(path.join('../klient/build/')));

app.get('/', (req, res) => {
    res.sendFile(path.join('../klient/build/index.html')); 
});

const port = process.env.PORT || 8000;

const server = app.listen(port, function() {
    console.log('Listening on port ' + port); 
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

    client.on('ice-candidate', incoming => {
        io.to(incoming.target).emit('ice-candidate', incoming.candidate);
    });    

    client.on("roomID", romInfo => {
        io.to(romInfo.target).emit("romInvitasjon",  romInfo);
    });

    client.on("akseptert", svar => {
        io.to(svar.from).emit("akseptert", svar.id);
    });

    client.on("avslaa", from => { 
        io.to(from).emit("avslaatt")
    });

    client.on('forlat', id => {
        io.to(id).emit('forlot')
    })

});

