import { createContext, useState } from "react";

export const DataContext = createContext();
export const DataContextProvider = ({ children }) => {
  const [dark, setDark] = useState(false);
  const data = {
    dark,
    changetheme: setDark,
  };
  return (
    <DataContext.Provider value={data}>
      {/* {setDarkLocalStorage()}; */}
      {children}
    </DataContext.Provider>
  );
};
