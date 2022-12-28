
import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Signin from './Components/Signin';
import Register from './Components/Register';
import Newgame from './Components/Newgame';
import State from './Context/State';
import Gamelayout from './Components/Gamelayout';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"

function App() {
  return (
    <>
      <State>
        <Router>
          <div className='container'>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/login' element={<Login />} />
              <Route path='/signin' element={<Signin />} />
              <Route path='/register' element={<Register />} />
              <Route path='/newgame' element={<Newgame />} />
              <Route path='/game' element={<Gamelayout/>} />
            </Routes>
          </div>
        </Router>
      </State>
    </>
  );
}

export default App;
