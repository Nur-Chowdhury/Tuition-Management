import React from "react";
import Navbar from "../components/Home/Navbar";
import FAQ from "../components/Home/Faq";
import Contact from "../components/Home/Contact";
import AboutUs from "../components/Home/AboutUs";
import Footer from "../components/Home/Footer";
import Hero from '../assets/welcome.png';

export default function Home() {

  return (
    <div>
      <Navbar />
      <div className="w-full">
        <img
          src={Hero}
          alt="Welcome"
          className="w-full object-cover"
        />
      </div>
      <FAQ />
      <AboutUs />
      <Contact />
      <Footer />
    </div>
  );
}
