import {Button} from "primereact/button";
import React from "react";

export interface IDialOption {
  label: string;
  icon: string;
  severity?: "secondary" | "success" | "info" | "warning" | "danger" | "help" | "contrast" | undefined;
  command: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export interface DialOptionsProps {
  options: IDialOption[];
}

export default function DialOptions({options}: DialOptionsProps) {
  return (
    <div className="flex flex-column mt-3 gap-1">
      {options.map((option, index) => {
        return (
          <Button
            key={index}
            tooltip={option.label}
            tooltipOptions={{
              position: "left",
              showDelay: 500,
            }}
            severity={option.severity}
            className="animate__animated animate__zoomIn"
            style={{scale: 0.8, animationDelay: `${index * 100}ms`, animationDuration: "100ms"}}
            icon={option.icon}
            rounded
            onClick={(event) => option.command(event)}
          />
        );
      })}
    </div>
  );
}
