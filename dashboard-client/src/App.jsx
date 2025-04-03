import AuthProvider from "./pages/Auth.jsx";
import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import RequireAuth from "./pages/ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<RequireAuth> <Home /> </RequireAuth>}/>
      </ Routes>
    </AuthProvider>
  )
}

export default App
