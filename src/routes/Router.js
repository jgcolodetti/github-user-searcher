import React from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Home from '../pages/Home';
import History from '../pages/History';
import NavBar from '../components/NavBar';


const Router = () => {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/history' element={<History />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default Router;