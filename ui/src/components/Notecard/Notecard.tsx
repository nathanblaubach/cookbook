import React from "react";
import "./Notecard.css";

type NotecardProps = {
  children: React.ReactNode;
  label: string;
  text: string;
  onTextChange?: (event: string) => void | undefined;
};

export function Notecard({
  children,
  label,
  text,
}: Readonly<NotecardProps>): React.JSX.Element {
  return (
    <div className="notecard">
      <div className="notecard-row notecard-row-title">
        <h1 aria-label={label} className="notecard-text notecard-text-title">
          {text}
        </h1>
      </div>
      {children}
    </div>
  );
}

type NotecardRowProps = {
  text: string;
  isBold?: boolean;
};

export function NotecardRow({
  text,
  isBold = false,
}: Readonly<NotecardRowProps>): React.JSX.Element {
  return (
    <div className="notecard-row notecard-row-border">
      <p
        className="notecard-text notecard-text-font"
        style={{ fontWeight: isBold ? "bold" : "normal" }}
      >
        {text}
      </p>
    </div>
  );
}
