import React from "react";
import { Link } from "react-router-dom";
import cookbookLogo from "../../assets/logo.svg";
import "./Page.css";

type PageProps = {
  children: React.ReactNode;
};

export function Page({ children }: Readonly<PageProps>): React.JSX.Element {
  return (
    <React.Fragment>
      <header>
        <img
          src={cookbookLogo}
          className="cookbook-logo"
          alt="McClain Family Cookbook Logo"
        />
        <nav>
          <Link to="/recipes" className="nav-link">
            Search
          </Link>
          <Link to="/about" className="nav-link">
            About
          </Link>
        </nav>
      </header>
      <main>{children}</main>
    </React.Fragment>
  );
}
