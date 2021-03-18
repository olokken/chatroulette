import React from 'react';
import styled from 'styled-components';
import OnlineUsers from '../OnlineUsers/OnlineUsers';
import { TextField, Button, Grid } from '@material-ui/core';

const Container = styled.div`
  height: 100vh;
  width: 100%;
`;

const StyledMessages = styled.div``;

const StyledSendMessage = styled.div``;

const StyledChat = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 90%;
  padding: 3rem;
`;

const StyledHeader = styled.h2`
  text-align: left;
`;

const chatbox = props => {
  return (
    <Container>
      <Grid className="h100" container>
        <Grid item md={4}>
          <OnlineUsers /*connected = {props.connected}*/ ></OnlineUsers>
        </Grid>
        <Grid item md={8}>
          <StyledChat>
            <div>
              <StyledHeader>
                Her skal det stå navnet på Hvem du chatter med
              </StyledHeader>
              <StyledMessages>
                Her skal det komme meldinger, men ikke helt enda hehe :-)
              </StyledMessages>
            </div>
            <StyledSendMessage>
              <TextField
                style={{ width: '100%', marginBottom: 24, background: '#fff' }}
                label="ENTER MESSAGE"
                variant="outlined"
              />
              <Button
                style={{ width: '100%' }}
                variant="contained"
                color="secondary"
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
