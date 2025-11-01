/**
 * Application constants
 */

export const APP_NAME = 'AML Check';
export const APP_DESCRIPTION = 'Cryptocurrency address flow analyzer';

// Supported chains (EVM only for now)
export const SUPPORTED_CHAINS = ['ethereum', 'bsc', 'polygon'] as const;
export type ChainId = (typeof SUPPORTED_CHAINS)[number];

// Default query params
export const DEFAULT_QUERY_DEPTH = 3;
export const DEFAULT_TIME_RANGE_DAYS = 30;

// Cookie/Session
export const AUTH_COOKIE_NAME = 'aml-check-session';
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
