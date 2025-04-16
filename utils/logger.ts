/**
 * Copyright © 2025 Viet Pham
 */

/**
 * Logger utility for the test automation framework
 * Logs can be enabled by:
 * 1. Setting ENABLE_LOGS=true in .env.local file
 * 2. Passing --enable-logs parameter when running tests
 */

// Check if logs are enabled via environment variable or command line parameter
const isLoggingEnabled = (): boolean => {
    // Check for environment variable
    if (process.env.ENABLE_LOGS === 'true') {
        return true;
    }

    // Check for command line parameter
    const args = process.argv.slice(2);
    return args.includes('--enable-logs');
};

/**
 * Log a message if logging is enabled
 * @param message - The message to log
 * @param severity - The severity level (info, warning, error)
 */
export const log = (message: string, severity: 'info' | 'warning' | 'error' = 'info'): void => {
    if (!isLoggingEnabled()) {
        return;
    }

    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${severity.toUpperCase()}] ${message}`);
};

/**
 * Log an info message if logging is enabled
 * @param message - The message to log
 */
export const info = (message: string): void => {
    log(message, 'info');
};

/**
 * Log a warning message if logging is enabled
 * @param message - The message to log
 */
export const warning = (message: string): void => {
    log(message, 'warning');
};

/**
 * Log an error message if logging is enabled
 * @param message - The message to log
 */
export const error = (message: string): void => {
    log(message, 'error');
};

/**
 * Logger for Playwright's contextOptions
 */
export const playwrightLogger = {
    isEnabled: (name: string): boolean => {
        // Always enable API logging, but actual output will be controlled by our logger
        return name === 'api';
    },
    log: (name: string, severity: string, message: unknown): void => {
        const messageText = message instanceof Error ? message.message : String(message);
        log(`[${name}] ${messageText}`, severity as 'info' | 'warning' | 'error');
    }
};