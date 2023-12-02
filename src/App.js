import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Upload from './pages/Upload';
import './App.css';
import PhotoDetails from './pages/PhotoDetails';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home /> }/>
          <Route path="/upload" element={<Upload/>} />
          <Route path="/photos/:documentId" element={<PhotoDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
