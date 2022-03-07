import React, { useContext } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import HandSelector from "views/HandSelector";
import RoleSelector from "views/RoleSelector";
import ConnectScreen from "views/ConnectScreen";
import UserInfoContext from "contexts/UserInfoContext";
import ResultsScreen from "views/ResultsScreen";

const App = () => {
  const { actualAddress, faucet } = useContext(UserInfoContext);
  return (
    <div>
      <h1>{faucet ? actualAddress : "Error connecting to account"}</h1>
      <div className="App">
        <Routes>
          <Route path="/results" element={<ResultsScreen />} />
          <Route path="/connect" element={<ConnectScreen />} />
          <Route path="/hands" element={<HandSelector />} />
          <Route path="/" element={<RoleSelector />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
