import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LazyGrid from './Components/LazyLoading/LazyGrid'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function App() {
  const [count, setCount] = useState(0)
  const queryClient = new QueryClient()

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      <div>
        <LazyGrid />
      </div>
    </>
  )
}

export default App
