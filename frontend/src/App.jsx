import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SignUpPage from './pages/SignUpPage'
import LoginPage from './pages/LoginPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import { useAuthStore } from './store/useAuthStore'
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast'

function App() {
  const [count, setCount] = useState(0)
  const { authUser, checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  useEffect(() => {
    checkAuth()
  }, [checkAuth]);
  console.log({ onlineUsers })

  if(isCheckingAuth && !authUser) return (
    <div className="flex h-screen items-center justify-center ">
      <Loader className='size-10 animate-spin'/>
    </div>
  )
  return (
    <>
      <Navbar />

      <Routes>

        <Route path='/' element={authUser? <HomePage />: <Navigate to = '/login'/>} />
        <Route path='/signup' element={!authUser? <SignUpPage />: <Navigate to = '/'/>} />
        <Route path='/login' element={!authUser? <LoginPage  />: <Navigate to = '/'/>} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={authUser? <ProfilePage /> : <Navigate to = '/login'/>} />

      </Routes>

      <Toaster/>
    </>
  )
}

export default App
