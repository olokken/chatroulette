import React , { useState, createContext }from 'react';
import { BrowserRouter } from 'react-router-dom';
import './App.css';
import Routes from './Routes';

export const AuthContext = createContext({
  authState: null,
  setAuthState: () => {}
  });

function App() {
  const [authState, setAuthState] = useState({username: null}); 

  return (
    <BrowserRouter >
      <div className="App">
        <AuthContext.Provider value={{authState, setAuthState}}>{Routes}</AuthContext.Provider>
      </div>
    </BrowserRouter>
  );
}

export default App;
