import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './pages/loginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import { Toaster } from 'react-hot-toast'
import Testing from './pages/testing'
import RegisterPage from './pages/client/register'

function App() {
  const [count, setCount] = useState(0)

  return (
  <BrowserRouter>
  <Toaster position='top-right'/>
    <Routes path="/*">
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/dashboard/*' element={<Dashboard/>}/>
        <Route path='/testing' element={<Testing/>}/>
    </Routes>
  </BrowserRouter>
  )
}

export default App
