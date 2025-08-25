// Simple error handler without toast dependency
export function handleErrorWithToast(error: Error) {
  console.error('Error:', error)
  // Simple console logging for landing page - no toast needed
}

export function showSuccessToast(message: string) {
  console.log('Success:', message)
  // Simple console logging for landing page - no toast needed
}

export function showInfoToast(message: string) {
  console.log('Info:', message)
  // Simple console logging for landing page - no toast needed
}
