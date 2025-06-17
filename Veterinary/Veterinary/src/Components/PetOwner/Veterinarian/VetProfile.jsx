import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import VetSidebar from "./VetSidebar";

const VetProfile = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const localName = localStorage.getItem("name");
  const localEmail = localStorage.getItem("email");
  const localClinic = localStorage.getItem("clinicName");

  const [formData, setFormData] = useState({
    name: localName || "",
    email: localEmail || "",
    contactNumber: "",
    clinicName: localClinic || "",
    specialization: "",
    experience: "",
    location: "",
    description: "",
    imageUrl: "",
  });

  useEffect(() => {
    const updated = location.state?.updatedData;

    if (updated) {
      setFormData(updated);
    } else {
      fetch(`http://localhost:8080/api/veterinarian/vet-profile?email=${localEmail}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch vet profile");
          return res.json();
        })
        .then((profile) => {
          setFormData({
            name: profile.name || "",
            email: profile.email || "",
            contactNumber: profile.contactNumber || "",
            clinicName: profile.clinicName || "",
            specialization: profile.specialization || "",
            experience: profile.experience || "",
            location: profile.location || "",
            description: profile.description || "",
            imageUrl: profile.imageUrl || "",
          });
        })
        .catch((error) => {
          console.error("Error fetching vet profile:", error);
        });
    }
  }, []);

  const handleEdit = () => {
    navigate("/edit-vet-profile", { state: { vetData: formData } });
  };

  return (
    <div className="d-flex min-vh-100">
      <div className="text-white p-3" style={{ width: "250px" }}>
        <VetSidebar />
      </div>

      <div className="flex-grow-1 p-4 d-flex justify-content-center align-items-start">
        <div className="card w-100" style={{ maxWidth: "800px" }}>
          <div className="card-header d-flex justify-content-between align-items-center">
          {formData.imageUrl && (
              <div className="text-center mb-3">
                <img
                  src={`http://localhost:8080${formData.imageUrl}`}
                  alt="Vet"
                  className="rounded-circle"
                  style={{ width: "75px", height: "75px", objectFit: "cover" }}
                />
              </div>
            )}
            <strong>Veterinarian Profile</strong>
           
            <button className="btn btn-dark" onClick={handleEdit}>
              Edit Profile
            </button>
          </div>
          <div className="card-body">
            
            <div className="row mb-2">
              <div className="col-md-6">
                <strong>Name:</strong> {formData.name}
              </div>
              <div className="col-md-6">
                <strong>Email:</strong> {formData.email}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6">
                <strong>Phone:</strong> {formData.contactNumber}
              </div>
              <div className="col-md-6">
                <strong>Clinic Name:</strong> {formData.clinicName}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6">
                <strong>Specialization:</strong> {formData.specialization}
              </div>
              {/* <div className="col-md-6">
                <strong>Experience:</strong> {formData.experience}
              </div> */}
              <div className="col-md-6">
                <strong>Description:</strong> {formData.description}
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6">
                <strong>Location:</strong> {formData.location}
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VetProfile;
