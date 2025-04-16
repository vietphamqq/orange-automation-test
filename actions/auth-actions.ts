/**
 * Copyright © 2025 Viet Pham
 */

/**
 * Authentication-related actions for the Orange HRM application
 */
import {Page} from '@playwright/test';
import {LoginPage} from '../pages/login-page';
import {DashboardPage} from '../pages/dashboard-page';
import {info} from '../utils/logger';

/**
 * Get test credentials from environment variables
 * @returns An object containing username and password
 * @throws Error if environment variables are not set
 */
export function getTestCredentials(): { username: string; password: string } {
    if (!process.env.TEST_USERNAME || !process.env.TEST_PASSWORD) {
        throw new Error('TEST_USERNAME and TEST_PASSWORD environment variables must be set either in CI environment variables, .env file, or .env.local file');
    }

    return {
        username: process.env.TEST_USERNAME as string,
        password: process.env.TEST_PASSWORD as string
    };
}

/**
 * Login to the application with credentials from environment variables
 * @param page - Playwright page object
 * @param markLoggedIn - Optional function to mark the test as logged in for auto-logout
 * @returns Dashboard page object after successful login
 */
export async function loginWithTestCredentials(
    page: Page,
    markLoggedIn?: () => void
): Promise<DashboardPage> {
    info('Starting login process with test credentials');
    const {username, password} = getTestCredentials();
    const loginPage = new LoginPage(page);
    const dashboardPage = new DashboardPage(page);

    // Navigate to login page
    await loginPage.goto();

    // Login with credentials
    await loginPage.login(username, password);

    // Verify dashboard is displayed (this ensures login was successful)
    info('Waiting for dashboard to load after login');
    await dashboardPage.waitForPageLoad();
    info('Login successful - dashboard loaded');

    // If markLoggedIn function is provided, call it to enable auto-logout
    if (markLoggedIn) {
        markLoggedIn();
    }

    return dashboardPage;
}
