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
      setUsers(users);
      console.log(users);
    });

    socket.current.on('connected', user => {
      console.log(user.name + ' conneceted');
    });

    socket.current.on('disconnected', id => {
      console.log(id);
      setUsers(users => {
        return users.filter(user => user.id !== id);
      });
    });

    socket.current.on('romInvitasjon', romInfo => {
      setRoom(romInfo.romID, romInfo.from);
    });

    socket.current.on('akseptert', id => {
      akseptertRom(id);
      alert('Dere er nå connected');
    });

    socket.current.on('avslaatt', giAvslaattBeskjed);

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

  function giAvslaattBeskjed() {
    console.log("koffor e eg her")
    alert("Kunne ikke akseptere")
  }
  function createRoom() {
    const id = uuid();
    return id;
  }

  function akseptertRom(id) {
    history.push(`/chat/${id}`);
  }

  function setRoom(id, from) {
    let vilSnakke = window.confirm('Vil du snakke med' + from);
    if (vilSnakke) {
      otherUser.current = from;
      history.push(`/chat/${id}`);
      startSamtale(from);
      let svar = {
        id: id,
        from: from
      };
      socket.current.emit('akseptert', svar);
    } else {
      socket.current.emit('avslaa', from);
    }
  }

  function startSamtale(userID) {
    peerRef.current = createPeer(userID);
    sendChannel.current = peerRef.current.createDataChannel('sendChannel');
    sendChannel.current.onopen = handleOnOpen;
    sendChannel.current.onmessage = handleReceiveMessage;
  }

  function handleOnOpen() {
    console.log('onopen');
    console.log(sendChannel.current);
  }

  function createPeer(userID) {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.stunprotocol.org'
        }
      ]
    });
    peer.onicecandidate = handleICECandidateEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);
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
    peerRef.current.ondatachannel = event => {
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
  }

  function handleICECandidateEvent(e) {
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

  const onKeyDown = e => {
    if (e.keyCode === 13) {
      sendMessage();
    }
  };

  return (
    <Chatbox
      users={users}
      messages={messages}
      text={text}
      onUserClick={user => onUserClick(user)}
      handleChange={e => handleChange(e)}
      sendMessage={sendMessage}
      onKeyDown={onKeyDown}
      otherUser={otherUser.current}
    />
  );
};

export default Chat;
