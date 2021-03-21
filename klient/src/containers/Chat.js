import { useForkRef } from '@material-ui/core';
import React, { useState, useEffect, useRef, useContext } from 'react';
import io from 'socket.io-client';
import { AuthContext } from '../App';
import Chatbox from '../components/Chatbox/Chatbox';
import { v1 as uuid } from 'uuid';
import { useHistory } from 'react-router-dom';

//import axios from 'axios';

const Chat = () => {
  const history = useHistory();
  const [users, setUsers] = useState([]);
  const { authState } = useContext(AuthContext);
<<<<<<< HEAD

  let offer;

  const socketRef = useRef();
  

  useEffect(() => {

    socketRef.current = io('/', {
    transports: ["websocket", "polling"]
  }); 

    socketRef.current.on('connect', () => {
      socketRef.current.emit('username', authState.username); 
    })

    socketRef.current.on("users", users => {
=======
  const sendChannel = useRef();
  const socket = useRef();
  const peerRef = useRef();
  const otherUser = useRef();
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.current = io('http://localhost:8001', {
      transports: ['websocket', 'polling']
    });

    socket.current.on('connect', () => {
      socket.current.emit('username', authState.username);
    });

    socket.current.on('users', users => {
>>>>>>> WebRTC
      setUsers(users);
      console.log(users);
    });

<<<<<<< HEAD
    socketRef.current.on("connected", user => {
      setUsers([...users, user]);
      console.log(users)
    });

    socketRef.current.on("disconnected", id => {
      console.log(id); 
=======
    socket.current.on('connected', user => {
      console.log(user.name + ' conneceted');
    });

    socket.current.on('disconnected', id => {
      console.log(id);
>>>>>>> WebRTC
      setUsers(users => {
        return users.filter(user => user.id !== id);
      });
    });

    socket.current.on('romInvitasjon', romInfo => {
      setRoom(romInfo.romID, romInfo.from);
    });

    socket.current.on('offer', handleOffer);

    socket.current.on('answer', handleAnswer);

    socket.current.on('ice-candidate', handleNewICECandidateMsg);
  }, []);

  const onUserClick = toUser => {
    if (toUser.id !== socket.current.id) {
      otherUser.current = toUser.id;
      console.log('USER CLCKED', toUser);
      let romID = createRoom();
      const romInfo = {
        target: toUser.id,
        from: socket.current.id,
        romID: romID
      };
      socket.current.emit('roomID', romInfo);
    } else {
      console.log('Du kan ikke snakke med deg selv');
    }
  };

  function createRoom() {
    const id = uuid();
    history.push(`/chat/${id}`);
    return id;
  }

  function setRoom(id, from) {
    let vilSnakke = window.confirm('Vil du snakke med' + from);
    if (vilSnakke) {
      otherUser.current = from;
      history.push(`/chat/${id}`);
      startSamtale(from);
    }
  }

  function startSamtale(userID) {
    console.log('1: Starter samtale');
    peerRef.current = createPeer(userID);
    sendChannel.current = peerRef.current.createDataChannel('sendChannel');
    console.log("Jeg oppretter connection");
    sendChannel.current.onopen = handleOnOpen;
    sendChannel.current.onmessage = handleReceiveMessage;
  }

  function handleOnOpen() {
    console.log('onopen');
    console.log(sendChannel.current);
  }

  function createPeer(userID) {
    console.log('2: Lager peer med id ' + userID);
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.stunprotocol.org'
        }
      ]
    });
    peer.onicecandidate = handleICECandidateEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);
    console.log(peer);
    return peer;
  }

  function handleReceiveMessage(e) {
    setMessages(messages => [...messages, { yours: false, value: e.data }]);
  }

  function sendMessage() {
    if (text.length) {
      sendChannel.current.send(text);
      setMessages(messages => [...messages, { yours: true, value: text }]);
      setText('');
    }
<<<<<<< HEAD
    
    WebRTCConnection.createOffer().then((localDescription) => {
      WebRTCConnection.setLocalDescription(localDescription);
    });

    setTimeout(() => { socketRef.current.emit('offer', offer, toUser); }, 250);
=======
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
    console.log("6: offer");
    peerRef.current = createPeer();
    peerRef.current.ondatachannel = (event) => {
      console.log("plis")
      sendChannel.current = event.channel;
      sendChannel.current.onopen = handleOnOpen;
      sendChannel.current.onmessage = handleReceiveMessage;
    };
    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.current
      .setRemoteDescription(desc)
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
    peerRef.current.setRemoteDescription(desc).catch(e => console.log(e));
    console.log('Skal være koblet sammen');
  }

  function handleICECandidateEvent(e) {
    if (e.candidate) {
      console.log("4 er kandidat")
      const payload = {
        target: otherUser.current,
        candidate: e.candidate
      };
      console.log(payload.target);
      socket.current.emit('ice-candidate', payload);
    }
  }

  function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);
    console.log("5 : " + candidate);
    peerRef.current.addIceCandidate(candidate).catch(e => console.log(e));
  }
>>>>>>> WebRTC

  function handleChange(e) {
    setText(e.target.value);
  }

  return (
    <Chatbox
      users={users}
      messages={messages}
      text={text}
      onUserClick={user => onUserClick(user)}
      handleChange={e => handleChange(e)}
      sendMessage = {sendMessage}
    />
    
  );
};

export default Chat;
