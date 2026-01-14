export function logError(err: unknown, context?: string) {
  try {
    const payload = {
      context: context || 'unknown',
      message: err instanceof Error ? err.message : String(err),
      stack: err instanceof Error ? err.stack : undefined,
      time: new Date().toISOString(),
    }
    // Placeholder: integrate Sentry or other provider here
    console.error('[LOG][ERROR]', payload)
  } catch {
    // noop
  }
}
