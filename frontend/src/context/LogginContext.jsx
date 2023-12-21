import { createContext, useState } from 'react';

export const LoggingContext = createContext();
export const LoggingContextProvider = ({ children }) => {
  const [loged, setLoged] = useState(false);
  const [token, setToken] = useState(null);
 
  const data = {
    loged,
    setLoged,
    token,
    setToken
  };
  return (
  <LoggingContext.Provider value={data}>
  { children }
  </LoggingContext.Provider>
  );
}