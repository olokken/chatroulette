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
      socketRef.current.emit('message', authState.username, authState.stunServerInfo);
    }); 

    socketRef.current.on('message', (data) => {
      setOnlineUsers(data)
    })

    /*socketRef.current.on('close', () => {
      socketRef.current.emit('dis', "Beskjed fra kleiten at den disconnecter"); 
    });*/

    /*socketRef.current.on('disconnect', () => {
      axios.post('http://127.0.0.1:8001/dis', "Dette er en beskjed fra klienten som disconnecter"); 
    })*/
  });




  return <Chatbox />;
};

export default Chat;
