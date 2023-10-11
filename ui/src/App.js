import './App.css';
import React from 'react';
import { BrowserRouter } from "react-router-dom";
import Router from "./navigation/Router";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Router></Router>
      </BrowserRouter>
    </div>
  );
}

export default App;
