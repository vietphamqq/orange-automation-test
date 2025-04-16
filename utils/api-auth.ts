/**
 * Copyright © 2025 Viet Pham
 */

/**
 * Utility functions for API authentication using web login cookies
 */
import { Page, APIRequestContext, BrowserContext, request } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { getTestCredentials } from '../actions/auth-actions';
import { info, error } from './logger';

/**
 * Performs a web login and returns the cookies for API requests
 * @param page - Playwright page object
 * @returns An object containing cookies from the web login session
 */
export async function getAuthCookiesFromWebLogin(page: Page): Promise<Record<string, string>> {
    const { username, password } = getTestCredentials();
    const loginPage = new LoginPage(page);

    // Navigate to login page
    await loginPage.goto();

    // Login with credentials
    await loginPage.login(username, password);

    // Wait for login to complete and cookies to be set
    await page.waitForURL('**/dashboard/index');

    // Get all cookies
    const cookies = await page.context().cookies();
    
    // Convert cookies array to a record object for easy access
    const cookieMap: Record<string, string> = {};
    for (const cookie of cookies) {
        cookieMap[cookie.name] = cookie.value;
    }

    return cookieMap;
}

/**
 * Extracts the cookie string from an API request context's storage state
 * @param apiContext - The API request context to extract cookies from
 * @returns The cookie string for use in headers
 */
export async function getAuthCookiesFromStorage(apiContext: APIRequestContext): Promise<string> {
    // Get the storage state from the API context
    const storageState = await apiContext.storageState();
    
    // Extract cookies and format them as a string
    return storageState.cookies
        .map(cookie => `${cookie.name}=${cookie.value}`)
        .join('; ');
}

/**
 * Creates a new API request context with authentication cookies from web login
 * @param context - Playwright browser context
 * @param baseURL - Base URL for API requests
 * @returns A configured API request context with auth cookies
 */
export async function createAuthenticatedAPIRequest(
    context: BrowserContext,
    baseURL: string
): Promise<APIRequestContext> {
    // Create a new page in the provided context
    const page = await context.newPage();
    
    try {
        // Get authentication cookies from web login
        const cookies = await getAuthCookiesFromWebLogin(page);
        
        // Create headers with cookies
        const cookieString = Object.entries(cookies)
            .map(([name, value]) => `${name}=${value}`)
            .join('; ');
            
        // Create and return a new API request context with the auth headers
        try {
            // Create a new request context using the global request function
            return request.newContext({
                baseURL: baseURL,
                extraHTTPHeaders: {
                    'Cookie': cookieString
                }
            });
        } catch (err) {
            error(`Error creating API request context: ${err}`);
            // Fallback to a basic context without configuration
            return request.newContext();
        }
    } finally {
        // Close the page after getting cookies
        await page.close();
    }
}