# Cookbook (React Web Application)

## Purpose

This cookbook is a simple list of recipes for my mom's family's family cookbook, but I am writing it in a way that (I
hope) is easily reusable. It is being developed using Typescript, React and Vite.

## Design Decisions

- Because this cookbook is a historical cookbook, the recipes are simply stored in a json file.
- Approach dependencies in a way that limits their impact on the application
    - Dependencies are kept to a relative minimum
    - React components are "[Humble](https://martinfowler.com/bliki/HumbleObject.html)" to prevent entangling logic in
      proprietary React code
    - Snyk is used to scan for code and dependency vulnerabilities.
- Development follows TDD/BDD principles where possible
    - Playwright is used for end-to-end testing, focusing on accessibility (axe-core) and a few user flows
    - Vitest is used for unit testing typescript logic and adapters
    - React components are "[Humble](https://martinfowler.com/bliki/HumbleObject.html)" to allow logic to be tested
      elsewhere

## Setup/Run

You will need to have [node.js](https://nodejs.org) and [npm](https://www.npmjs.com) installed.

Clone the repository

```shell
# Clone this repository and switch to the directory
git clone https://github.com/nathanblaubach/cookbook.git
cd cookbook
```

Install the dependencies

```shell
npm --prefix ui i
npm --prefix e2e i
npm --prefix e2e run install-playwright # If you haven't installed playwright before
```

Run the web application

```shell
npm --prefix ui run dev
```

Run the unit tests

```shell
npm --prefix ui run test
```

Run the end to end tests (The web application must be running)

```shell
npm --prefix e2e run e2e
```

## Contributors

- [Nathan Blaubach](https://github.com/nathanblaubach) - Source Code
- Jeremy Slagle - Logo

## Licenses

- [MIT](https://github.com/nathanblaubach/cookbook/blob/main/LICENSE)
