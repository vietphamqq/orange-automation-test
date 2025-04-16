/**
 * Copyright © 2025 Viet Pham
 */

import {defineConfig, devices} from '@playwright/test';
import * as dotenv from 'dotenv';
import {playwrightLogger} from './utils/logger';

// Read environment variables from .env file
dotenv.config();
// Also load from .env.local if it exists
dotenv.config({path: '.env.local', override: true});

// Define environment variables with defaults
const BASE_URL = process.env.BASE_URL || 'https://opensource-demo.orangehrmlive.com/';
const CI = process.env.CI === 'true';
const TIMEOUT = parseInt(process.env.TIMEOUT || '30000');
const WORKERS = process.env.WORKERS ? parseInt(process.env.WORKERS) : undefined;
// Get number of retries from environment variable or default to 2 for CI and 0 for local
const RETRIES = process.env.RETRIES !== undefined
    ? parseInt(process.env.RETRIES)
    : (CI ? 2 : 0);

/**
 * See https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    // Directory where tests are located
    testDir: './tests',

    // Maximum time one test can run for
    timeout: TIMEOUT,

    // Run tests in files in parallel
    fullyParallel: true,

    // Fail the build on CI if you accidentally left test.only in the source code
    forbidOnly: CI,

    // Retry on CI only
    retries: RETRIES,

    // Number of parallel workers
    workers: WORKERS,

    // Reporter to use
    reporter: [
        ['html', {open: 'never'}],
        ['list'],
        ['allure-playwright']
    ],

    // Shared settings for all projects
    use: {
        // Base URL to use in actions like `await page.goto('/')`
        baseURL: BASE_URL,

        // Collect trace when retrying the failed test
        trace: 'on-first-retry',

        // Capture screenshot after each test
        screenshot: 'only-on-failure',

        // Record video only when retrying a test for the first time
        video: 'on-first-retry',

        // Enable API request/response logging (controlled by ENABLE_LOGS env var or --enable-logs param)
        contextOptions: {
            logger: playwrightLogger
        }
    },

    // Configure projects for different browsers and devices
    projects: [
        {
            name: 'chromium',
            use: {...devices['Desktop Chrome']},
            testMatch: /.*ui\/.*\.spec\.ts/,
        },
        {
            name: 'firefox',
            use: {...devices['Desktop Firefox']},
            testMatch: /.*ui\/.*\.spec\.ts/,
        },
        {
            name: 'api',
            use: {
                baseURL: process.env.API_BASE_URL || BASE_URL,
                // Disable browser-specific features for API tests
                screenshot: 'off',
                video: 'off',
                trace: 'off',
            },
            // Only include tests in the api directory
            testMatch: /.*api\/.*\.spec\.ts/,
        },
    ],
});