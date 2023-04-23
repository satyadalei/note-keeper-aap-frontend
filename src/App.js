import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from "./components/About";
import NoteState from './context/notes/noteStates';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import AlertState from './context/alerts/alertStates';
import LogInStates from './context/loginStatus/loginStates';
import UserStates from "./context/userDetails/userStates"
function App() {
  return (
     <>
      <UserStates>{/* user states - userStates*/}
        <LogInStates> {/* LogIn State - LogIn context */}
          <AlertState> {/* Alert State - Alert Context */}
            <NoteState> {/* Note State - Note context*/}
              <BrowserRouter>
                        <Navbar/>
                    <Alert/>
                    <div className="container">
                      <Routes>
                          <Route path='/' element={<Home/>} />
                          <Route path='/about' element={<About/>} />
                          <Route path='/login' element={<Login/>} />
                          <Route path='/signup' element={<Signup/>} />
                      </Routes>
                    </div>
                </BrowserRouter>
              </NoteState>
            </AlertState>
          </LogInStates>
        </UserStates>
     </>
  );
}

export default App;
