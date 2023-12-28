import { createContext, useState } from 'react';

export const LoggingContext = createContext();
export const LoggingContextProvider = ({ children }) => {
  const [loged, setLoged] = useState(false);
  const [token, setToken] = useState(null);
  const [userData, setUserData] = useState({
    username: "",
    email: ""
  });
 
  const data = {
    loged,
    setLoged,
    token,
    setToken,
    setUserData,
    userData
  };
  return (
  <LoggingContext.Provider value={data}>
  { children }
  </LoggingContext.Provider>
  );
}