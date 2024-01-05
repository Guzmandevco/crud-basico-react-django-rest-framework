import React from "react";
import ReactDOM from "react-dom";
import { DataContextProvider } from "./context/DataContext";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import AuthProvider from "./context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
        <DataContextProvider>
          <App />
        </DataContextProvider>
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);
