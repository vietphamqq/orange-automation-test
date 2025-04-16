/**
 * Copyright © 2025 Viet Pham
 */

import { Page, Locator } from '@playwright/test';

/**
 * Component object for the left navigation sidebar
 */
export class LeftNavigation {
    readonly page: Page;
    readonly sidebarContainer: Locator;
    readonly adminLink: Locator;
    readonly pimLink: Locator;
    readonly leaveLink: Locator;
    readonly timeLink: Locator;
    readonly recruitmentLink: Locator;
    readonly myInfoLink: Locator;
    readonly performanceLink: Locator;
    readonly dashboardLink: Locator;
    readonly directoryLink: Locator;
    readonly maintenanceLink: Locator;
    readonly claimLink: Locator;
    readonly buzzLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sidebarContainer = page.locator('.oxd-sidepanel');
        
        // Main navigation links
        this.adminLink = page.getByRole('link', { name: 'Admin' });
        this.pimLink = page.getByRole('link', { name: 'PIM' });
        this.leaveLink = page.getByRole('link', { name: 'Leave', exact: true });
        this.timeLink = page.getByRole('link', { name: 'Time' });
        this.recruitmentLink = page.getByRole('link', { name: 'Recruitment' });
        this.myInfoLink = page.getByRole('link', { name: 'My Info' });
        this.performanceLink = page.getByRole('link', { name: 'Performance' });
        this.dashboardLink = page.getByRole('link', { name: 'Dashboard' });
        this.directoryLink = page.getByRole('link', { name: 'Directory' });
        this.maintenanceLink = page.getByRole('link', { name: 'Maintenance' });
        this.claimLink = page.getByRole('link', { name: 'Claim' });
        this.buzzLink = page.getByRole('link', { name: 'Buzz' });
    }

    /**
     * Navigate to Admin page
     */
    async navigateToAdmin() {
        await this.adminLink.click();
        await this.page.waitForURL('**/admin/viewSystemUsers');
    }

    /**
     * Navigate to PIM page
     */
    async navigateToPIM() {
        await this.pimLink.click();
        await this.page.waitForURL('**/pim/viewEmployeeList');
    }

    /**
     * Navigate to Leave page
     */
    async navigateToLeave() {
        await this.leaveLink.click();
        await this.page.waitForURL('**/leave/viewLeaveList');
    }

    /**
     * Navigate to Time page
     */
    async navigateToTime() {
        await this.timeLink.click();
        await this.page.waitForURL('**/time/viewEmployeeTimesheet');
    }

    /**
     * Navigate to Recruitment page
     */
    async navigateToRecruitment() {
        await this.recruitmentLink.click();
        await this.page.waitForURL('**/recruitment/viewCandidates');
    }

    /**
     * Navigate to My Info page
     */
    async navigateToMyInfo() {
        await this.myInfoLink.click();
        await this.page.waitForURL('**/pim/viewPersonalDetails/empNumber/**');
    }

    /**
     * Navigate to Performance page
     */
    async navigateToPerformance() {
        await this.performanceLink.click();
        await this.page.waitForURL('**/performance/searchEvaluatePerformanceReview');
    }

    /**
     * Navigate to Dashboard page
     */
    async navigateToDashboard() {
        await this.dashboardLink.click();
        await this.page.waitForURL('**/dashboard/index');
    }

    /**
     * Navigate to Directory page
     */
    async navigateToDirectory() {
        await this.directoryLink.click();
        await this.page.waitForURL('**/directory/viewDirectory');
    }

    /**
     * Navigate to Maintenance page
     */
    async navigateToMaintenance() {
        await this.maintenanceLink.click();
        // This might redirect to a login page for maintenance
        await this.page.waitForNavigation();
    }

    /**
     * Navigate to Claim page
     */
    async navigateToClaim() {
        await this.claimLink.click();
        await this.page.waitForURL('**/claim/viewAssignClaim');
    }

    /**
     * Navigate to Buzz page
     */
    async navigateToBuzz() {
        await this.buzzLink.click();
        await this.page.waitForURL('**/buzz/viewBuzz');
    }

    /**
     * Check if sidebar is visible
     * @returns True if sidebar is visible
     */
    async isVisible() {
        return await this.sidebarContainer.isVisible();
    }
}