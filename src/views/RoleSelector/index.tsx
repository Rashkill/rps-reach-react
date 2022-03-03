import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const RoleSelector = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Role Selector</h1>
      <div className="options">
        <button
          onClick={() => navigate("connect", { state: { role: "Alice" } })}
          className="optionItem"
        >
          Alice
        </button>
        <button
          onClick={() => navigate("connect", { state: { role: "Bob" } })}
          className="optionItem"
        >
          Bob
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
