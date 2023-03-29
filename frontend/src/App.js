import './App.css';
import Login from "./components/login/login";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/register/register';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path = '/' element = {<Login/>}></Route>
        <Route path = '/register' element = {<Register/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
