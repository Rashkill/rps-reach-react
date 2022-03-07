import HandIcon from "components/HandIcon";
import UserInfoContext, { HANDS } from "contexts/UserInfoContext";
import React, { useContext } from "react";
import "./style.css";

const ResultsScreen = () => {
  const { hand, otherHand, outcome } = useContext(UserInfoContext);
  return (
    <div>
      <h1>{outcome}!</h1>
      <div
        className="infoBox"
        style={{
          backgroundColor: outcome.includes("win")
            ? "rgba(50,255,50,0.4)"
            : "rgba(255,50,50,0.4)",
        }}
      >
        <h3>Your hand</h3>
        <div className="handsPanel">
          {HANDS.map((name, index) => (
            <HandIcon
              handNumber={index}
              disabled={Number(hand) !== index}
              size={125}
              handName={name}
            />
          ))}
        </div>
      </div>
      <div
        className="infoBox"
        style={{
          backgroundColor: !outcome.includes("win")
            ? "rgba(50,255,50,0.4)"
            : "rgba(255,50,50,0.4)",
        }}
      >
        <h3>Oponent hand</h3>
        <div className="handsPanel">
          {HANDS.map((name, index) => (
            <HandIcon
              handNumber={index}
              disabled={Number(otherHand) !== index}
              size={125}
              handName={name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
