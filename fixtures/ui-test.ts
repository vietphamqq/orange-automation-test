/**
 * Base test fixture for UI tests with automatic logout
 */
import { test as base, TestType, PlaywrightTestArgs, PlaywrightTestOptions, PlaywrightWorkerArgs, PlaywrightWorkerOptions } from '@playwright/test';
import { DashboardPage } from '../pages/dashboard-page';
import { info } from '../utils/logger';

/**
 * Type definition for our UI test fixtures
 */
type UITestFixtures = {
    // Function to mark that login has occurred
    autoLogout: () => void;
};

/**
 * Extended test fixture with automatic logout functionality
 */
const baseUITest = base.extend<UITestFixtures>({
    // Auto-logout after each test
    autoLogout: [async ({ page }, use) => {
        // Before the test, just set up the flag
        let isLoggedIn = false;

        // Expose a function to mark that login has occurred
        const markLoggedIn = () => {
            isLoggedIn = true;
            info('Test marked as logged in - will auto-logout after test');
        };

        // Provide the markLoggedIn function to the test
        await use(markLoggedIn);

        // After the test completes (success or failure), check if we need to logout
        if (isLoggedIn) {
            info('Auto-logout: Attempting to logout after test');
            const dashboardPage = new DashboardPage(page);
            await dashboardPage.logout();
            info('Auto-logout: Logout process completed');
        } else {
            info('Auto-logout: No login detected, skipping logout');
        }
    }, { auto: true }]
});

/**
 * Create a wrapper around the test object that preserves the original test name
 * This helps IDEs like WebStorm to properly detect and run tests
 */
export const test = baseUITest;
export const expect = base.expect;
