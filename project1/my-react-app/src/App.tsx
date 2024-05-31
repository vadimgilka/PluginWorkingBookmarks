import { useEffect, useState } from 'react'
import Header from './components/Header.tsx'
import Menu from './components/Menu.tsx'
import Maps from './components/Maps.tsx'
import NotesPage from './components/NotesPage.tsx'
import Home from './components/Home.tsx'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import Cookies from 'js-cookie';
import {Note, Category, Map, Notif} from './types/types.ts'
import React from 'react'
import ProfilePage from './components/ProfilePage.tsx'
import SignInForm from './components/SignInPage.tsx'
import SignUpForm from './components/SignUpPage.tsx'
import SetIsAuthContext from './hooks/SetIsAuth.tsx'
import MapPage from './components/MapPage.tsx'

function App() {
  const server_address= "http://localhost:3000"
  

  const note_tmp: Note[] = [];
  const [notes, setNotes] = useState<Note[]>(note_tmp);
  const categ_tmp: Category[] = [];
  const [categs, setCategs] = useState<Category[]>(categ_tmp);
  const map_tmp: Map[] = [];
  const [maps, setMaps] = useState<Map[]>(map_tmp);


  const [isAuth, setIsAuth] = useState<boolean>(
    Cookies.get("token") !== undefined
  );
console.log("token",Cookies.get("token"));
console.log("cookies",Cookies);
  useEffect(() => {

  let isLoading: boolean = false;
    fetch(server_address + "/notes", { credentials: "include"})
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Request failed.");
      })
      .then((json) => {
        if (isLoading == false) {
          setNotes(json);
          console.log("saved notes", json);
          isLoading = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });

      let isLoadingCateg: boolean = false;
      fetch(server_address + "/categories", { credentials: "include" })
      .then((response) => {
        if (response.ok) return response.json();
        throw new Error("Request failed.");
      })
      .then((json) => {
        if (isLoadingCateg == false) {
          setCategs(json);
          console.log("saved categ", json);
          isLoadingCateg = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });

      
      let isLoadingMap: boolean = false;
      fetch(server_address + "/maps", { credentials: "include" })
      .then((response) => {
        console.log("Maps response: ", response);
        if (response.ok) return response.json();
        throw new Error("Request failed.");
      })
      .then((json) => {
        if (isLoadingMap == false) {
          setMaps(json);
          console.log("saved maps", json);
          isLoadingMap = true;
        }
      })
      .catch((error) => {
        console.log(error);
      });


  }, [isAuth]);

  


const errElm =  <div className='errormsg'>404 Page Not Found</div>;
  return (
    
   <>
   <SetIsAuthContext.Provider value = {setIsAuth}>
    <Router>
        <Menu/>
       <Header isAuth = {isAuth}/>
         <Routes>
          <Route  path = '/map' Component={(props) => <MapPage {...props} notes={notes} isAuth={isAuth} />} errorElement = {errElm} />
          <Route  path = '/maps' Component={(props) => <Maps {...props} maps={maps} isAuth={isAuth}/>} errorElement = {errElm} />
          <Route  path = '/profile' Component={(props) => <ProfilePage {...props}  notes={notes} isAuth={isAuth}  setMaps={setMaps} setCategs={setCategs} setNotes={setNotes}/>} errorElement = {errElm}  />
          <Route  path = '/'Component={(props) => <Home {...props} isAuth={isAuth}/>} errorElement = {errElm} />
          <Route  path = '/archive'  Component={(props) => <NotesPage {...props}  notes={notes} categs={categs} setCategs={setCategs} setNotes={setNotes} isAuth={isAuth}/>} errorElement = {errElm}/>
          <Route  path = '/login' Component={SignInForm} errorElement = {errElm} />
          <Route  path = '/signup' Component={SignUpForm} errorElement = {errElm} />
        </Routes>;
    </Router>
    </SetIsAuthContext.Provider>
    </>

  )
}

export default App
