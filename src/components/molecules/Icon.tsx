import {Tooltip} from "primereact/tooltip";

export interface IconProps {
  iconClassName: string;
  tooltip?: {
    text: string;
    position?: string;
    showDelay?: number;
  }
}

export default function Icon(props: IconProps) {
  const {iconClassName, tooltip} = props;
  const target = `${Date.now()}`;

  return (
    <>
      {tooltip && <Tooltip target={`.tooltip-icon-${target}`}/>}
      <i className={`tooltip-icon-${target} ${iconClassName}`}
         data-pr-tooltip={tooltip?.text}
         data-pr-position={tooltip?.position ?? "top"}
         data-pr-showdelay={tooltip?.showDelay ?? 300}
      >
      </i>
    </>
  );
}