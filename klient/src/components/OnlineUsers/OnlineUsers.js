import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const StyledDiv = styled.div`
  border-right: solid 3px;
  min-width: 30%;
  min-height: 100%;
  border-radius: 0px;
`;

const StyledSearchBar = styled.input`
  min-height: 25px;
  min-width: 250px;
  display: block;
  margin: auto;
  margin-top: 15px;
  border-radius: 50px;
`;

const StyledUsers = styled.div`
  margin-top: 20px;
`;

const StyledUser = styled.div`
  background-color: black;
  width: 100px;
`;

const StyledUserCard = styled.div`
  background-color: blue;
  width: 70%;
  margin: 4px;

  
`;

const OnlineUsers = props => {
  const onUserClick = () => {
    console.log('kukken blei klikka')
  }
  return (
    <StyledDiv>
      <TextField
        placeholder="Search"
        style={{
          width: '40%',
          marginTop: '5px',
          marginLeft: '3px',
          minHeight: '20px',
          color: 'white'
        }}
      ></TextField>
      <StyledUsers>
        Her skal det komme opp de brukerne <br></br>
        Som er innpå chatteappen vår :-)
        {props.users.map(user =>(
          <StyledUserCard onClcik={onUserClick}>{user}</StyledUserCard>
        ))
        }
      </StyledUsers>
    </StyledDiv>
  );
};

export default OnlineUsers;
