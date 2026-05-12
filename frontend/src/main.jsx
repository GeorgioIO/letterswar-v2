import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import AuthContextProvider from "./store/AuthContext.jsx";
import ToastContextProvider from "./store/ToastContext.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider value={store}>
      <ToastContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ToastContextProvider>
    </Provider>
  </BrowserRouter>,
);
