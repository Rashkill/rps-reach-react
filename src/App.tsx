import React, { useContext } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HandSelector from "views/HandSelector";
import RoleSelector from "views/RoleSelector";
import ConnectScreen from "views/ConnectScreen";
import UserInfoContext from "contexts/UserInfoContext";

const App = () => {
  const { actualAddress, faucet, outcome } = useContext(UserInfoContext);
  return (
    <BrowserRouter>
      <h1>{faucet ? actualAddress : "Error connecting to account"}</h1>
      <div className="App">
        <Routes>
          <Route path="/connect" element={<ConnectScreen />} />
          <Route path="/hands" element={<HandSelector />} />
          <Route path="/" element={<RoleSelector />} />
        </Routes>
        <h4>Outcome: {outcome}</h4>
      </div>
    </BrowserRouter>
  );
};

export default App;
