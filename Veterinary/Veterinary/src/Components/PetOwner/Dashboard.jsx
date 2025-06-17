// pages/Dashboard.js
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FileEarmarkTextFill,
  EnvelopeFill,
  Calendar2CheckFill,
  CalendarCheckFill,
  JournalMedical,
  ChatDotsFill,
} from "react-bootstrap-icons";
import {FaPaw} from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import Sidebar from "./Sidebar";
import './Theme.css';
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Dashboard =  () => {
  const name = localStorage.getItem("name");
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [PetCount,setPetCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/appointments/count");
        setAppointmentCount(response.data.count); // assuming response.data contains the count   
        setPetCount(response.data.petcount)     
      } catch (error) {
        console.error("Error fetching appointment count:", error);
      }
    }
    fetchCount();
  }, []);
 return(
  <div className="container-fluid p-0 d-flex">
  
    <Sidebar />
  
  <div className="container col-10 p-3" style={{ minHeight: "100vh" }}>
    <div className="d-flex justify-content-between align-items-center mb-4">
      <div>
        <h3>Hi, <strong>{name}</strong>!</h3>
        <p>Here's what's happening with your pets today.</p>
      </div>
      <NavLink to="/appointment-form" className="btn btn-dark">+ Book Appointment</NavLink>
    </div>

    <div className="row mb-4 g-3 w-100">
      <div className="col-12 col-sm-6 col-md-3">
        <div className="card text-center p-3" style={{ minHeight: "150px", height: "175px" }}>
          <h5>Upcoming Appointments</h5>
          <p>{appointmentCount}<br /><small>Next: Max's checkup on May 15</small></p>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-3">
        <div className="card text-center p-3" style={{ minHeight: "120px", height: "175px" }}>
          <h5>Pets Registered</h5>
          <p>{PetCount}<br /><small>Buddy (Dog) and Luna (Cat)</small></p>
        </div>
      </div>
      <div className="col-12 col-sm-6 col-md-3">
        <div className="card text-center p-3" style={{ minHeight: "120px", height: "175px" }}>
          <h5>Pending Vaccinations</h5>
          <p>1<br /><small>Luna's rabies shot due in 2 weeks</small></p>
        </div>
      </div>
      {/* <div className="col-12 col-sm-6 col-md-3">
        <div className="card text-center p-3" style={{ minHeight: "120px", height: "150px" }}>
          <h5>Unread Messages</h5>
          <p>5<br /><small>3 from Dr. Smith, 2 from reception</small></p>
        </div>
      </div> */}
    </div>

    <div className="row">
      <div className="col-md-5 d-flex justify-content-center mb-4">
        <div className="card mb-4 " style={{ maxWidth: '22rem', width: '100%', margin: '5px' }}>
          <div className="card-header"><strong>Recent Notifications</strong></div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <FileEarmarkTextFill className="me-2" />
              Vaccination Reminder <span className="badge bg-secondary ms-2">New</span><br />
              <small>Luna's rabies vaccination is due on May 28, 2025</small>
            </li>
            <li className="list-group-item">
              <EnvelopeFill className="me-2" />
              Message from Dr. Smith <span className="badge bg-secondary ms-2">New</span><br />
              <small>Max's test results are ready. Please check the medical records section.</small>
            </li>
            <li className="list-group-item">
              <Calendar2CheckFill className="me-2" />
              Appointment Confirmed<br />
              <small>Your appointment for Max on May 15, 2025 at 10:00 AM has been confirmed.</small>
            </li>
          </ul>
        </div>
      </div>

      <div className="col-md-5 d-flex justify-content-center mb-4">
        <div className="card mb-4" style={{ maxWidth: '22rem', width: '100%', margin: '5px' }}>
          <div className="card-header"><strong>Quick Actions</strong></div>
          <ul className="list-group list-group-flush">
            <li className="list-group-item"><CalendarCheckFill className="me-2" />Book Appointment</li>
            <li className="list-group-item"><FaPaw className="me-2" />View Pet Profile</li>
            <li className="list-group-item"><JournalMedical className="me-2" />View Medical History</li>
            <li className="list-group-item"><ChatDotsFill className="me-2" />Message Doctor</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</div>
 )
}

export default Dashboard;
