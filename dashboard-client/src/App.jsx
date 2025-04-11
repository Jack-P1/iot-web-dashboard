import AuthProvider from "./pages/Auth.jsx";
import Branch from "./pages/branch.jsx";
import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import Login from './pages/Login.jsx'
import Home from './pages/Home.jsx'
import EditItemForm from "./pages/EditItem.jsx";
import Item from './pages/Item.jsx'
import Navbar from "./pages/Navbar.jsx";
import RequireAuth from "./pages/ProtectedRoute.jsx";

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<RequireAuth> <Home /> </RequireAuth>}/>
        <Route path='/branch/:branchId' element={<RequireAuth> <Branch /></RequireAuth>} />
        <Route path='/item/:itemId' element={<RequireAuth> <Item /></RequireAuth>} />
        <Route path='/item/:itemId/edit' element={<RequireAuth allowedRoles={['admin']}> <EditItemForm /></RequireAuth>} />
      </ Routes>
    </AuthProvider>
  )
}

export default App
