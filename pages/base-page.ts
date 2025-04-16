/**
 * Copyright © 2025 Viet Pham
 */

import {Page, Locator, expect} from '@playwright/test';
import {LeftNavigation} from '../components/left-navigation';
import {info} from '../utils/logger';

/**
 * Base page object that all page objects can extend
 */
export class BasePage {
    readonly page: Page;
    readonly leftNav: LeftNavigation;
    readonly pageTitle: Locator;
    readonly userDropdown: Locator;
    readonly logoutButton: Locator;
    readonly toastNotification: Locator;


    constructor(page: Page) {
        this.page = page;
        this.leftNav = new LeftNavigation(page);
        this.pageTitle = page.locator('.oxd-topbar-header-title');
        this.userDropdown = page.locator('span.oxd-userdropdown-tab');
        this.logoutButton = page.getByRole('menuitem', {name: 'Logout'});
        this.toastNotification = page.locator('div.oxd-toast-container');
    }

    /**
     * Get the page title text
     * @returns The page title text
     */
    async getPageTitle(): Promise<string> {
        return await this.pageTitle.textContent() || '';
    }

    /**
     * Logout from the application if user is logged in
     */
    async logout() {
        // Simple check if user dropdown is visible
        const isDropdownVisible = await this.userDropdown.isVisible()
            .catch(() => false);
        
        if (!isDropdownVisible) {
            info('User dropdown not visible, skipping logout');
            return;
        }

        // User is logged in, proceed with logout
        info('Clicking user dropdown to initiate logout');
        await this.userDropdown.click();
        
        info('Clicking logout button');
        await this.logoutButton.click();
        
        info('Waiting for redirect to login page');
        await this.page.waitForURL('**/auth/login');
    }

    /**
     * Navigate to Admin page using left navigation
     */
    async navigateToAdmin() {
        await this.leftNav.navigateToAdmin();
    }

    /**
     * Navigate to Dashboard page using left navigation
     */
    async navigateToDashboard() {
        await this.leftNav.navigateToDashboard();
    }

    /**
     * Navigate to PIM page using left navigation
     */
    async navigateToPIM() {
        await this.leftNav.navigateToPIM();
    }

    /**
     * Navigate to Leave page using left navigation
     */
    async navigateToLeave() {
        await this.leftNav.navigateToLeave();
    }

    /**
     * Verify toast notification is displayed with the expected message
     */
    async verifyToastNotification(expectedMessage: string) {
        await expect(this.toastNotification).toBeVisible();
        const toastText = await this.toastNotification.textContent() || '';
        expect(toastText).toContain(expectedMessage);
    }
}