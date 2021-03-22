import React, {useState, createContext, useContext} from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import LoginCard from '../components/LoginCard/LoginCard';
import { AuthContext } from '../App';

const LoginContainer = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const Login = () => {
  const [username, setUsername] = useState(''); 
  const {setAuthState} = useContext(AuthContext); 
  const history = useHistory();

  const onChange = (event) => {
    setUsername(event.target.value);
  }

  const onLogin = () => {
    setAuthState({username: username}); 
    history.push('/chat');
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onLogin();
    }
  }


  return (
    <LoginContainer>
      <LoginCard   onKeyDown={onKeyDown} onLogin = {onLogin} onChange = {onChange}></LoginCard>
    </LoginContainer>
  );
};

export default Login;
