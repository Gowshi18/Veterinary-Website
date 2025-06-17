import React, { useState } from "react";
import VetLayout from "./VetLayout";

const Prescription = () => {
  const [prescriptions, setPrescriptions] = useState([
    {
      pet: "Max",
      medication: "Amoxicillin",
      dosage: "250mg, Twice daily",
      date: "Apr 15, 2025",
      status: "Active",
    },
    {
      pet: "Bella",
      medication: "Prednisone",
      dosage: "5mg, Once daily",
      date: "Apr 20, 2025",
      status: "Active",
    },
    {
      pet: "Charlie",
      medication: "Apoquel",
      dosage: "16mg, Once daily",
      date: "Apr 22, 2025",
      status: "Active",
    },
    {
      pet: "Luna",
      medication: "Clavamox",
      dosage: "62.5mg, Twice daily",
      date: "Apr 10, 2025",
      status: "Completed",
    },
    {
      pet: "Rocky",
      medication: "Carprofen",
      dosage: "75mg, Twice daily",
      date: "Apr 18, 2025",
      status: "Active",
    },
  ]);

  return (
    <div className="container-fluid p-0 d-flex">
              <VetLayout />
    <div className="container my-5">
      <h2 className="mb-1 fw-bold">Prescriptions</h2>
      <p className="mb-4 text-muted">Create and manage pet prescriptions</p>
      <div className="row">
        {/* Left Form */}
        <div className="col-md-6 mb-4">
          <div className="card p-4 shadow-sm">
            <h4 className="fw-bold">New Prescription</h4>
            <p className="text-muted">Create a new prescription for a patient.</p>
            <form>
              <div className="mb-3">
                <label className="form-label">Pet</label>
                <select className="form-select">
                  <option>Select pet</option>
                  <option>Max</option>
                  <option>Bella</option>
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Owner</label>
                <input type="text" className="form-control" placeholder="Owner name" />
              </div>
              <div className="mb-3">
                <label className="form-label">Medication</label>
                <input type="text" className="form-control" placeholder="Medication name" />
              </div>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Dosage</label>
                  <input type="text" className="form-control" placeholder="e.g., 10mg" />
                </div>
                <div className="col-6 mb-3">
                  <label className="form-label">Frequency</label>
                  <select className="form-select">
                    <option>Select frequency</option>
                    <option>Once daily</option>
                    <option>Twice daily</option>
                  </select>
                </div>
              </div>
              <div className="row">
                <div className="col-6 mb-3">
                  <label className="form-label">Start Date</label>
                  <input type="date" className="form-control" />
                </div>
                <div className="col-4 mb-3">
                  <label className="form-label">Duration</label>
                  <input type="text" className="form-control" placeholder="Duration" />
                </div>
                <div className="col-2 mb-3">
                  <label className="form-label">Unit</label>
                  <select className="form-select">
                    <option>Days</option>
                    <option>Weeks</option>
                  </select>
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label">Special Instructions</label>
                <textarea className="form-control" rows="3" placeholder="Enter any special instructions or notes"></textarea>
              </div>
              <button className="btn btn-dark w-100">Create Prescription</button>
            </form>
          </div>
        </div>

        {/* Right Recent Prescriptions */}
        <div className="col-md-6">
          <h4 className="fw-bold mb-3">Recent Prescriptions</h4>
          <p className="text-muted">View and manage recent prescriptions.</p>

          {prescriptions.map((p, index) => (
            <div className="card p-3 mb-3 shadow-sm" key={index}>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5>{p.pet}</h5>
                  <p className="mb-1"><strong>Medication:</strong> {p.medication}</p>
                  <p className="mb-1"><strong>Dosage:</strong> {p.dosage}</p>
                  <p className="text-muted">Prescribed on {p.date}</p>
                </div>
                <span className={`badge rounded-pill bg-${p.status === "Completed" ? "secondary" : "dark"}`}>
                  {p.status}
                </span>
              </div>
              <div className="d-flex mt-2 gap-2">
                <button className="btn btn-outline-secondary w-100">
                  <i className="bi bi-printer me-1"></i> Print
                </button>
                <button className="btn btn-outline-secondary w-100">
                  <i className="bi bi-download me-1"></i> Download
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default Prescription;
