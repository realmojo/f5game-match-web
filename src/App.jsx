import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Game } from "./components/Game";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </div>
  );
}

export default App;
