import React from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const StyledDiv = styled.div`
  border-right: solid yellow 1px;
  min-width: 30%;
  min-height: 100%;
  border-radius: 25px;
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

const OnlineUsers = props => {
  return (
    <StyledDiv>
      <TextField
        placeholder="Search"
        style={{
          width: '100%',
          marginTop: '5px',
          marginLeft: '3px',
          minHeight: '20px'
        }}
      ></TextField>
      <StyledUsers>
        Her skal det komme opp de brukerne <br></br>
        Som er innpå chatteappen vår :-)
        {/*Her kan du mappe de tilkoblede brukerene du får fra props*/}
      </StyledUsers>
    </StyledDiv>
  );
};

export default OnlineUsers;
