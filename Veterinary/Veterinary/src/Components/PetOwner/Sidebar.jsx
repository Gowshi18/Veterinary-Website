import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HouseDoorFill,
  PersonFill,
  JournalMedical,
  CalendarCheckFill,
  Scissors,
  PeopleFill,
  BellFill,
  ChatDotsFill,
  TelephoneFill,
  GearFill,
  BoxArrowRight,
} from "react-bootstrap-icons";
import { FaSyringe, FaPaw } from 'react-icons/fa';
import "bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="sidebar p-2" style={{ height: "100vh", width: '250px', overflowY: "auto" }}>
      <h5 className="mb-2">
        <FaPaw className="me-2" />
        PetCare
      </h5>

      <nav className="nav flex-column">
        <NavLink to="/Dashboard" className="nav-link">
          <HouseDoorFill className="me-2" />
          Dashboard
        </NavLink>

        <NavLink to="/profile" className="nav-link">
          <PersonFill className="me-2" />
          Profile
        </NavLink>

        {/* <a href="#" className="nav-link">
          <FaPaw className="me-2" />
          Pet Details
        </a> */}

        <div className="mt-3 mb-2 fw-bold">Health</div>

        <NavLink to="/vaccinations" className="nav-link">
          <FaSyringe className="me-2" />
          Vaccinations
        </NavLink>

  

        <NavLink to="/medical-history" className="nav-link">
          <JournalMedical className="me-2" />
          Medical History
        </NavLink>

        <NavLink to="/appointments" className="nav-link">
          <CalendarCheckFill className="me-2" />
          Appointments
        </NavLink>

        <div className="mt-3 mb-2 fw-bold">Services</div>

        <NavLink to="/spa-grooming" className="nav-link">
          <Scissors className="me-2" />
          Spa & Grooming
        </NavLink>

        <NavLink to="/veterinarians" className="nav-link">
          <PeopleFill className="me-2" />
          Veterinarians
        </NavLink>

        <NavLink to="/notifications" className="nav-link">
          <BellFill className="me-2" />
          Notifications
        </NavLink>

        <div className="mt-3 mb-2 fw-bold">Support</div>

        <NavLink to="/messages" className="nav-link">
          <ChatDotsFill className="me-2" />
          Chat
        </NavLink>

        <NavLink to="/emergency" className="nav-link">
          <TelephoneFill className="me-2" />
          Emergency
        </NavLink>

        {/* <a href="#" className="nav-link">
          <GearFill className="me-2" />
          Settings
        </a> */}

        <button className="btn btn-outline-danger mt-4 w-100 d-flex align-items-center justify-content-center"
          onClick={handleLogout}
        >
          <BoxArrowRight className="me-2" />
          Logout
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
