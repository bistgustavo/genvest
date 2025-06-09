import React from "react";
import Navbar from "./components/Navbar.jsx";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer.jsx";
import "./App.css";
import Home from "./components/pages/Home.jsx";
import About from "./components/pages/About.jsx";
import Contact from "./components/pages/Contact.jsx";
import Insights from "./components/pages/Insights.jsx";
import Login from "./components/pages/Login.jsx";
import Services from "./components/pages/Services.jsx";
import Discussion from "./components/pages/Discussion.jsx";
import ForgetPassword from "./components/ForgotPassword.jsx";
import Signup from "./components/Signup.jsx";
import Profile from "./components/pages/Profile.jsx";
import FAQ from "./components/pages/FAQ.jsx";
import Portfolio from "./components/pages/Portfolio.jsx";

function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-center" />
      <Navbar />
      <div className="mt-9"></div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/insights" element={<Insights />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/market-data" element={<MarketData />} /> */}
        <Route path="/services" element={<Services />} />
        <Route path="/discussion" element={<Discussion />} />
        <Route path="/forgot-password" element={<ForgetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
