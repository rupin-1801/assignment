import { Login, Register } from "./login-register";
import {Portal, AddJob} from "./Portal.js";
import "./index.css";
import {BrowserRouter, Route, Routes} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/signup" element={<Register/>}/>
          <Route path="/home/add" element={<AddJob/>}/>
          <Route path="/home" element={<Portal/>}/>
          <Route path="/" element={<Login/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
