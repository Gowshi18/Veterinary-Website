import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";

const Veterinarians = () => {
  const [veterinarians, setVeterinarians] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:8080/api/veterinarian/all-vets")
      .then(res => setVeterinarians(res.data))
      .catch(err => console.error("Error fetching veterinarians:", err));
  }, []);

  const filteredVets = veterinarians.filter((vet) =>
    vet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vet.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vet.clinicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vet.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBookAppointment = (vet) => {
    navigate('/book-appointment', {
      state: {
        vet: {
          name: vet.name,
          specialization: vet.specialization,
          clinicName: vet.clinicName
        },
        serviceType: "Veterinarian"
      }
    });
  };

  return (
    <div className="container-fluid p-0 d-flex">
      <Sidebar />
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Our Veterinarians</h2>
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search by name, specialization, clinic, or location"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="list-group">
          {filteredVets.length > 0 ? (
            filteredVets.map((vet, index) => (
              <div key={index} className="veterinarian-card mb-4 p-3 shadow-sm">
                <div className="d-flex align-items-start">
                  <img
                    src={`http://localhost:8080${vet.imageUrl}`}
                    alt={vet.name}
                    className="rounded-circle"
                    style={{ width: "100px", height: "100px", objectFit: "cover" }}
                  />
                  <div className="flex-grow-1 px-3">
                    <h5 className="mb-1">{vet.name}</h5>
                    <p className="text-muted mb-1">{vet.specialization}</p>
                    <p className="mb-2">{vet.description}</p>
                    <span className="badge bg-secondary me-2">{vet.clinicName}</span>
                    <span className="badge bg-secondary">{vet.location}</span>
                    <p className="mb-1 mt-2"><strong>Phone:</strong> {vet.contactNumber}</p>
                    <p className="mb-0"><strong>Email:</strong> <a href={`mailto:${vet.email}`}>{vet.email}</a></p>
                  </div>
                  <div className="text-end">
                    <button className="btn btn-primary mb-2 w-100" onClick={() => handleBookAppointment(vet)}>
                      Book Appointment
                    </button>
                    
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No veterinarians found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Veterinarians;
