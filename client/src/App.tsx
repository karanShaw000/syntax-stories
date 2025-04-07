import { RouterProvider } from 'react-router'
import { router } from './router'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from '@/components/ui/sonner'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry:1
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster position='top-center' richColors/>
    </QueryClientProvider>
  )
}

export default App
