import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ServicesSection.css';

const services = [
  {
    icon: "bi-shield-check",
    title: "Preventive Care",
    description: "Regular check-ups, vaccinations, and preventive treatments to keep your pet healthy."
  },
  {
    icon: "bi-heart-pulse",
    title: "Medical Treatment",
    description: "Diagnosis and treatment of illnesses, injuries, and chronic conditions."
  },
  {
    icon: "bi-bell",
    title: "Alerts & Notifications",
    description: "Stay updated with instant alerts for appointments, vaccinations, and important pet health updates."
  },
  {
    icon: "bi-calendar-check",
    title: "Appointment Scheduling",
    description: "Easy online booking system for appointments and follow-ups."
  },
  {
    icon: "bi-clock-history",
    title: "24/7 Emergency Care",
    description: "Round-the-clock emergency services for critical situations."
  },
  {
    icon: "bi-envelope-paper",
    title: "Digital Records",
    description: "Secure online access to your pet's medical history and treatment plans."
  },
];

const ServicesSection = () => {
  return (
    <section className="services-section py-5">
      <div className="container-fluid">
        <div className="text-center mb-4">
          <span className="badge bg-success mb-3 large-badge">Our Services</span>
          <h2 className="fw-bold">Comprehensive Pet Healthcare</h2>
          <p className="text-muted">
            We offer a wide range of veterinary services to keep your pets healthy and happy.
          </p>
        </div>

        <div className="row gy-4">
          {services.map((service, index) => (
            <div className="col-md-4 col-sm-6" key={index}>
              <div className="service-card shadow-sm h-100 border p-4 rounded">
                <div className="d-flex align-items-start mb-3">
                  <i className={`bi ${service.icon} text-success fs-3 me-3`}></i>
                  <div>
                    <h5 className="fw-bold mb-1">{service.title}</h5>
                    <p className="text-muted mb-0">{service.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default ServicesSection;
