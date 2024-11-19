import { useState } from 'react'
import './App.css'
import ListingApp from './ListingApp'
import NavTop, {  } from "./components/NavTop";
import HomePage from './pages/HomePages/homePage';
import  SearchFeature  from './components/inventory/inventory';

function App() {
 

  return (
    <>
    <SearchFeature />
    <ListingApp />
    
    </>
  )
}

export default App
