import { describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Filter, FilterItem } from "./Filter";

describe("Filter", () => {
  const items: FilterItem[] = [
    { id: "1", name: "Dessert", checked: false },
    { id: "2", name: "Beverage", checked: true },
  ];

  it("renders the filter type as a heading", () => {
    render(<Filter type="Categories" items={items} onItemsUpdate={vi.fn()} />);
    expect(screen.getByText("Categories")).toBeDefined();
  });

  it("renders a checkbox for each filter item", () => {
    render(<Filter type="Categories" items={items} onItemsUpdate={vi.fn()} />);
    expect(screen.getAllByRole("checkbox").length).toBe(items.length);
  });

  it("renders checked state correctly for each item", () => {
    render(<Filter type="Categories" items={items} onItemsUpdate={vi.fn()} />);
    expect((screen.getByLabelText("Dessert") as HTMLInputElement).checked).toBe(
      false,
    );
    expect(
      (screen.getByLabelText("Beverage") as HTMLInputElement).checked,
    ).toBe(true);
  });

  it("calls onItemsUpdate with the toggled item when a checkbox changes", () => {
    const onItemsUpdate = vi.fn();
    render(
      <Filter type="Categories" items={items} onItemsUpdate={onItemsUpdate} />,
    );
    fireEvent.click(screen.getByLabelText("Dessert"));
    expect(onItemsUpdate).toHaveBeenCalledWith([
      { id: "1", name: "Dessert", checked: true },
      { id: "2", name: "Beverage", checked: true },
    ]);
  });
});
