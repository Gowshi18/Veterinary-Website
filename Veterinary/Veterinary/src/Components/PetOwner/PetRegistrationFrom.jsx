import React, { useState, useEffect } from "react";
import { data, useLocation, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './PetRegistrationForm.css';
import Sidebar from "./Sidebar";
import axios from "axios";

const PetRegistrationForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const ownerProfile = location.state?.ownerData;

  const [formData, setFormData] = useState({
    petName: "",
    petType: "",
    breed: "",
    dob: "",
    gender: "",
    weight: "",
    color: "",
    petImage: null, // new
    medicalConditions: "",
    allergies: "",

    ownerName: "",
    email: "",
    phone: "",
    userId: ""
  });

  useEffect(() => {
    if (ownerProfile) {
      setFormData(prev => ({
        ...prev,
        ownerName: ownerProfile.name,
        email: ownerProfile.email,
        phone: ownerProfile.phone,
        userId: ownerProfile.id
      }));
    }
  }, [ownerProfile]);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "file" ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("petName", formData.petName);
    data.append("petType", formData.petType);
    data.append("breed", formData.breed);
    data.append("dob", formData.dob);
    data.append("gender", formData.gender);
    data.append("weight", formData.weight);
    data.append("color", formData.color);
    data.append("medicalConditions", formData.medicalConditions);
    data.append("allergies", formData.allergies);
    data.append("ownerId", formData.userId);
    data.append("ownerName", formData.ownerName );
    data.append("phone", formData.phone)
    if (formData.petImage) {
      data.append("petImage", formData.petImage);
    }

    try {
      const response = await axios.post(
        `http://localhost:8080/api/pets/register-pet?ownerEmail=${formData.email}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      
      if (response.status === 200 || response.status === 201) {
        alert("Pet registered successfully!");
        navigate("/profile", { state: { newPet: formData } });
      } else {
        alert("Failed to register pet.");
      }
      console.log(response.formData);
    } catch (error) {
      console.error("Error registering pet:", error);
      alert("An error occurred.");
    }
  };
  
  

  return (
    <div className="container-fluid p-0 d-flex">
      <Sidebar />
      <div className="container py-5 custom-container">
        <div className="card p-4 shadow-sm">
          <h2 className="text-center mb-3">Pet Registration</h2>
          <p className="text-muted">Register your pet by filling out the information below.</p>
          <form onSubmit={handleSubmit}>
            <h5 className="mt-4">Pet Information</h5>
            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label className="form-label">Pet Name*</label>
                <input type="text" className="form-control" name="petName" value={formData.petName} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Pet Type*</label>
                <select className="form-select" name="petType" value={formData.petType} onChange={handleChange} required>
                  <option value="">Select pet type</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label className="form-label">Breed*</label>
                <input type="text" className="form-control" name="breed" value={formData.breed} onChange={handleChange} required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Date of Birth*</label>
                <input type="date" className="form-control" name="dob" value={formData.dob} onChange={handleChange} required />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label className="form-label">Gender*</label>
                <select className="form-select" name="gender" value={formData.gender} onChange={handleChange} required>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Weight (kg)*</label>
                <input type="number" className="form-control" name="weight" value={formData.weight} onChange={handleChange} required />
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label className="form-label">Color/Markings*</label>
                <input type="text" className="form-control" name="color" value={formData.color} onChange={handleChange} required />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Pet Image</label>
                <input type="file" className="form-control" name="petImage" accept="image/*" onChange={handleChange} />
              </div>
            </div>

            <div className="mb-3">
              <label className="form-label">Medical Conditions</label>
              <textarea className="form-control" rows="2" name="medicalConditions" value={formData.medicalConditions} onChange={handleChange}></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Allergies</label>
              <textarea className="form-control" rows="2" name="allergies" value={formData.allergies} onChange={handleChange}></textarea>
            </div>

            <h5 className="mt-4">Owner Information</h5>
            <div className="row mb-3">
              <div className="col-md-6 mb-3">
                <label className="form-label">Owner Name*</label>
                <input type="text" className="form-control" name="ownerName" value={formData.ownerName} onChange={handleChange} readOnly />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Email*</label>
                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} readOnly />
              </div>
            </div>

            <div className="row mb-4">
              <div className="col-md-6 mb-3">
                <label className="form-label">Phone Number*</label>
                <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} readOnly />
              </div>
            </div>

            <button type="submit" className="btn btn-dark w-100">Register Pet</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PetRegistrationForm;
