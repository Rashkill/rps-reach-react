import UserInfoContext from "contexts/UserInfoContext";
import React, { useContext } from "react";
import "./style.css";

const RoleSelector = () => {
  const { selectRole } = useContext(UserInfoContext);
  return (
    <div>
      <h1>Role Selector</h1>
      <div className="options">
        <button
          onClick={() => {
            selectRole("Deploy");
          }}
          className="optionItem"
        >
          Create contract
        </button>
        <button
          onClick={() => {
            selectRole("Attach");
          }}
          className="optionItem"
        >
          Insert contract
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
