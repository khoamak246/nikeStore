import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./App/Store";
import { Toaster } from "react-hot-toast";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <Provider store={Store}>
      <Toaster position="top-center" reverseOrder={true} />
      <App />
    </Provider>
  </BrowserRouter>
  /* </React.StrictMode> */
);
