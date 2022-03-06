import UserInfoContext from "contexts/UserInfoContext";
import React, { useContext, useState } from "react";

const ConnectScreen = () => {
  const { role, contractInfo, runAction } = useContext(UserInfoContext);
  const [ctcInfo, setCtcInfo] = useState("");
  return (
    <div>
      <h2>You are {role}</h2>
      <h4>
        You role is to{" "}
        {role === "Deploy" ? "deploy the backend" : "paste the contract"}
      </h4>
      {role === "Deploy" ? (
        <h5>{contractInfo && `Pass this ${contractInfo}`}</h5>
      ) : (
        <input type="text" onChange={(e) => setCtcInfo(e.target.value)} />
      )}
      {!contractInfo && (
        <button onClick={() => runAction(1, ctcInfo)}>
          {role === "Deploy" ? "Deploy" : "Send"}
        </button>
      )}
    </div>
  );
};

export default ConnectScreen;
