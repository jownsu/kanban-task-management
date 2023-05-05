import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store.ts";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/sass/index.scss";

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>,
)
 