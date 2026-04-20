# PMS Playwright Automation

Standard Playwright structure for organization use:

- `playwright.config.js`: shared configuration, reporters, and browser projects
- `config/`: environment loading and shared runtime helpers
- `page-objects/`: page objects for reusable UI actions
- `test-data/`: reusable datasets for data-driven tests
- `tests/regression/`: the full organized regression suite

## Setup

1. Update `.env` with the PMS credentials
2. Run the tests

## Commands

```bash
npm test
npm run test:regression
npm run test:ci
npm run test:headed
npm run test:demo
npm run test:ui
npm run test:debug
npm run report
```

## Environment variables

```bash
PMS_BASE_URL=https://pms.ethnomet.com/
PMS_USERNAME=your-email@example.com
PMS_PASSWORD=your-password
```

## Notes

- `.env` and `.env.local` are loaded automatically when Playwright starts
- Secrets stay out of the test files and should not be committed
- The default successful login route currently resolves to the provider dashboard
- This PMS instance is more reliable with self-contained login flows than shared persisted session state
- Local runs retry once for flaky page loads, while CI keeps two retries
- The HTML report auto-opens on local failures and includes screenshot/video artifacts
- Headed runs slow browser actions automatically so people can watch the flow
- You can tune the speed with `PMS_SLOW_MO`, or use `npm run test:demo` for a slower showcase run

## Azure DevOps

Use [azure-pipelines.yml](/Users/palmpay/Documents/PMS/azure-pipelines.yml) to run the regression flow in Azure DevOps.

Set these pipeline variables in Azure DevOps:

- `PMS_USERNAME`
- `PMS_PASSWORD`
- `PMS_BASE_URL` (optional, defaults to `https://pms.ethnomet.com/`)

Mark `PMS_USERNAME` and `PMS_PASSWORD` as secret variables.

The pipeline will:

- install Node.js
- install npm packages
- install Playwright Chromium and OS dependencies
- run `npm run test:ci`
- publish JUnit test results
- publish `playwright-report/` and `test-results/` as pipeline artifacts
