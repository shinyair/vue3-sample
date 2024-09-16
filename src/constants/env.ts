// value of --mode option, used for loading .env files
export const MODE = import.meta.env.MODE;

// if is running vite in development mode. usually applied in cmd `vite` to start dev server
export const IS_DEV = import.meta.env.DEV;

// if is running vite in production mode. usually applied in cmd `vite build`
export const IS_PROD = import.meta.env.PROD;

// app env vars
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const LOG_MIN_LEVEL = import.meta.env.VITE_LOG_MIN_LEVEL;
export const SENTRY_DNS_URL = import.meta.env.VITE_SENTRY_DNS_URL;
export const SENTRY_TRACE_DOMAINS = import.meta.env.VITE_SENTRY_TRACE_DOMAINS;
