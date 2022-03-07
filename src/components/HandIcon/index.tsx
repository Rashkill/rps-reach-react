import PaperHandIcon from "assets/icons/paperHand";
import RockHandIcon from "assets/icons/rockHand";
import ScissorsHandIcon from "assets/icons/scissorsHand";
import React, { useMemo } from "react";

type HandIconProps = {
  handNumber: number;
  handName?: string;
  size?: number;
  disabled?: boolean;
};

const defColors = {
  insideLine: "black",
  outsideLine: "purple",
  fill: "white",
};

const HandIcon: React.FC<HandIconProps> = ({
  handNumber,
  handName,
  size = 250,
  disabled,
}) => {
  const icon = useMemo(() => {
    switch (handNumber) {
      case 0:
        return (
          <RockHandIcon
            colors={defColors}
            height={size}
            width={size}
            opacity={disabled ? 0.4 : 1}
          />
        );
      case 1:
        return (
          <PaperHandIcon
            colors={defColors}
            height={size}
            width={size}
            opacity={disabled ? 0.4 : 1}
          />
        );
      case 2:
        return (
          <ScissorsHandIcon
            colors={defColors}
            height={size}
            width={size}
            opacity={disabled ? 0.4 : 1}
          />
        );

      default:
        return <></>;
    }
  }, [handNumber, defColors, size, disabled]);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {icon}
      <div style={{ opacity: disabled ? 0.2 : 1 }}>{handName}</div>
    </div>
  );
};

export default HandIcon;
