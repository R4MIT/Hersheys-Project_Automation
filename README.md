# Hershey's Playwright Automation Framework

## Overview
This repository contains an end-to-end automation framework for Hershey's e-commerce platform, built using Playwright with modular architecture.


## Features
- Page Object Model (POM) for maintainable, reusable code
- Centralized utilities for actions, authentication, and test data
- Organized, feature-based test structure
- Allure and HTML reporting
- CI/CD ready (see below)
- Negative and positive path test coverage

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Setup
```sh
npm install
```

### Running Tests
```sh
npx playwright test
```

### Running a Specific Test
```sh
npx playwright test src/tests/ProductsViewPage/NegativeProductSearch.spec.js
```

### View HTML Report
```sh
npx playwright show-report
```

## CI/CD Integration
Add this to `.github/workflows/ci.yml`:
```yaml
name: Playwright Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test
      - uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report
```

## Project Structure
- `src/main/PageObjects/` - All page objects
- `src/main/Utilities/` - Utilities (actions, test data, auth)
- `src/tests/` - Organized by feature
- `src/main/Config/playwright.config.js` - Playwright config

## Best Practices
- Use only page object abstractions in tests
- Keep selectors and test data up to date
- Use environment variables for sensitive data
- Add more negative/edge case tests as needed

---

## Author
Ramit (R4MIT) <ramit0033@gmail.com>
