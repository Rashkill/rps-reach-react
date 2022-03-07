import UserInfoContext from "contexts/UserInfoContext";
import React, { useContext, useState } from "react";

const ConnectScreen = () => {
  const { role, contractInfo, runAction } = useContext(UserInfoContext);
  const [ctcInfo, setCtcInfo] = useState("");
  return (
    <div>
      <h4>
        You role is to{" "}
        {role === "Deploy" ? "deploy the contract" : "paste the contract"}
      </h4>
      {role === "Deploy" ? (
        contractInfo && (
          <h5>
            Pass this contract info: <code>{contractInfo}</code> to the other
            person
          </h5>
        )
      ) : (
        <input type="text" onChange={(e) => setCtcInfo(e.target.value)} />
      )}
      {!contractInfo && (
        <button onClick={() => runAction(ctcInfo)}>
          {role === "Deploy" ? "Deploy" : "Send"}
        </button>
      )}
    </div>
  );
};

export default ConnectScreen;
