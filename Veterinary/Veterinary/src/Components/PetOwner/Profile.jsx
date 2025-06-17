import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import "./Profile.css";
import "./Theme.css";

const Profile = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const localName = localStorage.getItem("name");
  const localEmail = localStorage.getItem("email");

  const [formData, setFormData] = useState({
    name: localName || "",
    email: localEmail || "",
    phone: "",
    alternate: "",
    address: "",
    gender: "",
    dob: "",
    emergency: "",
  });

  const [pets, setPets] = useState([]);

  // ✅ Fetch profile and pet list
  useEffect(() => {
    const updated = location.state?.updatedData;

    if (updated) {
      setFormData(updated);
    } else {
      fetch(`http://localhost:8080/api/profile?email=${localEmail}`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch profile");
          return res.text();
        })
        .then((text) => {
          const profile = text ? JSON.parse(text) : {};
          setFormData({
            name: localName || profile.name || "",
            email: localEmail || profile.email || "",
            phone: profile.phone || "",
            alternate: profile.alternate || "",
            address: profile.address || "",
            gender: profile.gender || "",
            dob: profile.dob?.trim() || "",
            emergency: profile.emergency || "",
          
          });

          // ✅ Fetch pets once profile is loaded
          fetch(`http://localhost:8080/api/pets?ownerEmail=${profile.email || localEmail}`)
            .then((res) => {
              if (!res.ok) throw new Error("Failed to fetch pets");
              return res.json();
            })
            .then((data) => setPets(data))
            .catch((error) => console.error("Error fetching pets:", error));
        })
        .catch((error) => {
          console.error("Error fetching profile:", error);
        });
    }
  }, []);

  const handleAddPet = () => {
    navigate("/register-pet", { state: { ownerData: formData } });
  };

  const handleEditProfile = () => {
    navigate("/edit-profile", { state: { ownerData: formData } });
  };

  return (
    <div className="container-fluid p-0 d-flex">
      <Sidebar />
      <div className="p-4 w-100">
        <div className="card mb-4">
          <div className="card-header d-flex justify-content-between align-items-center">
          
            <strong>Pet Owner Profile</strong>
            <div>
              <button className="btn btn-dark me-2" onClick={handleAddPet}>
                + Add Pet
              </button>
              <button className="btn btn-dark" onClick={handleEditProfile}>
                Edit Profile
              </button>
            </div>
          </div>
          <div className="card-body">
            <div className="row mb-2">
              <div className="col-md-6"><strong>Name:</strong> {formData.name}</div>
              <div className="col-md-6"><strong>Email:</strong> {formData.email}</div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6"><strong>Phone:</strong> {formData.phone}</div>
              <div className="col-md-6"><strong>Alternate:</strong> {formData.alternate}</div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6"><strong>Address:</strong> {formData.address}</div>
              <div className="col-md-6"><strong>Gender:</strong> {formData.gender}</div>
            </div>
            <div className="row mb-2">
              <div className="col-md-6"><strong>Date of Birth:</strong> {formData.dob}</div>
              <div className="col-md-6"><strong>Emergency Contact:</strong> {formData.emergency}</div>
            </div>
          </div>
        </div>

        {/* ✅ Pet List Section */}
        <div className="mt-4">
  <h5>Registered Pets</h5>
  <div className="row">
    {pets.length > 0 ? (
      pets.map((pet, index) => (
        <div className="col-md-4 mb-4" key={index}>
          <div className="card shadow-sm w-75 h-100">
          {pet.petImageName && (
  <div className="text-center mt-3">
    <img 
  src={`http://localhost:8080/uploads/${pet.petImageName}`}
  alt="Pet" 
  className="card-img-top"
  style={{ width: "225px", height: "150px", objectFit: "cover" }}
/>
  </div>
)}

            <div className="card-body">
              <h5 className="card-title text-center">{pet.petName}</h5>
              <p className="card-text ">Type: {pet.petType}</p>
              <p className="card-text">Breed: {pet.breed}</p>
              <p className="card-text">Gender: {pet.gender}</p>
              <p className="card-text">Color: {pet.color}</p>
              <p className="card-text">Weight: {pet.weight}</p>
            </div>
          </div>
         </div>
      ))
    ) : (
      <p className="text-muted">No pets registered yet.</p>
    )}
  </div>
</div>
</div>
    </div>
  );
};

export default Profile;
