import React from "react";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Notecard, NotecardRow } from "./Notecard";

describe("Notecard", () => {
  it("renders the title text", () => {
    render(
      <Notecard label="Recipe Name" text="Chocolate Cake">
        <div />
      </Notecard>,
    );
    expect(screen.getByText("Chocolate Cake")).toBeDefined();
  });

  it("has an accessible label on the title", () => {
    render(
      <Notecard label="Recipe Name" text="Chocolate Cake">
        <div />
      </Notecard>,
    );
    expect(screen.getByLabelText("Recipe Name")).toBeDefined();
  });

  it("renders children", () => {
    render(
      <Notecard label="Recipe Name" text="Chocolate Cake">
        <div>Child Content</div>
      </Notecard>,
    );
    expect(screen.getByText("Child Content")).toBeDefined();
  });
});

describe("NotecardRow", () => {
  it("renders the text", () => {
    render(<NotecardRow text="Some ingredient" />);
    expect(screen.getByText("Some ingredient")).toBeDefined();
  });

  it("renders with normal font weight by default", () => {
    render(<NotecardRow text="Some ingredient" />);
    expect(
      (screen.getByText("Some ingredient") as HTMLElement).style.fontWeight,
    ).toBe("normal");
  });

  it("renders with bold font weight when isBold is true", () => {
    render(<NotecardRow text="Ingredients:" isBold={true} />);
    expect(
      (screen.getByText("Ingredients:") as HTMLElement).style.fontWeight,
    ).toBe("bold");
  });
});
