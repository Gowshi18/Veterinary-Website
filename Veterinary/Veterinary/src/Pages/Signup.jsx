import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Signup.css";
import { useNavigate } from 'react-router-dom'

const Signup = () => {
  const navigate = useNavigate()

  const [userType, setUserType] = useState("petOwner");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const userData = {
      firstName,
      lastName,
      email,
      password,
      role: userType,
      clinicName: userType === "vet" ? clinicName : null,
    };

    try {
      await axios.post("http://localhost:8080/api/auth/signup", userData)
      .then(res=>{
        localStorage.setItem("name", res.data.firstName + " " + res.data.lastName);
        localStorage.setItem("id", res.data.id)
        localStorage.setItem("email", res.data.email)
        if(res.data.role === "petOwner"){
          navigate('/Dashboard')
          alert("Signup successful!");
        }else{
          navigate('/vet-dashboard');
          alert("Signup successful!");
        }
      })
      .catch(err=>{
        alert(err)
      })
    } catch (error) {
      console.error("Signup error:", error);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="bg-image d-flex justify-content-center align-items-center vh-100 w-100">
      <div className="signup-container p-3 text-dark">
        <h3 className="text-center fw-bold mb-1">Create an Account</h3>
        <p className="text-center text-muted mb-3">Fill in your information to get started</p>

        <div className="btn-group w-100 mb-3">
          <button
            className={`btn ${userType === "petOwner" ? "btn-light border" : "btn-outline-light text-muted"}`}
            onClick={() => setUserType("petOwner")}
          >
            🐾 Pet Owner
          </button>
          <button
            className={`btn ${userType === "vet" ? "btn-light border" : "btn-outline-light text-muted"}`}
            onClick={() => setUserType("vet")}
          >
            👩‍⚕️ Veterinarian
          </button>
        </div>

        <form onSubmit={handleSignup}>
          <div className="d-flex gap-2 mb-2">
            <input type="text" className="form-control" placeholder="First name" value={firstName} required onChange={(e) => setFirstName(e.target.value)} />
            <input type="text" className="form-control" placeholder="Last name" value={lastName} required onChange={(e) => setLastName(e.target.value)} />
          </div>

          {userType === "vet" && (
            <input type="text" className="form-control mb-2" placeholder="Clinic Name" value={clinicName} required onChange={(e) => setClinicName(e.target.value)} />
          )}

          <input type="email" className="form-control mb-2" placeholder="Email" value={email}  required onChange={(e) => setEmail(e.target.value)} />
          <input type="password" className="form-control mb-2" placeholder="Password" value={password} required onChange={(e) => setPassword(e.target.value)} />
          <input type="password" className="form-control mb-3" placeholder="Confirm Password" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />

          <button type="submit" className="btn btn-dark w-100 mb-2">Create Account</button>

          <p className="text-center mb-1">
            Already have an account? <a href="/login">Login</a>
          </p>

          <div className="text-center mt-1">
            <a href="/" className="text-muted text-decoration-none">
              <i className="bi bi-arrow-left"></i> Back to home
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
