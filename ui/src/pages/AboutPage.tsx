import React from "react";
import { Page } from "../components/Page/Page";

export function AboutPage(): React.JSX.Element {
  return (
    <Page>
      <h1>The McClain Family Cookbook</h1>
      <h2>About</h2>
      <p>
        This cookbook is a digitized version of the McClain Family Recipes book
        that was created in 2006. The hope is that this will make the cookbook
        more accessible and allow us to easily add new recipes as time goes on.
      </p>
      <p>
        If you have any questions about how the cookbook works or ideas for how
        the cookbook can be improved, send me an email at{" "}
        <a href="mailto:nathanblaubach@gmail.com">nathanblaubach@gmail.com</a>
      </p>
      <h2>Development</h2>
      <ul>
        <li>
          <a href="https://github.com/nathanblaubach/cookbook">
            Source Code on GitHub (MIT)
          </a>
        </li>
        <li>
          <a href="https://nathanblaubach.com">My Website</a>
        </li>
        <li>
          <a href="https://realfavicongenerator.net/">RealFaviconGenerator</a>
        </li>
      </ul>
    </Page>
  );
}
