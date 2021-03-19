import { useForkRef } from '@material-ui/core';
import React, { useState, useEffect, useRef, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../App';
import Chatbox from '../components/Chatbox/Chatbox';
import { v1 as uuid } from "uuid";

//import axios from 'axios';

const Chat = () => {
  const [users, setUsers] = useState([]);
  const { authState } = useContext(AuthContext);
  const socket = useRef();
  const peerRef = useRef(); 
  const otherUser = useRef();
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([]);



  useEffect(() => {

    socket.current = io('http://localhost:8001', {
      transports: ["websocket", "polling"]
    }); 

    socket.current.on('connect', () => {
      socket.current.emit('username', authState.username); 
    })

    socket.current.on("users", users => {
      setUsers(users);
      console.log(users);
    });

    socket.current.on("connected", user => {
      console.log(user.name + " conneceted")
    });

    socket.current.on("disconnected", id => {
      console.log(id); 
      setUsers(users => {
        return users.filter(user => user.id !== id);
      });
    });

    socket.current.on('offer', handleOffer);

    socket.current.on('answer', handleAnswer);

    socket.current.on('ice-candidate', handleNewICECandidateMsg);
  }, []);
  
  /*const createRoom = () => {
    function create() {
      const id = uuid();
      props.history.push(`/chat/${id}`);
    }
  }*/

  const onUserClick = (toUser) => {
    if(toUser.id !== socket.current.id) {
    console.log("USER CLCKED", toUser)
    startSamtale(toUser.id);
    } else{
      console.log("Du kan ikke snakke med deg selv")
    }
  }

  function startSamtale(userID) {
    console.log("Starter samtale");
    peerRef.current = createPeer(userID);
  }

  function createPeer(userID) {
    console.log("Lager peer med id " + userID);
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun1.l.google.com:19302'
        }
      ]
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

    return peer;
  }

  function handleNegotiationNeededEvent(userID) {
    peerRef.current
      .createOffer()
      .then(offer => {
        return peerRef.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: userID,
          caller: socket.current.id,
          sdp: peerRef.current.localDescription
        };
        socket.current.emit('offer', payload);
      })
      .catch(e => console.log(e));
  }

  function handleOffer(incoming) {
    peerRef.current = createPeer();
    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.current
      .setRemoteDescription(desc)
      console.log(desc)
      .then(() => {})
      .then(() => {
        return peerRef.current.createAnswer();
      })
      .then(answer => {
        return peerRef.current.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socket.current.id,
          sdp: peerRef.current.localDescription
        };
        socket.current.emit('answer', payload);
      });
  }

  function handleAnswer(message) {
    const desc = new RTCSessionDescription(message.sdp);
    console.log(desc);
    peerRef.current.setRemoteDescription(desc).catch(e => console.log(e));
  }

  function handleICECandidateEvent(e) {
    console.log(e);
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate
      };
      socket.current.emit('ice-candidate', payload);
    }
  }

  function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);

    peerRef.current.addIceCandidate(candidate).catch(e => console.log(e));
  }

  function handleChange(e) {
    setText(e.target.value);
  }
  
  return <Chatbox users={users} onUserClick={(user) => onUserClick(user)} />;
}

export default Chat;
