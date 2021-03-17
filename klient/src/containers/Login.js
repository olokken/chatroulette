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
  const [stunServerInfo, setStunServerInfo] = useState('Dette er info fra stunserveren :-)');
  const {setAuthState} = useContext(AuthContext); 
  const history = useHistory();

  const onChange = (event) => {
    setUsername(event.target.value);
  }

  const onLogin = () => {
    setAuthState({username: username, stunServerInfo: stunServerInfo}); 
    history.push('/chat');
  }



  return (
    <LoginContainer>
      <LoginCard onLogin = {onLogin} onChange = {onChange}></LoginCard>
    </LoginContainer>
  );
};

export default Login;
