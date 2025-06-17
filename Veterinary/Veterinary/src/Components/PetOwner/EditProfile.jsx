import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

const EditProfile = () => {
  const navigate = useNavigate();

  const storedName = localStorage.getItem("name") || "";
  const storedEmail = localStorage.getItem("email") || "";

  const [formData, setFormData] = useState({
    name: storedName,
    email: storedEmail,
    phone: "",
    alternate: "",
    address: "",
    gender: "",
    dob: "",
    emergency: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Something went wrong while updating profile.");
    }
  };

  const handleAddPet = () => {
    navigate("/register-pet", { state: { ownerData: formData } });
  };

  return (
    <div className="container-fluid p-0 d-flex">
      <div className="col-2 p-0">
        <Sidebar />
      </div>
      <div className="col-10 p-4 bg-white d-flex justify-content-center" style={{ minHeight: "100vh" }}>
        <div className="card mb-4 justify-content-center" style={{ width: "600px" }}>
          <div className="card-header d-flex justify-content-between align-items-center">
            <strong>Edit Pet Owner Profile</strong>
            <button className="btn btn-dark" onClick={handleAddPet}>+ Add Pet</button>
          </div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="phone" className="form-label">Phone Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="alternate" className="form-label">Alternate Contact</label>
                  <input
                    type="text"
                    className="form-control"
                    id="alternate"
                    name="alternate"
                    value={formData.alternate}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="gender" className="form-label">Gender</label>
                  <select
                    className="form-select"
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="dob" className="form-label">Date of Birth</label>
                  <input
                    type="date"
                    className="form-control"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="emergency" className="form-label">Emergency Contact</label>
                  <input
                    type="text"
                    className="form-control"
                    id="emergency"
                    name="emergency"
                    value={formData.emergency}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="row mb-4">
                <div className="col-md-12 text-end">
                  <button type="submit" className="btn btn-dark">
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
