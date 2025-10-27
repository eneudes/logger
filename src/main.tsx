import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import "./index.css"
import App from './App'
import List from './List'
import Create from './Create'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/list" element={<List/>} />
        <Route path="/create" element={<Create/>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
