import React, { KeyboardEvent, useState } from "react";
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

type NotecardFormProps = {
  children: React.ReactNode;
  label: string;
  text: string;
  onTextChange: (event: string) => void;
};

export function NotecardForm({
  children,
  label,
  text,
  onTextChange,
}: Readonly<NotecardFormProps>): React.JSX.Element {
  return (
    <div className="notecard">
      <div className="notecard-row notecard-row-title">
        <input
          className="notecard-text notecard-text-title"
          aria-label={label}
          placeholder={label}
          value={text}
          ref={(input) => input?.focus()}
          onInput={(event) => onTextChange(event.currentTarget.value)}
        />
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

type NotecardListFieldParams = {
  rows: string[];
  placeholder: string;
  onRowsChange: (rows: string[]) => void;
};

function swapArrayValuesAtIndices(
  arrayValues: string[],
  leftIndex: number,
  rightIndex: number,
): string[] {
  const temp: string = arrayValues[leftIndex];
  arrayValues[leftIndex] = arrayValues[rightIndex];
  arrayValues[rightIndex] = temp;
  return arrayValues;
}

function keyPressedIs(
  event: KeyboardEvent<HTMLInputElement>,
  value: number,
): boolean {
  event = event || window.event;
  return event.which === value || event.keyCode === value;
}

function isBackspacePress(event: KeyboardEvent<HTMLInputElement>): boolean {
  return keyPressedIs(event, 8);
}

function isEnterPress(event: KeyboardEvent<HTMLInputElement>): boolean {
  return keyPressedIs(event, 13);
}

const UpArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 30"
    width="100%"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="3"
    stroke="#333"
  >
    <polyline points="10,15 15,10 20,15" fill="none" />
    <line x1="15" y1="10" x2="15" y2="20" />
  </svg>
);

const DownArrow = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 30"
    width="100%"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="3"
    stroke="#333"
  >
    <polyline points="10,15 15,20 20,15" fill="none" />
    <line x1="15" y1="10" x2="15" y2="20" />
  </svg>
);

const Remove = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 30 30"
    width="100%"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="3"
    stroke="#333"
  >
    <line x1="10" y1="10" x2="20" y2="20" />
    <line x1="10" y1="20" x2="20" y2="10" />
  </svg>
);

export function NotecardListField({
  rows,
  placeholder,
  onRowsChange,
}: Readonly<NotecardListFieldParams>): React.JSX.Element {
  const [items, setItems] = useState<string[]>(rows);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  function moveUp(index: number): void {
    if (index > 0) {
      const newItems = swapArrayValuesAtIndices(items, index, index - 1);
      setSelectedIndex(index - 1);
      setItems(newItems);
      onRowsChange(newItems);
    }
  }

  function moveDown(index: number): void {
    if (index < items.length - 1) {
      const newItems = swapArrayValuesAtIndices(items, index, index + 1);
      setSelectedIndex(index + 1);
      setItems(newItems);
      onRowsChange(newItems);
    }
  }

  function createAtIndex(index: number, item: string): void {
    const newItems = [
      ...items.slice(0, index),
      item,
      ...items.slice(index, items.length),
    ];
    setSelectedIndex(index);
    setItems(newItems);
    onRowsChange(newItems);
  }

  function updateAtSelectedIndex(value: string): void {
    const newItems = items;
    newItems[selectedIndex] = value;
    setItems(newItems);
    onRowsChange(newItems);
  }

  function deleteAtIndex(index: number): void {
    const newItems = [
      ...items.slice(0, index),
      ...items.slice(index + 1, items.length),
    ];
    setItems(newItems);
    if (items.length === 0) {
      createAtIndex(0, "");
    } else if (selectedIndex > 0) {
      setSelectedIndex(selectedIndex - 1);
      onRowsChange(newItems);
    }
  }

  function handleKeysAtSelectedIndex(
    event: KeyboardEvent<HTMLInputElement>,
  ): void {
    if (
      isBackspacePress(event) &&
      items[selectedIndex] === "" &&
      selectedIndex > 0
    ) {
      event.preventDefault();
      deleteAtIndex(selectedIndex); // Delete the currently selected line
    } else if (isEnterPress(event)) {
      createAtIndex(selectedIndex + 1, ""); // Create a new line below
    }
  }

  return (
    <>
      {" "}
      {items.map((item, index) => (
        <div key={index} className="notecard-row notecard-row-edit">
          <input
            className="notecard-text notecard-text-edit"
            placeholder={placeholder}
            value={item}
            ref={(input) =>
              (selectedIndex === index && input?.focus()) || undefined
            }
            onFocus={() => setSelectedIndex(index)}
            onBlur={() => setSelectedIndex(-1)}
            onInput={(event) =>
              updateAtSelectedIndex(event.currentTarget.value)
            }
            onKeyDown={handleKeysAtSelectedIndex}
          />
          <button onClick={() => moveUp(index)}>{UpArrow}</button>
          <button onClick={() => moveDown(index)}>{DownArrow}</button>
          <button onClick={() => deleteAtIndex(index)}>{Remove}</button>
        </div>
      ))}{" "}
    </>
  );
}
