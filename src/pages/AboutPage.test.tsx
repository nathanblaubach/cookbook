import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AboutPage } from "./AboutPage";

describe("AboutPage", () => {
  it("renders the page content", () => {
    render(
      <MemoryRouter>
        <AboutPage />
      </MemoryRouter>,
    );

    expect(screen.getByText("The McClain Family Cookbook")).toBeDefined();
    expect(screen.getByRole("heading", { name: "About" })).toBeDefined();
    const emailLink = screen.getByRole("link", {
      name: "nathanblaubach@gmail.com",
    });
    expect(emailLink).toHaveProperty("href", "mailto:nathanblaubach@gmail.com");
    expect(emailLink.parentElement?.textContent).toContain(
      "send me an email at nathanblaubach@gmail.com",
    );
    expect(screen.getByRole("heading", { name: "Development" })).toBeDefined();
    expect(
      screen.getByRole("link", { name: "Source Code on GitHub" }),
    ).toHaveProperty("href", "https://github.com/nathanblaubach/cookbook");
    expect(screen.getByRole("link", { name: "My Website" })).toHaveProperty(
      "href",
      "https://nathanblaubach.com/",
    );
    expect(
      screen.getByRole("link", { name: "RealFaviconGenerator" }),
    ).toHaveProperty("href", "https://realfavicongenerator.net/");
  });
});
