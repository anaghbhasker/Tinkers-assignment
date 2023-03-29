import './App.css';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './Components/Login';
import Cards from './Components/Cards';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
        </Routes>
        <Routes>
          <Route path='/pokemons' element={<Cards/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
