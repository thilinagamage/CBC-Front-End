import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/loginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
  <Toaster position='top-right'/>
    <Routes path="/*">
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/dashboard/*' element={<Dashboard/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
