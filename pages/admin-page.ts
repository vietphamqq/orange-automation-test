/**
 * Copyright © 2025 Viet Pham
 */

import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './base-page';
import {SearchForm} from '../components/search-form';

/**
 * Page object for the Admin page
 */
export class AdminPage extends BasePage {
    readonly adminHeading: Locator;
    readonly userManagementMenu: Locator;
    readonly usersSubmenu: Locator;
    readonly searchForm: SearchForm;

    constructor(page: Page) {
        super(page);
        this.adminHeading = page.getByRole('heading', {name: 'Admin'});
        this.userManagementMenu = page.getByLabel('Topbar Menu').getByText('User Management');
        this.usersSubmenu = page.getByRole('menuitem', {name: 'Users'});
        this.searchForm = new SearchForm(page);
    }

    /**
     * Navigate to the Admin page
     */
    async goto() {
        await this.leftNav.navigateToAdmin();
        await this.waitForPageLoad();
    }

    /**
     * Wait for Admin page to load completely
     */
    async waitForPageLoad() {
        await this.adminHeading.waitFor({state: 'visible'});
    }

    /**
     * Navigate to Users page under User Management
     */
    async navigateToUsers() {
        await this.userManagementMenu.click();
        await this.usersSubmenu.click();
        // Wait for the Users page to load
        await expect(this.page.getByRole('heading', {name: 'System Users'})).toBeVisible();
    }

    /**
     * Perform a search on the Admin page
     * @param searchTerm - Term to search for
     */
    async search(searchTerm: string) {
        await this.searchForm.search(searchTerm);
    }

    /**
     * Get search results count
     * @returns Number of search results
     */
    async getSearchResultsCount() {
        return this.searchForm.getSearchResultsCount();
    }
}