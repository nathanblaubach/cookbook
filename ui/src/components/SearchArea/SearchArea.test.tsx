import React from "react";
import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SearchArea } from "./SearchArea";

describe("SearchArea", () => {
  it("renders the search input with the correct aria-label", () => {
    render(
      <SearchArea type="Recipes" searchString="" onSearchStringChange={vi.fn()}>
        <div>Filters</div>
      </SearchArea>,
    );
    expect(screen.getByLabelText("Recipes Search Bar")).toBeDefined();
  });

  it("toggles children visibility when the filter button is clicked", () => {
    render(
      <SearchArea type="Recipes" searchString="" onSearchStringChange={vi.fn()}>
        <div>Filter Content</div>
      </SearchArea>,
    );
    expect(screen.queryByText("Filter Content")).toBeNull();
    const filterButton = screen.getByLabelText("Show Filter Area");
    fireEvent.click(filterButton);
    expect(screen.getByText("Filter Content")).toBeDefined();
    fireEvent.click(filterButton);
    expect(screen.queryByText("Filter Content")).toBeNull();
  });

  it("calls onSearchStringChange when the input value changes", () => {
    const onSearchStringChange = vi.fn();
    render(
      <SearchArea
        type="Recipes"
        searchString=""
        onSearchStringChange={onSearchStringChange}
      >
        <div>Filters</div>
      </SearchArea>,
    );
    fireEvent.change(screen.getByLabelText("Recipes Search Bar"), {
      target: { value: "chicken" },
    });
    expect(onSearchStringChange).toHaveBeenCalledWith("chicken");
  });
});
