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

const StyledMessages = styled.div`
  position: left;
  width: 70%;
  height: relative;
  padding: 5px;
  background-color: none;
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

const chatbox = ({users, messages, text, onUserClick, handleChange, sendMessage}) => {
  return (
    <Container>
      <Grid className="h100" container>
        <Grid item md={4}>
          <OnlineUsers users={users} onUserClick={user => onUserClick(user)} />
        </Grid>
        <Grid item md={8}>
          <StyledChat>
            <StyledHeader>
              <p>Du snakker med ....</p>
            </StyledHeader>
            <StyledMessageContainer>
              {messages.map(message => (
                <StyledMessages key = {message.data}>{message}</StyledMessages>
              ))}
            </StyledMessageContainer>
            <StyledSendMessage>
              <TextField
                style={{ width: '100%', marginBottom: 24, background: '#fff' }}
                label="ENTER MESSAGE"
                variant="outlined"
                onChange = {handleChange}
                value = {text}
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
