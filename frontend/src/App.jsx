import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './components/navbar'
import Footer from './components/footer'
import { AuthProvider } from './context/authContext'

const App = () => {
  return (
    <div >
      <AuthProvider>

       <Navbar/>
      <main className='min-h-screen max-w-screen-2xl mx-auto px-28 py-6 font-Montserrat'>
      <Outlet/>
      </main>
      </AuthProvider>
      <Footer/>
    </div>
  )
}

export default App

