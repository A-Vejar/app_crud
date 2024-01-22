import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Crud } from './pages/Crud'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={ queryClient }>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={ <Crud /> }
          />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
