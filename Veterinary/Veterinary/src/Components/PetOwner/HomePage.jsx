import React from "react";
import Header from "./Header";
import HeroSection from "./HeroSection";
import ServicesSection from "./ServicesSection";
import About from "./About";
import Testimonials from "./Testimonals";
import Contact from "./Contact";

const HomePage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <ServicesSection />
      <About />
      <Testimonials />
      <Contact />
    </div>
  );
};

export default HomePage;
