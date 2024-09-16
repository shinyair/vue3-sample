import { App } from "vue";
import { Router } from "vue-router";
import * as Sentry from "@sentry/vue";

import { SENTRY_DNS_URL, SENTRY_TRACE_DOMAINS } from "@/constants/env";

const TRACABLE_DOMAINS = (SENTRY_TRACE_DOMAINS || "").split(",");

export const createSentry = (app: App, router: Router) => {
  Sentry.init({
    app,
    dsn: SENTRY_DNS_URL,
    integrations: [
      Sentry.browserTracingIntegration({ router }),
      Sentry.replayIntegration(),
    ],
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: TRACABLE_DOMAINS,
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
};
