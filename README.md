# Orange HRM Automation Tests

E2E Test Automation Framework with Playwright for the OrangeHRM application.

Copyright © 2025 Viet Pham

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Install Playwright browsers:
   ```
   npx playwright install
   ```
4. Copy `.env.local.example` to `.env.local` and update as needed:
   ```
   cp .env.local.example .env.local
   ```

## Running Tests

Run all tests:
```
npm test
```

Run specific tests:
```
npm test -- tests/ui/login.spec.ts
```

Run with UI mode:
```
npm run test:ui
```

### Running UI & API Tests

Run all UI tests:
```
npm run test:ui-tests
```

Run UI tests in Chrome only:
```
npm run test:chrome
```

Run UI tests in Firefox only:
```
npm run test:firefox
```

Run UI tests in headed mode (with browser visible):
```
npm run test:ui-headed
```

Run only API tests:
```
npm run test:api-tests
```


### Running Tests by Tag

Tests can be categorized using tags. The framework supports the following test tags:

- **@smoke**: Critical tests that verify core functionality
- **@regression**: Comprehensive tests that verify all aspects of the application

Run smoke tests:
```
npm run test:smoke
```

Run regression tests:
```
npm run test:regression
```


For more details on test tagging, see [Tags Test](https://playwright.dev/docs/test-annotations#tag-tests).

## Logging

Test logs are hidden by default for cleaner output. Enable them when needed:

Uncomment or add this line in your `.env.local` file:
```
ENABLE_LOGS=true
```

When enabled, logs will show:
- API requests/responses
- Navigation steps
- Test actions
- Verification points

## Reporting

Show the html report after running tests:
```
npm run report
```

Allure reports are saved in the `allure-results` directory. You can view the report using:
```
allure serve allure-results
```
Note: You need to have Allure installed. If you don't have it, you can install it using:
```
brew install allure
```

## Continuous Integration

This project uses GitHub Actions for continuous integration. The workflow automatically runs tests on:
- Every push to the main branch
- Every pull request targeting the main branch
- Manual triggers via GitHub Actions UI

### CI Workflow Features

- Runs all Playwright tests on Ubuntu with Node.js 20
- Generates and publishes HTML test reports
- Collects Allure test results
- Publishes test reports to GitHub Pages for easy viewing

### Viewing Test Reports

After a workflow run completes:
1. Go to the GitHub Actions tab in the repository
2. Select the completed workflow run
3. View the "Artifacts" section to download raw reports
4. For the published HTML report, click on the deployment link in the "Publish Test Report" job

### Manual Trigger

To manually trigger the test workflow:
1. Go to the Actions tab in the repository
2. Select the "Playwright Tests" workflow
3. Click "Run workflow" and select the branch to run against


## Project Structure

- `actions/` - Reusable test actions (e.g., authentication flows)
- `components/` - Page components (e.g., navigation, search forms)
- `fixtures/` - Test fixtures and setup files
  - `ui-test.ts` - Base fixture for UI tests
  - `api-test.ts` - Base fixture for API tests
- `pages/` - Page objects implementing the Page Object Model pattern
- `tests/` - Test files
  - `ui/` - UI tests for web interface
  - `api/` - API tests for backend services
  - `performance/` - Performance testing scripts
  - Tests are tagged as `@smoke`, `@regression` for easy filtering
- `utils/` - Utility functions and helpers (logging, API authentication)

## Configuration

Test configuration is in `playwright.config.ts`. You can override settings using environment variables or `.env.local` file.