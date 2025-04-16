/**
 * Copyright © 2025 Viet Pham
 */

import {test, expect} from '../../fixtures/ui-test';
import {loginWithTestCredentials} from '../../actions/auth-actions';
import {AdminPage} from '../../pages/admin-page';

test.describe('Search Tests', () => {
    /**
     * This test verifies that a user can search for admin users
     */
    test('should be able to search for admin user from system users',
        {tag: ['@smoke', '@regression']}, async ({page, autoLogout}) => {
            // Login with test credentials and enable auto-logout
            await loginWithTestCredentials(page, autoLogout);

            // Navigate to Admin page
            const adminPage = new AdminPage(page);
            await adminPage.goto();

            // Navigate to Users management to ensure we're searching for users
            await adminPage.navigateToUsers();

            // Perform search for Admin users
            await adminPage.search('Admin');

            // Verify search results are displayed
            await adminPage.searchForm.verifySearchResultsDisplayed();

            // Verify search results contain the search term
            await adminPage.searchForm.verifySearchResultsContain('Admin');

            // Get and verify search results count
            const resultsCount = await adminPage.getSearchResultsCount();
            expect(resultsCount).toBeGreaterThan(0);

        });

    /**
     * This test verifies that a "No Records Found" message is displayed when search has no results
     */
    test('should show no records found message when search has no results',
        {tag: '@regression'}, async ({page, autoLogout}) => {
            // Login with test credentials and enable auto-logout
            await loginWithTestCredentials(page, autoLogout);

            // Navigate to Admin page
            const adminPage = new AdminPage(page);
            await adminPage.goto();

            // Navigate to Users management to ensure we're searching for users
            await adminPage.navigateToUsers();

            // Perform search with a term that should not match any records
            const nonExistentSearchTerm = 'XYZ123NonExistentUser';
            await adminPage.search(nonExistentSearchTerm);

            // Verify "No Records Found" message is displayed
            await expect(adminPage.searchForm.noRecordsFoundMessage).toBeVisible();

            // Verify toast notification is displayed with the expected message
            await adminPage.verifyToastNotification("No Records Found");

            // Verify search results count is 0
            const resultsCount = await adminPage.getSearchResultsCount();
            expect(resultsCount).toBe(0);
        });
});