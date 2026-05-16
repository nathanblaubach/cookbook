# Cookbook (React Web Application)

## Purpose

This cookbook is a simple list of recipes for my mom's family's family cookbook. It is being developed using Typescript, React and Vite.

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

Set up source code and dependencies

```shell
git clone https://github.com/nathanblaubach/cookbook.git
cd cookbook
npm install
npm --prefix e2e run install-browsers
```

Run the application

```shell
npm --prefix ui run dev
```

Run the tests

```shell
npm --prefix ui run test     # Unit tests (continuous): vitest
npm --prefix ui run coverage # Unit tests with coverage: vitest
npm --prefix e2e run test    # End to End: playwright
```

Run other quality checks

```shell
npm run format:check         # Formatting: prettier
npm run lint                 # Linter: eslint
```

## Contributors

- [Nathan Blaubach](https://github.com/nathanblaubach) - Source Code
- Jeremy Slagle - Logo

## Licenses

- [MIT](https://github.com/nathanblaubach/cookbook/blob/main/LICENSE)
