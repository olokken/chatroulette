import React from 'react';
import styled from 'styled-components';
import OnlineUsers from '../OnlineUsers/OnlineUsers';
import { TextField, Button, Grid } from '@material-ui/core';

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const StyledOwnMessages = styled.div`
  position: right;
  width: 70%;
  height: relative;
  background-color: white;
  margin: 3px;
`;

const StyledMessages = styled.fieldset`
  position: left;
  float:right;
  width: 50%;
  height: relative;
  padding: 5px;
  background-color: none;
  margin: 3px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

const StyledMessagesPeer = styled.fieldset`
  position: left;
  float:left;
  width: 50%;
  height: relative;
  padding: 5px;
  background-color: blue;
  margin: 3px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`; 

const StyledSendMessage = styled.div``;
const StyledLable = styled.div`
  font-size: small;
  
`;

const StyledMessageContainer = styled.div`
  color: white;
  width: 100%;
  
  height: 40vh;
  overflow: hidden;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 20px;
  }
  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  ::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
`;

const StyledChat = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80%;
  padding: 3rem;


`;

const StyledHeader = styled.h2`
  text-align: left;
  margin: 0px;
  color: white;
`;


function checkMessage(message, index, users, otherUser, myID){
    let you = getUserName(users, otherUser)
    let me = getUserName(users, myID)
    pushDownScrollbar()
    if(message.yours) {
      console.log("min melding")
      return (
        <StyledMessages key={index}>
         <legend>{me}</legend>{message.value}
        </StyledMessages>
    )
    } else {
      return (
          <StyledMessagesPeer key = {index}>
            <legend>{you}</legend>{message.value}
          </StyledMessagesPeer>
      )
    }
  }

function getUserName(users,id){
  let otherUserName = '';
  users.forEach(x => {
    if(x.id == id){
        otherUserName = x.name;
    }
  })
  return otherUserName;
}

function pushDownScrollbar(){
  setTimeout(() => {
        document.getElementById("hei").scrollTop = document.getElementById("hei").scrollHeight 
      }, 1);
}


const chatbox = ({users, messages, text, onUserClick, handleChange, sendMessage, onKeyDown, otherUser,myID}) => {
  return (
    <Container>
      <Grid className="h100" container>
        <Grid item md={4}>
          <OnlineUsers users={users} onUserClick={user => onUserClick(user)} />
        </Grid>
        <Grid item md={8}>
          <StyledChat>
            <StyledHeader>
              <p>Du snakker med {getUserName(users, otherUser)}</p>
            </StyledHeader>
            <StyledMessageContainer id="hei">
              {messages.map((message, index) => (
                checkMessage(message, index, users, otherUser, myID)
              ))
              }
            </StyledMessageContainer>
            <StyledSendMessage>
              <TextField
                style={{ width: '100%', marginBottom: 24, background: '#fff' }}
                label="ENTER MESSAGE"
                variant="outlined"
                value = {text}
                onChange = {handleChange}
                onKeyDown = {onKeyDown}
              />
              <Button
                style={{ width: '100%' }}
                variant="contained"
                color="secondary"
                onClick= {sendMessage}
              >
                Send Message
              </Button>
            </StyledSendMessage>
          </StyledChat>
        </Grid>
      </Grid>
    </Container>
  );
};

export default chatbox;
