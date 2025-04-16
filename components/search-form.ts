/**
 * Copyright © 2025 Viet Pham
 */

import {Page, Locator, expect} from '@playwright/test';

/**
 * Page object for the Search functionality
 */
export class SearchForm {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly searchButton: Locator;
    readonly searchResults: Locator;
    readonly noRecordsFoundMessage: Locator;
    readonly searchResultsTable: Locator;
    readonly searchResultsCount: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.locator('form input.oxd-input.oxd-input--active');
        this.searchButton = page.getByRole('button', {name: 'Search'});
        this.searchResults = page.locator('.oxd-table-body');
        this.noRecordsFoundMessage = page.locator('div.orangehrm-horizontal-padding span.oxd-text.oxd-text--span');
        this.searchResultsTable = page.locator('.oxd-table');
        this.searchResultsCount = page.getByRole('table').locator('.oxd-table-card');
    }

    /**
     * Perform a search with the given search term
     * @param searchTerm - Term to search for
     */
    async search(searchTerm: string) {
        await this.searchInput.fill(searchTerm);
        await this.searchButton.click();
        // Wait for search results to load
        await this.page.waitForLoadState('networkidle');
    }

    /**
     * Verify search results are displayed
     */
    async verifySearchResultsDisplayed() {
        await expect(this.searchResultsTable).toBeVisible();
    }

    /**
     * Verify search results contain the expected term
     * @param expectedTerm - Term expected to be found in results
     */
    async verifySearchResultsContain(expectedTerm: string) {
        const resultsText = await this.searchResults.textContent() || '';
        expect(resultsText.toLowerCase()).toContain(expectedTerm.toLowerCase());
    }

    /**
     * Get the number of search results
     * @returns The number of search results
     */
    async getSearchResultsCount(): Promise<number> {
        try {
            await this.searchResultsCount.first().waitFor({timeout: 5000});
            const count = await this.searchResultsCount.count();
            return count;
        } catch (error) {
            // If no results found, return 0
            if (await this.noRecordsFoundMessage.isVisible()) {
                return 0;
            }
            throw error;
        }
    }

}