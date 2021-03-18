import React, { useState, useEffect, useRef, useContext } from 'react';
import io from "socket.io-client"; 
import { AuthContext } from '../App';
import Chatbox from '../components/Chatbox/Chatbox';
//import axios from 'axios'; 

const Chat = () => {
  const [onlineUsers, setOnlineUsers] = useState([]); 
  const {authState} = useContext(AuthContext); 

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('/'); 

    socketRef.current.on('connect', () => {
      socketRef.current.emit('new_klient', authState.username);
    }); 

    socketRef.current.on('users', (data) => {
      console.log(data);
      setOnlineUsers(data); 
    })

    const sendOffer = () => {
      //socketRef.current.emit('privateMessage', {"sessionID":{sessionID}, "offer": {offer}});
    }
    

    socketRef.current.on('reciece_offer', (data) => {
      //Gjør no med den bekretelsen i webrtc
    })
  });
  


  return <Chatbox />;
};

export default Chat;
