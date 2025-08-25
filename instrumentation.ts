// Simple instrumentation for landing page
export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('Landing page server initialized');
  }
}
