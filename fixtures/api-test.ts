/**
 * Base test fixture for authenticated API tests
 */
import {test as base, APIRequestContext, request, expect as baseExpect} from '@playwright/test';
import {createAuthenticatedAPIRequest, getAuthCookiesFromStorage} from '../utils/api-auth';
import {info} from '../utils/logger';

// Store the auth cookies globally to avoid creating multiple browser instances
let globalAuthCookies: string | null = null;

/**
 * Type definition for our API test fixtures
 */
type APITestFixtures = {
    authRequest: APIRequestContext; // Authenticated API request context
};

/**
 * Extended test fixture with authenticated API request
 */
const baseAPITest = base.extend<APITestFixtures>({
    // Create a new authenticated API request context for each test
    authRequest: async ({browser, baseURL}, use) => {
        // Only create a browser context if we don't have auth cookies yet
        if (!globalAuthCookies) {
            info('Creating new browser context to obtain auth cookies');
            const context = await browser.newContext();

            try {
                // Get auth cookies using the browser context
                const authRequest = await createAuthenticatedAPIRequest(context, baseURL || '');

                // Store the cookies for future tests
                globalAuthCookies = await getAuthCookiesFromStorage(authRequest);

                // Use the authenticated request context in the test
                await use(authRequest);
            } finally {
                // Close the context after getting cookies
                await context.close();
            }
        } else {
            info('Reusing existing auth cookies');
            // Create a new API request context with the stored cookies
            const authRequest = await request.newContext({
                baseURL: baseURL || '',
                extraHTTPHeaders: {
                    'Cookie': globalAuthCookies
                }
            });

            // Use the authenticated request context in the test
            await use(authRequest);

            // Dispose the request context after the test
            await authRequest.dispose();
        }
    },
});

/**
 * Create a wrapper around the test object that preserves the original test name
 * This helps IDEs like WebStorm to properly detect and run tests
 */
export const test = baseAPITest;
export const expect = baseExpect;
