import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./Landing"; 
import Threshold from "./Threshold"; 
import Grayscale from "./Grayscale"; 
import Negative from "./Negative"; 
import Brightness from "./Brightness"; 
import Equalization from "./Equalization"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/threshold" element={<Threshold />} />
        <Route path="/grayscale" element={<Grayscale />} />
        <Route path="/negative" element={<Negative />} />
        <Route path="/brightness" element={<Brightness />} />
        <Route path="/equalization" element={<Equalization />} />
      </Routes>
    </Router>
  );
}

export default App;
