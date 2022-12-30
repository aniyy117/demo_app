import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppRouter from "./AppRouter";
import { Provider } from "react-redux";
import { storeConfig } from "./app/Redux/storeConfigurations";
import 'react-toastify/dist/ReactToastify.css'; 

export const store = storeConfig();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
