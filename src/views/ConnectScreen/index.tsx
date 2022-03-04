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
        <h5>
          Pass this <code>{contractInfo}</code>
        </h5>
      ) : (
        <input type="text" onChange={(e) => setCtcInfo(e.target.value)} />
      )}
      <button onClick={() => runAction(1, ctcInfo)}>Ok</button>
    </div>
  );
};

export default ConnectScreen;
