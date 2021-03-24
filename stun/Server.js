const { ReturnMessage } = require("./ReturnMessage.js");
const { StunHeader } = require("./StunHeader.js");
const { Attributes } = require("./Attributes.js");
const dgram = require("dgram");

const socket = dgram.createSocket("udp4");
const PORT = process.env.PORT || 3478;  

socket.on('listening', () => {
    const adresse = socket.address(); 
    console.log("Ser etter klienter på adresse: " + adresse.address + " og port: " + adresse.port);
}); 

socket.on('message', (message, info) => {
    console.log("IP-versjon: " + info.family); 
    console.log("IP-adresse: " + info.address);
    console.log("Port: " + info.port); 
    const returnMsg = ReturnMessage.from(message); 

    if (StunHeader.decType(returnMsg.hdr.type).type === StunHeader.K_MSG_TYPE.BINDING_REQUEST) {
        const mtype = Attributes.K_ATTR_TYPE.XOR_MAPPED_ADDRESS; 

        const attrs = [];

        attrs.push(new Attributes({
            type: mtype, 
            args: [Attributes.K_ADDR_FAMILY[info.family], info.address, info.port, returnMsg.hdr.id]
        })); 

        //attrs.push(new Attributes({type: Attributes.K_ATTR_TYPE.SOFTWARE}));
        
        const outHdr = new StunHeader({
            type: StunHeader.K_MSG_TYPE.BINDING_SUCCESS_RESPONSE, 
            len: ReturnMessage.attrByteLength(attrs), 
            id: returnMsg.hdr.id
        });

        const outMsg = new ReturnMessage({
            hdr: outHdr, 
            attrs: attrs
        });

        const returnBuffer = outMsg.serialize(); 

        console.log(returnBuffer);
        
        socket.send(returnBuffer, info.port, info.address, () => {
            console.log("Sender svar til klient"); 
        })
    }
}); 

socket.bind(PORT);
console.log("Stun server starter.."); 