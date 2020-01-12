import React from "react";
import logo from "./logo.svg";
import "./App.css";
import rootReducer from "./rootReducer";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import MainApp from "./MainApp";
import ReduxThunk from "redux-thunk";

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));
const App = () => {
  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <MainApp />
    </div>
  );
};

const appWithStore = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default appWithStore;
