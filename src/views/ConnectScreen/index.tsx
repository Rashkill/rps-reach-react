import Spinner from "components/Spinner";
import UserInfoContext from "contexts/UserInfoContext";
import React, { useContext, useState } from "react";

const ConnectScreen = () => {
  const { role, contractInfo, loadingContract, runAction } =
    useContext(UserInfoContext);
  const [ctcInfo, setCtcInfo] = useState("");
  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h3>
        Now you need to{" "}
        {role === "Deploy" ? "deploy the contract" : "paste the contract"}
      </h3>
      {role === "Deploy" ? (
        contractInfo && (
          <div>
            <h4>
              Pass this contract info: <code>{contractInfo}</code> to the other
              person
            </h4>
            <h5>
              You gonna see the results once your opponent accept the contract
            </h5>
            <h6>May take a while between transactions</h6>
          </div>
        )
      ) : (
        <input type="text" onChange={(e) => setCtcInfo(e.target.value)} />
      )}
      {loadingContract && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          Loading contract information <br />
          This may take a while. (Make sure that you confirm the contract
          deployment on your wallet)
          <Spinner />
        </div>
      )}
      {!contractInfo && (
        <button
          onClick={() => runAction(ctcInfo)}
          disabled={role === "Attach" && !ctcInfo}
        >
          {role === "Deploy" ? "Deploy" : "Send"}
        </button>
      )}
    </div>
  );
};

export default ConnectScreen;
