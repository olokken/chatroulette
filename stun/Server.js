const net = require("net");
const message = require("./Message.js");

port = 3478;
const server = net.createServer(klient => {
    console.log("Klient connected"); 
    klient.on('end', () => {console.log("Klient disconnected")}); 
    klient.on('data', data => {
        const header = data.subarray(0,160); 
        const response = message.Message.fromHeader(header); 
        console.log(response); 
    }); 
}); 

server.listen(port, () => {console.log("Listens on port " + port)}); 
