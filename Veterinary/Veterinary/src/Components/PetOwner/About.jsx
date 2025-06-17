// pages/About.js
import React from 'react';

const About = () => {
  return (
    <div className="py-5 bg-light">
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6">
          <img
  src="https://img.freepik.com/free-photo/close-up-veterinary-doctor-taking-care-pet_23-2149267934.jpg" // replace with your image URL
  alt="Testimonial User"
  className="img-fluid rounded border"
  style={{ height: '300px', width: '100%', objectFit: 'cover' }}
/>

          </div>
          <div className="col-md-6">
            <span className="badge bg-success mb-3 large-badge">About Us</span>
            <h2 className="fw-bold">Dedicated to Animal Health</h2>
            <p className="text-muted">
              With over 15 years of experience, our team of veterinary professionals is committed to providing exceptional care for your pets. We combine cutting-edge technology with compassionate service to ensure the best possible outcomes.
            </p>
            <ul className="list-unstyled text-muted">
              <li>✔ Board-certified veterinarians</li>
              <li>✔ State-of-the-art facilities</li>
              <li>✔ Compassionate care approach</li>
            </ul>
            <a href="#" className="btn btn-success">
              Learn More About Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
