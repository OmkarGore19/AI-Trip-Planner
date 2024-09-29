import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Hero from "./components/custom/Hero";
import Footer from "./view-trip/components/Footer";

function App() {
  return (
    <div className="font-ubuntu">
      <Hero />
    </div>
  );
}

export default App;
