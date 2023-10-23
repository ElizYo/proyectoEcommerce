import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; // Importa Provider solo una vez
import { createStore, applyMiddleware } from "redux";
import { BrowserRouter } from "react-router-dom";
import App from "./components/app";
import store  from "./reducers/store";

//ESTE ES EL INDEX DEL INDIO
//createStoreWithMiddleware.dispatch({sasas})

import "./style/main.scss";

function main() {
  ReactDOM.render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.querySelector(".app-wrapper")
  );
}

/*function main() {
  ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>,
    document.querySelector(".app-wrapper")
  );
}*/

document.addEventListener("DOMContentLoaded", main);
