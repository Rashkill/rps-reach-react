import React from "react";
import { useLocation } from "react-router-dom";

type Params = { role: string };

const ConnectScreen = () => {
  const { state } = useLocation();
  return (
    <div>
      <h2>You are {(state as Params).role}</h2>
      <h4>
        You role is to{" "}
        {(state as Params).role === "Alice"
          ? "deploy the backend"
          : "paste the contract"}
      </h4>
    </div>
  );
};

export default ConnectScreen;
