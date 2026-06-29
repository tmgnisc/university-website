// Central client-side error reporting hook.
//
// Today it just logs to the console. To wire up a real provider (Sentry,
// LogRocket, a custom endpoint, ...) implement `sink` below — every error
// boundary already funnels through `reportError`, so there is a single place
// to change.

type ErrorContext = Record<string, unknown>;

type ErrorSink = (error: unknown, context: ErrorContext) => void;

const sink: ErrorSink | undefined = undefined;

export function reportError(error: unknown, context: ErrorContext = {}) {
  if (typeof window === "undefined") return;

  const enriched: ErrorContext = {
    route: window.location.pathname,
    ...context,
  };

  if (sink) {
    sink(error, enriched);
    return;
  }

  console.error("[error-reporting]", error, enriched);
}
