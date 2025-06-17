// pages/Contact.js
import React from 'react';

const Contact = () => {
  return (
    <div className="bg-success text-white py-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-6">
            <h2 className="fw-bold">Ready to Give Your Pet the Best Care?</h2>
            <p>
              Schedule an appointment today and experience our comprehensive veterinary healthcare management system.
            </p>
            <a href="#" className="btn btn-light me-3">Book Appointment</a>
            <a href="#" className="btn btn-outline-light">Contact Us</a>
          </div>
          <div className="col-md-6">
            <ul className="list-unstyled">
              <li><i className="bi bi-telephone me-2"></i> (555) 123-4567</li>
              <li><i className="bi bi-envelope me-2"></i> info@petcare-vet.com</li>
              <li><i className="bi bi-geo-alt me-2"></i> 123 Pet Care Lane, Veterinary District, VT 12345</li>
              <li><i className="bi bi-clock me-2"></i> Mon–Fri: 8am–8pm</li>
              <li><i className="bi bi-calendar-week me-2"></i> Sat–Sun: 9am–5pm</li>
              <li><i className="bi bi-heart-pulse me-2"></i> Emergency Care: 24/7</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 d-flex justify-content-between flex-column flex-md-row">
          <small>© 2025 PetCare Veterinary Healthcare. All rights reserved.</small>
          <div>
            <a href="#" className="text-white me-3">Terms of Service</a>
            <a href="#" className="text-white">Privacy</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
