import React from 'react'
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';

const App = () => {
  return (
    <div className="h-screen w-screen bg-[url('/chat.jpg')] bg-cover  bg-center">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path='/login' element={<LoginPage/>} />
        <Route path='/profile' element={<ProfilePage/>} />
      </Routes>
    </div>
  )
}

export default App