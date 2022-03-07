import PaperHandIcon from "assets/icons/paperHand";
import RockHandIcon from "assets/icons/rockHand";
import ScissorsHandIcon from "assets/icons/scissorsHand";
import UserInfoContext from "contexts/UserInfoContext";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

const HandSelector = () => {
  const { selectHand } = useContext(UserInfoContext);
  const navigate = useNavigate();
  return (
    <div>
      <h1>Select a hand</h1>
      <div className="options">
        <button
          className="optionItem hand"
          onClick={() => {
            selectHand(0);
            navigate("/connect");
          }}
        >
          <RockHandIcon
            colors={{
              insideLine: "black",
              outsideLine: "purple",
              fill: "white",
            }}
            height={250}
          />
          Rock
        </button>
        <button
          className="optionItem hand"
          onClick={() => {
            selectHand(1);
            navigate("/connect");
          }}
        >
          <PaperHandIcon
            colors={{
              insideLine: "black",
              outsideLine: "purple",
              fill: "white",
            }}
            height={250}
          />
          Paper
        </button>
        <button
          className="optionItem hand"
          onClick={() => {
            selectHand(2);
            navigate("/connect");
          }}
        >
          <ScissorsHandIcon
            colors={{
              insideLine: "black",
              outsideLine: "purple",
              fill: "white",
            }}
            height={250}
          />
          Scissors
        </button>
      </div>
    </div>
  );
};

export default HandSelector;
