import React, {useState, createContext} from 'react';
import { TextField, Button } from '@material-ui/core';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginCard = styled.div`
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

export const LoginContext = createContext({
  username: '',
  setUsername: () => {},
  })

const Login = () => {
  const [username, setUsername] = useState('');

  const history = useHistory();

  const onChange = (event) => {
    setUsername(event.target.value);
  }

  const onLogin = () => {
    history.push('/');
  }

  return (
    <LoginContainer>
      <LoginCard>
        <h1>Login</h1>
        <hr />
        <TextField
          style={{ width: '100%', marginBottom: 24 }}
          label="Username"
          onChange={onChange}
          variant="outlined"
        />
        <Button style={{ width: '100%' }} variant="contained" color="secondary" onClick={onLogin}>
          Enter chat room
        </Button>
      </LoginCard>
    </LoginContainer>
  );
};

export default Login;
