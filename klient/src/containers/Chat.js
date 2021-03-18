import React, { useState, useEffect, useRef, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../App';
import Chatbox from '../components/Chatbox/Chatbox';
//import axios from 'axios';

const Chat = () => {
  const [users, setUsers] = useState([]);
  const { authState } = useContext(AuthContext);

  useEffect(() => {

    var socket = io('http://localhost:8001', {
    transports: ["websocket", "polling"]
  }); 

    socket.on('connect', () => {
      socket.emit('username', authState.username); 
    })

    socket.on("users", users => {
      //setUsers(users);
      console.log("Under kommer users, som jeg ikke får brukt i setUsers, faen");
      console.log(users);
    });

    socket.on("connected", user => {
      setUsers([...users, user]);
      console.log(users)
    });

    socket.on("disconnected", id => {
      console.log(id); 
      setUsers(users => {
        return users.filter(user => user.id !== id);
      });
    });

  }, []);

  return <Chatbox users = {users}/>;
};

export default Chat;
