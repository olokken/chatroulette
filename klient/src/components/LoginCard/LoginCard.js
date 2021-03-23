import React from 'react';
import { TextField, Button } from '@material-ui/core';
import styled from 'styled-components';


const LoginCardContainer = styled.div`
  width: 30rem;
  height: 28rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 3rem;
  border-radius: 8px;
`;

const LoginCard = props => {
  return (
    <LoginCardContainer>
      <h1>Login</h1>
      <hr />
      <TextField
        style={{ width: '100%', marginBottom: 24 }}
        label="Username"
        onChange={props.onChange}
        onKeyDown={props.onKeyDown}
        variant="outlined"
      />
      <Button
        style={{ width: '100%' }}
        variant="contained"
        color="secondary"
        onClick={props.onLogin}
      >
        Enter chat room
      </Button>
    </LoginCardContainer>
  );
};

export default LoginCard;
