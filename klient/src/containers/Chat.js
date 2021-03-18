import React, { useState, useEffect, useRef, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../App';
import Chatbox from '../components/Chatbox/Chatbox';
//import axios from 'axios';

var socket = io('http://localhost:8000', {
    transports: ["websocket", "polling"]
  }); 

const Chat = () => {
  const [users, setUsers] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    socket.on('connect', () => {
      socket.emit('username', authState.username); 
    })

    socket.on("users", users => {
      setUsers(users);
    });

    socket.on("connected", user => {
      setUsers(users => [...users, user]);
    });

    socket.on("disconnected", id => {
      setUsers(users => {
        return users.filter(user => user.id !== id);
      });
    });

  }, []);
  return <Chatbox connected={onlineUsers} />;
};

export default Chat;
