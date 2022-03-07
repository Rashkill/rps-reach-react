import HandIcon from "components/HandIcon";
import UserInfoContext, { HANDS } from "contexts/UserInfoContext";
import React, { useContext } from "react";

const HandSelector = () => {
  const { selectHand } = useContext(UserInfoContext);
  return (
    <div>
      <h1>Select a hand</h1>
      <div className="options">
        {HANDS.map((name, index) => (
          <div
            className="optionItem hand"
            onClick={() => {
              selectHand(index);
            }}
          >
            <HandIcon handNumber={index} size={200} />
            {name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HandSelector;
