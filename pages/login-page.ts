/**
 * Copyright © 2025 Viet Pham
 */

import {Page, Locator, expect} from '@playwright/test';
import {info} from '../utils/logger';

/**
 * Page object for the Login page
 */
export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly forgotPasswordLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', {name: 'username'});
        this.passwordInput = page.getByRole('textbox', {name: 'password'});
        this.loginButton = page.getByRole('button', {name: 'Login'});
        this.errorMessage = page.getByText('Invalid credentials');
        this.forgotPasswordLink = page.getByRole('link', {name: 'Forgot your password?'});
    }

    /**
     * Navigate to the login page
     */
    async goto() {
        info('Navigating to login page');
        await this.page.goto('/web/index.php/auth/login');
        await expect(this.page.getByRole('heading', {name: 'Login'})).toBeVisible();
        info('Login page loaded successfully');
    }

    /**
     * Login with the provided credentials
     * @param username - Username to log in with
     * @param password - Password to log in with
     */
    async login(username: string, password: string) {
        info(`Attempting to login with username: ${username}`);
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        info('Clicking login button');
        await this.loginButton.click();
        info('Login button clicked');
    }
}