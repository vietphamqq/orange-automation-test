/**
 * Copyright © 2025 Viet Pham
 */

import {Page, Locator, expect} from '@playwright/test';
import {BasePage} from './base-page';

/**
 * Page object for the Dashboard page
 */
export class DashboardPage extends BasePage {
    readonly dashboardHeading: Locator;
    readonly timeAtWorkWidget: Locator;
    readonly myActionsWidget: Locator;
    readonly quickLaunchWidget: Locator;

    constructor(page: Page) {
        super(page);
        this.dashboardHeading = page.getByRole('heading', {name: 'Dashboard'});
        this.timeAtWorkWidget = page.getByText('Time at Work');
        this.myActionsWidget = page.getByText('My Actions');
        this.quickLaunchWidget = page.getByText('Quick Launch');
    }

    /**
     * Verify all dashboard widgets are visible
     */
    async verifyWidgetsVisible() {
        await expect(this.timeAtWorkWidget).toBeVisible();
        await expect(this.myActionsWidget).toBeVisible();
        await expect(this.quickLaunchWidget).toBeVisible();
    }

    /**
     * Wait for dashboard page to load completely
     */
    async waitForPageLoad() {
        await this.dashboardHeading.waitFor({state: 'visible'});
    }

}