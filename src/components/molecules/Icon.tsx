import {Tooltip} from "primereact/tooltip";
import type {CSSProperties} from "react";

export interface IconProps {
  iconClassName: string;
  iconStyle?: CSSProperties;
  tooltip?: {
    text: string;
    position?: string;
    showDelay?: number;
  }
}

export default function Icon(props: IconProps) {
  const {iconClassName, iconStyle, tooltip} = props;
  const target = `${Date.now()}`;

  return (
    <>
      {tooltip && <Tooltip target={`.tooltip-icon-${target}`}/>}
      <i
        className={`tooltip-icon-${target} ${iconClassName}`}
        style={iconStyle}
        data-pr-tooltip={tooltip?.text}
        data-pr-position={tooltip?.position ?? "top"}
        data-pr-showdelay={tooltip?.showDelay ?? 300}
      >
      </i>
    </>
  );
}