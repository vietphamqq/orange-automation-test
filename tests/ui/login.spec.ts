/**
 * Copyright © 2025 Viet Pham
 */

import {test, expect} from '../../fixtures/ui-test';
import {LoginPage} from '../../pages/login-page';
import {loginWithTestCredentials} from '../../actions/auth-actions';

test.describe('Login Tests', () => {
    /**
     * This test verifies that a user can successfully log in with valid credentials
     */
    test('should login successfully with valid credentials', {tag: ['@smoke', '@regression']}, async ({page, autoLogout}) => {
        // Login with test credentials and enable auto-logout
        const dashboardPage = await loginWithTestCredentials(page, autoLogout);

        // Verify user is logged in by checking the user dropdown
        await expect(dashboardPage.userDropdown).toBeVisible();

        // Verify dashboard widgets are visible
        await dashboardPage.verifyWidgetsVisible();

        // Note: No need for explicit logout here as it will be handled by the fixture
        // The auto-logout will happen after the test completes
    });

    /**
     * This test verifies that an error message is displayed when invalid credentials are used
     */
    test('should show error message with invalid credentials', {tag: '@regression'}, async ({page}) => {
        // Create login page object
        const loginPage = new LoginPage(page);

        // Navigate to login page
        await loginPage.goto();

        // Login with invalid credentials
        await loginPage.login('invalid_username', 'invalid_password');

        // Verify error message is displayed
        await expect(loginPage.errorMessage).toBeVisible();

        // Verify we're still on the login page
        await expect(page.getByRole('heading', {name: 'Login'})).toBeVisible();
    });
});