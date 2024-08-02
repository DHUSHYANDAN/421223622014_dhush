import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React  from 'react';

import Home from './components/home';
import Index from './components/index';
import Edit from './components/edit';
// import Delete from './components/delete';
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/addUsers" element={<Home />} />
        <Route path="/viewUsers" element={<Index />} />
        <Route path="/UpdateUsers/:registration_number" element={<Edit />} />
        {/* <Route path="/DeleteUsers" element={<Delete />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
