import React, { useState, useEffect, useRef, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../App';
import Chatbox from '../components/Chatbox/Chatbox';
//import axios from 'axios';

const Chat = () => {
  const [users, setUsers] = useState([]);
  const { authState } = useContext(AuthContext);

  let offer;


  var socket = io('http://localhost:8001', {
    transports: ["websocket", "polling"]
  }); 

  useEffect(() => {

    socket.on('connect', () => {
      socket.emit('username', authState.username); 
    })

    socket.on("users", (users) => {
      setUsers(users);
      console.log("Under kommer users, som jeg ikke får brukt i setUsers, faen");
      console.log(users);
    });

    socket.on("connected", user => {
      setUsers([...users, user]);
      console.log(user.name + " connceted")
    });

    socket.on("disconnected", id => {
      console.log(id); 
      setUsers(users => {
        return users.filter(user => user.id !== id);
      });
    });

    socket.on("answer",  toUser => {
      console.log("Lager svar");
      createAnswer(toUser);
    });

  }, []);
  
  const onUserClick = (toUser) => {
    console.log("USER CLCKED", toUser)

    const WebRTCConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun1.l.google.com:19302',
        },
      ],
    });
    
    const chatChannel = WebRTCConnection.createDataChannel('chat');
    chatChannel.onmessage = (event) => console.log('Ny melding:', event.data);
    chatChannel.onopen = () => console.log('Åpnet ');
    chatChannel.onclose = () => console.log('Lukket');
  
    WebRTCConnection.onicecandidate = (event) => {
      if (event.candidate)
       offer = JSON.stringify(WebRTCConnection.localDescription);
    }
    WebRTCConnection.createOffer().then((localDescription) => {
      WebRTCConnection.setLocalDescription(localDescription);
    });

    setTimeout(() => { socket.emit('offer', offer, toUser); }, 250);

  }

  const createAnswer = (fromUser) => {
    console.log(fromUser)
    console.log(users)
    console.log("RemoteDesc:" + fromUser.remoteDescription)
    /*
    const remoteDescription =

    const WebRTCConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun1.l.google.com:19302',
        },
      ],
    });
    
    let chatChannel;
    WebRTCConnection.ondatachannel = (event) => {
      if (event.channel.label == 'chat') {
        chatChannel = event.channel;
        chatChannel.onmessage = (event) => console.log('onmessage:', event.data);
        chatChannel.onopen = () => console.log('onopen');
        chatChannel.onclose = () => console.log('onclose');
      }
    };
    
    WebRTCConnection.onicecandidate = (event) => {
      if (event.candidate)
        console.log('localDescription:', JSON.stringify(WebRTCConnection.localDescription));
    };
    
    WebRTCConnection.setRemoteDescription(remoteDescription);
    
    WebRTCConnection.createAnswer().then((localDescription) => {
      WebRTCConnection.setLocalDescription(localDescription);
    });*/
  }

  return <Chatbox users={users} onUserClick={(user) => onUserClick(user)} />;
};

export default Chat;
