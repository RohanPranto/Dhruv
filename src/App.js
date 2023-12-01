import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Album from './components/Album';
import Upload from './pages/Upload';
import Preview from './pages/Preview';
import './App.css';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home /> }/>
          <Route path="/upload" element={<Upload/>} />
          <Route path="/preview/:photoId" element={<Preview/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
