import { useState } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'

import Register from './components/Register'
import Login from './components/Login'
import Track from './components/Track'
import NotFound from './components/NotFound'



function App() {
  

  return (
    <>
    
      
      <BrowserRouter>
      
      <Routes>

      <Route path='/' element={<Login/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/track' element={<Track/>}/>
      <Route path='*' element={<NotFound/>}/>
      </Routes>
      
      </BrowserRouter>
    </>
  )
}

export default App
