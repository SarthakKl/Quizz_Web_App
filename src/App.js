import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Play from './pages/Play'
import Result from './pages/Result';
import SignUp from './pages/SignUp';
import Verify from './pages/Verify';
import Home from './pages/Home';
import Navbar from './common/Navbar';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  // console.log("hehh")
  const [loggedIn, setLoginState] = useState(false)
  useEffect(()=>{
    if (localStorage.getItem(process.env.REACT_APP_USER_TOKEN_KEY)) {
      const token = localStorage.getItem(process.env.REACT_APP_USER_TOKEN_KEY)
      console.log(token)
      axios.defaults.headers['authorization'] = token
      setLoginState(true)
    }
  },[])
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar loggedIn = {loggedIn} setLoginState={setLoginState}/>
        <Routes>
          <Route path = '/' element = {<Home/>}/>
          <Route path = '/quiz' element = {<Homepage loggedIn = {loggedIn} setLoginState={setLoginState}/>}/>
          <Route path = '/play' element = {<Play/>}/>
          <Route path = '/Login' element = {<Login setLoginState={setLoginState}/>}/>
          <Route path = '/SignUp' element = {<SignUp/>}/>
          <Route path = '/Result' element = {<Result/>}/>
          <Route path = '/:id/Login/verify/:token' element = {<Verify/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
