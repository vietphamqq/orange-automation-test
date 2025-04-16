# Orange HRM Automation Tests

E2E Test Automation Framework with Playwright for the OrangeHRM application.

Copyright © 2025 Viet Pham

## Setup

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Copy `.env.local.example` to `.env.local` and update as needed:
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


For more details on test tagging, see [TEST-TAGS.md](TEST-TAGS.md).

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


## Project Structure

- `actions/` - Reusable test actions
- `components/` - Page components (e.g., navigation, forms)
- `pages/` - Page objects
- `tests/` - Test files
  - `ui/` - UI tests
  - `api/` - API tests
  - Tests are tagged as `@smoke`, `@regression`, or `@api` for easy filtering
- `utils/` - Utility functions
- `TEST-TAGS.md` - Documentation for test tagging

## Configuration

Test configuration is in `playwright.config.ts`. You can override settings using environment variables or `.env.local` file.