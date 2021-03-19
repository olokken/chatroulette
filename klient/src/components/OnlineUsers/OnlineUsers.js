import React, {useState} from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const StyledDiv = styled.div`
  //border-right: ridge grey 1px;
  min-width: 60%;
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
  padding:6px;
  margin:10px;
  
`;

const StyledUser = styled.div`
  background-color: black;
  width: 100px;
`;

const StyledUserCard = styled.div`
  width: wrap;
  margin: 4px;
  padding-left: 5px;
  user-select: none;
  &:hover{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius:10px;
  } ;
  &:active{
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.6);
    box-shadow: inset 0 0 6px rgba(0,0,0,0.6);
  }
`;

const OnlineUsers = ({users, onUserClick}) => {
  const [searchText, setSearchText] = useState('')
  return (
    <StyledDiv>
      <TextField
        onChange = {e => setSearchText(e.target.value)}
        placeholder="Search"
        style={{
          width: '80%',
          marginTop: '5px',
          marginLeft: '3px',
          minHeight: '20px',
          color: 'white'
        }}
      ></TextField>
      <StyledUsers>
       <b>Brukerne:</b> <br></br>
        {users.filter((user) => {
          if(searchText == ""){
            return user
          }else if(user.name != null && user.name.toLowerCase().includes(searchText.toLocaleLowerCase())){
            return user
          }
        }).map(user => (
          <StyledUserCard key={user.id} onClick={() => onUserClick(user)}>{user.name}</StyledUserCard>
        ))}
      </StyledUsers>
    </StyledDiv>
  );
};

export default OnlineUsers;
