import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Play from './pages/Play'
import Result from './pages/Result';
import SignUp from './pages/SignUp';

function App() {
  // console.log("hehh")
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path = '/' element = {<Homepage/>}/>
          <Route path = '/play' element = {<Play/>}/>
          <Route path = '/Login' element = {<Login/>}/>
          <Route path = '/SignUp' element = {<SignUp/>}/>
          <Route path = '/Result' element = {<Result/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
