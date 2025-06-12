import { useState } from 'react'
import './App.css'
import LoginPage from './pages/loginPage'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import { Toaster } from 'react-hot-toast'
import Testing from './pages/testing'
import RegisterPage from './pages/client/register'
import HomePage from './pages/homePage'
import { GoogleOAuthProvider } from '@react-oauth/google'

function App() {
  const [count, setCount] = useState(0)

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>  
  <BrowserRouter>
  <Toaster position='top-right'/>
    <Routes path="/*">
        
        <Route path='/login' element={<LoginPage/>}/>
        <Route path='/register' element={<RegisterPage/>}/>
        <Route path='/dashboard/*' element={<Dashboard/>}/>
        <Route path='/testing' element={<Testing/>}/>
        <Route path='/*' element={<HomePage/>}/>
    </Routes>
  </BrowserRouter>
  </GoogleOAuthProvider>
  )
}

export default App
