import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AuthContextProvider from "./store/AuthContext.jsx";
import ToastContextProvider from "./store/ToastContext.jsx";
import store from "./store/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ToastContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ToastContextProvider>
  </Provider>,
);
