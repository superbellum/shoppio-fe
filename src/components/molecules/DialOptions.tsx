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
  optionsDirection?: "top" | "bottom";
}

export default function DialOptions({options, optionsDirection = "top"}: DialOptionsProps) {
  return (
    <div className={`flex ${optionsDirection === "top" ? "mb-3 flex-column-reverse" : "mt-3 flex-column"} gap-1`}>
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
            style={{scale: 0.9, animationDelay: `${index * 100}ms`, animationDuration: "100ms"}}
            icon={option.icon}
            rounded
            onClick={(event) => option.command(event)}
          />
        );
      })}
    </div>
  );
}
