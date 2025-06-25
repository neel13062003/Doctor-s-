import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PatientForm from "./components/PatientForm";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PatientForm />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
