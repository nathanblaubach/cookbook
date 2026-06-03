# Implementation Plan: Single Node Project

## Goal

Collapse three `package.json` files (root workspace, `ui/`, `e2e/`) into one at the root, and flatten the directory structure so all source lives naturally under the repo root.

## New Directory Structure

```
/
├── src/                    (moved from ui/src/)
├── public/                 (moved from ui/public/)
├── e2e/                    (test files only — no separate package.json)
│   └── tests/
│       ├── a11y.spec.ts
│       └── search.spec.ts
├── index.html              (moved from ui/index.html)
├── package.json            (merged — see below)
├── package-lock.json       (regenerated)
├── tsconfig.json           (moved from ui/tsconfig.json)
├── tsconfig.node.json      (moved from ui/tsconfig.node.json)
├── vite.config.ts          (moved from ui/vite.config.ts)
├── vitest.config.ts        (moved from ui/vitest.config.ts)
├── playwright.config.ts    (moved from e2e/playwright.config.ts)
├── eslint.config.mjs
├── firebase.json
└── .gitignore
```

## Steps

### 1. Move files (git mv)

```
git mv ui/src src
git mv ui/public public
git mv ui/index.html index.html
git mv ui/tsconfig.json tsconfig.json
git mv ui/tsconfig.node.json tsconfig.node.json
git mv ui/vite.config.ts vite.config.ts
git mv ui/vitest.config.ts vitest.config.ts
git mv e2e/playwright.config.ts playwright.config.ts
```

### 2. Delete old sub-project files

- `ui/package.json`
- `ui/package-lock.json`
- `ui/.gitignore`
- `e2e/package.json`
- `e2e/package-lock.json`
- `e2e/.gitignore`

### 3. Merge package.json

Combine all `dependencies`, `devDependencies`, and `scripts` from `ui/package.json` and `e2e/package.json` into root `package.json`. Remove `workspaces`. Add `"type": "module"` from `ui/package.json`.

Rename e2e scripts to avoid collision with the ui `test` script:

- `install-browsers` → `e2e:install-browsers`
- e2e `test` → `e2e:test`
- `report` → `e2e:report`

Update `lint` script: `eslint e2e ui` → `eslint .`

### 4. Update eslint.config.mjs

- **ignores**: remove `e2e/node_modules/**`, `ui/node_modules/**`; change `ui/coverage/**` → `coverage/**`, `ui/dist/**` → `dist/**`, `e2e/playwright-report/**` → `playwright-report/**`, `e2e/test-results/**` → `test-results/**`
- **globals**: change `ui/**` file pattern → `src/**`
- **React plugin**: change `ui/**` file patterns → `src/**`

### 5. Update playwright.config.ts

- `testDir: "./tests"` → `testDir: "./e2e"`
- Remove `cwd: "../ui"` from `webServer` (defaults to repo root, where build/preview scripts now live)

### 6. Update firebase.json

- `"public": "ui/dist"` → `"public": "dist"`

### 7. Update .gitignore (root)

Add playwright artifacts that previously lived under `e2e/` (and were covered by `e2e/.gitignore`):

```
/test-results/
/playwright-report/
/blob-report/
/playwright/.cache/
```

Also add `ui/` and `e2e/` sub-project artifacts already covered:

- `ui/node_modules` was covered by `ui/.gitignore`; root already has `node_modules` entry

### 8. Update CI workflow (.github/workflows/cicd.yml)

**build job:**

- `cache-dependency-path: ui/package-lock.json` → `package-lock.json`
- Remove `working-directory: ui` from the coverage step
- Remove `working-directory: ui` from the build step

**e2e job:**

- `npm run install-browsers` with `working-directory: e2e` → `npm run e2e:install-browsers` (no working-directory)
- `npm run test` with `working-directory: e2e` → `npm run e2e:test` (no working-directory)

**deploy job:**

- Remove `working-directory: ui` from the build step

### 9. Regenerate package-lock.json

Delete root `package-lock.json` and run `npm install` to produce a fresh lockfile for the merged single project.
