import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HandSelector from "views/HandSelector";
import RoleSelector from "views/RoleSelector";
import ConnectScreen from "views/ConnectScreen";

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/connect" element={<ConnectScreen />} />
          <Route path="/hands" element={<HandSelector />} />
          <Route path="/" element={<RoleSelector />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
