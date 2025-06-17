import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="bg-light-green py-5">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-5 fw-bold">
              Comprehensive Healthcare<br />for Your Beloved Pets
            </h1>
            <p className="lead text-muted">
              Our veterinary healthcare management system provides top-notch care for your pets with advanced technology and compassionate service.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="/book" className="btn btn-secondary btn-lg">Book Appointment</a>
              <a href="/services" className="btn btn-outline-dark btn-lg">Our Services</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
