import UserInfoContext from "contexts/UserInfoContext";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";

const RoleSelector = () => {
  const { selectRole } = useContext(UserInfoContext);
  const navigate = useNavigate();
  return (
    <div>
      <h1>Role Selector</h1>
      <div className="options">
        <button
          onClick={() => {
            selectRole("Deploy");
            navigate("connect");
          }}
          className="optionItem"
        >
          Alice
        </button>
        <button
          onClick={() => {
            selectRole("Attach");
            navigate("connect");
          }}
          className="optionItem"
        >
          Bob
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
