import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./pages/Home";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <div className="App">
            <Home />
      </div>
    </Provider>
  );
};

export default App;
