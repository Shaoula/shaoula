import { acceptHMRUpdate, defineStore } from 'pinia'

interface Toast {
  id?: string
  message: string
  visual?: string
  action?: string
  onAction?: () => void
  undo?: () => void
  status?: 'success' | 'error' | 'warning'
  timeout?: number
  pauseOnFocusLoss?: boolean
  pauseOnHover?: boolean
  hideProgressBar?: false
  closeOnClick?: boolean
  closeButton?: boolean
  //   placement?: 'top-left' | 'top' | 'top-right' | 'bottom-left' | 'bottom' | 'bottom-right'
  placement?: string
}

const useToasts = defineStore('toastStore', {
  state: () => ({
    toasts: [] as Toast[],
  }),
  actions: {
    toast(message: string | Toast) {
      const toast = typeof message === 'string' ? { message } : message
      toast.id = `toast-${Math.random().toString(36).substr(2, 9)}`
      // this.toasts.push(toast)
      this.toasts.unshift(toast)
    },
    close(id: string) {
      const toast = this.toasts.find(toast => toast.id === id)
      if (toast)
        this.toasts.splice(this.toasts.indexOf(toast), 1)
    },
  },
})

// const toastStore = useToastStore()

// export default function useToasts() {
//   return {
//     toasts: toastStore.toasts as readonly Toast[],
//     toast(item: string | Toast) {
//       toastStore.addToast(item)
//     },
//     close(id: string) {
//       const toast = toastStore.toasts.find(toast => toast.id === id)
//       if (toast)
//         toastStore.removeToast(toast)
//     },
//     clear() {
//       toastStore.toasts = []
//     },
//     byPlacement(placement: string) {
//       return toastStore.toasts.filter(toast => toast.placement === placement)
//     },
//   }
// }

export default useToasts

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useToasts, import.meta.hot))
