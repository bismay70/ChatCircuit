import React,{useContext} from 'react'
import { AuthContext } from '../context/AuthContext';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import {Toaster} from "react-hot-toast";

const App = () => {
  const {authUser} = useContext(AuthContext);
  return (
    <div className="h-screen w-screen bg-[url('/chat.jpg')] bg-cover  bg-center">
      <Toaster />
      <Routes>

        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/login' element={ !authUser ? <LoginPage/> : <Navigate to="/" />} />
        <Route path='/profile' element={authUser ? <ProfilePage/> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App