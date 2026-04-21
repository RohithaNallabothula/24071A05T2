import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import About from "./About";
import Contact from "./Contact";
import "./App.css";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#ddd" }}>
        <Link to="/" style={{ margin: "10px" }}>Register</Link>
        <Link to="/login" style={{ margin: "10px" }}>Login</Link>
        <Link to="/about" style={{ margin: "10px" }}>About</Link>
        <Link to="/contact" style={{ margin: "10px" }}>Contact</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;