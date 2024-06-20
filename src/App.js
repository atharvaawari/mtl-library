import React, {useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/FormComponent';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import Loader from './components/Loader/Loader';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/content-hub" element={<Home />} />
      </Routes>
    </Router>
  );
}


export default App;
