import { createRoot } from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App.jsx";
import AuthContextProvider from "./store/AuthContext.jsx";
import ToastContextProvider from "./store/ToastContext.jsx";
import store from "./store/store.js";
import { queryClient } from "./util/tanstack.js";

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <ToastContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ToastContextProvider>
    </Provider>
  </QueryClientProvider>,
);
