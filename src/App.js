import React from "react";
import { Routes, Route } from "react-router-dom"; // Import these
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Banner from "./components/Banner/Banner";
import Stone from "./components/Stone/Stone";
import AdminLogin from "./components/Login/Login";

// Import your upcoming event pages here
// import Ceremony from "./components/Ceremony/Ceremony";
// import Replays from "./components/Replays/Replays";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* The Landing Page (Home) */}
        <Route 
          path="/" 
          element={
            <>
              <Banner />
              <Home />
            </>
          } 
        />

        {/* The Individual Event Routes */}
        <Route path="/stone-laying-ceremony" element={<Stone /> } />
                <Route path="/admin-login" element={<AdminLogin /> } />

        <Route path="/replays" element={<div>Replay Content Here</div>} />
      </Routes>
    </>
  );
}

export default App;