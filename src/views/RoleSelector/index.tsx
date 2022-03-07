import UserInfoContext from "contexts/UserInfoContext";
import React, { useContext } from "react";
import "./style.css";

const RoleSelector = () => {
  const { selectRole } = useContext(UserInfoContext);
  return (
    <div>
      <h1>Role Selector</h1>
      <div className="options">
        <div
          onClick={() => {
            selectRole("Deploy");
          }}
          className="optionItem"
        >
          Create contract
        </div>
        <div
          onClick={() => {
            selectRole("Attach");
          }}
          className="optionItem"
        >
          Insert contract
        </div>
      </div>
    </div>
  );
};

export default RoleSelector;
