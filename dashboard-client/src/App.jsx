import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Welcome from './pages/Welcome.jsx'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/welcome' element={<Welcome />}/>
    </ Routes>
  )
}

export default App
