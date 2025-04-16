/**
 * Copyright © 2025 Viet Pham
 */

import {test, expect} from '../../fixtures/api-test';
import {info} from '../../utils/logger';

/**
 * Test suite for employee API operations
 */
test.describe('Employee API Tests', () => {
    // Variable to store created employee ID for cleanup
    let createdEmployeeId: number;

    /**
     * This test verifies that we can create a new employee
     */
    test('should create a new employee', {tag: ['@smoke', '@regression']},
        async ({authRequest}) => {
            // Convert the random number to a string
            const employeeIdString = (Math.floor(Math.random() * 90000) + 10000).toString();

            info(`Using random employee ID: ${employeeIdString}`);

            // Make a POST request to create a new employee
            const response = await authRequest.post('/web/index.php/api/v2/pim/employees', {
                data: {
                    firstName: 'first',
                    middleName: 'API',
                    lastName: 'last',
                    employeeId: employeeIdString,
                    empPicture: null,
                }
            });

            // Verify the response status code is 200
            expect(response.status()).toBe(200);
        });

});