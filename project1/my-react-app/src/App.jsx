import { useState } from 'react'
import Header from './components/Header'
import Menu from './components/Menu'
import Maps from './components/Maps'
import NotesPage from './components/NotesPage'
import ItemsList from './components/ItemsList'
import Home from './components/Home'
import ProfilePage from './components/ProfilePage'

import './App.css'

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
    <Menu/>
    <Header/>

    <ProfilePage/>
    <Maps />
    <NotesPage />
    <Home />

    </>
  )
}

export default App
