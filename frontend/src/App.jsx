import React from "react";
import Navbar from "./components/Navbar";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useAppContext } from "./context/AppContext.jsx";
import Footer from "./components/Footer.jsx";
import { useState } from "react";
import "./App.css";
import Home from "./components/pages/Home.jsx";
import About from "./components/pages/About.jsx";
import Contact from "./components/pages/Contact.jsx";
import Insights from "./components/pages/Insights.jsx";
import Login from "./components/Login.jsx";
import MarketData from "./components/pages/MarketData.jsx";
import Services from "./components/pages/Services.jsx";
import Discussion from "./components/pages/Discussion.jsx";
import ForgotPassword from "./components/ForgotPassword.jsx";
import Signup from "./components/Signup.jsx";

function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      {<Navbar />}
      <Toaster position="top-center" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/login" element={<Login />} />
        <Route path="/market-data" element={<MarketData />} />
        <Route path="/services" element={<Services />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
