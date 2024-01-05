import { DataContextProvider } from "./context/DataContext.jsx";
import { LoggingContextProvider } from "./context/LogginContext.jsx";
import { BrowserRouter } from "react-router-dom";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import AuthProvider from "./context/AuthProvider";
ReactDOM.createRoot(document.getElementById("root")).render(
  <LoggingContextProvider>
    <DataContextProvider>
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </DataContextProvider>
  </LoggingContextProvider>
);
