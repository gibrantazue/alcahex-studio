import { toast } from "sonner"

export function handleErrorWithToast(error: Error) {
  console.error('Error:', error)
  toast.error(error.message || 'An error occurred')
}

export function showSuccessToast(message: string) {
  toast.success(message)
}

export function showInfoToast(message: string) {
  toast.info(message)
}
