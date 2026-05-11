// App.js
import React from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Banner from "./components/Banner/Banner";

function App() {
  return (
    <>
    <Navbar />
    <Banner />
    <Home />
    </>
  );
}

export default App;
