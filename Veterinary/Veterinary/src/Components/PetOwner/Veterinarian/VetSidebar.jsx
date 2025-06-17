import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FaHome,
  FaCalendarAlt,
  FaUserFriends,
  FaFileMedical,
  FaComments,
  FaPills,
  FaSearch,
  FaCog,
  FaSignOutAlt,
  FaUser
} from 'react-icons/fa';

import './VetTheme.css';

const VetSidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="vh-100 border-end p-3 d-flex flex-column" style={{ width: '250px', height: '100vh', position: 'fixed', overflow: 'hidden' }}>
      <h4 className="mb-4 fw-bold">PetCare</h4>

      <ul className="nav flex-column flex-grow-1">
        <li className="nav-item mb-2">
          <NavLink to="/vet-dashboard" className="nav-link d-flex align-items-center text-dark fw-semibold">
            <FaHome className="me-2" /> Dashboard
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/vet-profile" className="nav-link d-flex align-items-center text-dark ">
            <FaUser className="me-2" /> Profile
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/vet-appointments" className="nav-link d-flex align-items-center text-dark">
            <FaCalendarAlt className="me-2" /> Appointments
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/patients" className="nav-link d-flex align-items-center text-dark">
            <FaUserFriends className="me-2" /> Patients
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/records" className="nav-link d-flex align-items-center text-dark">
            <FaFileMedical className="me-2" /> Health Records
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/vet-messages" className="nav-link d-flex align-items-center text-dark">
            <FaComments className="me-2" /> Messages
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/prescriptions" className="nav-link d-flex align-items-center text-dark">
            <FaPills className="me-2" /> Prescriptions
          </NavLink>
        </li>
        {/* <li className="nav-item mb-2">
          <NavLink to="/search" className="nav-link d-flex align-items-center text-dark">
            <FaSearch className="me-2" /> Search
          </NavLink>
        </li>
        <li className="nav-item mb-2">
          <NavLink to="/settings" className="nav-link d-flex align-items-center text-dark">
            <FaCog className="me-2" /> Settings
          </NavLink>
        </li> */}
      </ul>

      <button
        onClick={handleLogout}
        className="btn btn-outline-danger w-100 d-flex align-items-center justify-content-center mt-3"
      >
        <FaSignOutAlt className="me-2" /> Logout
      </button>
    </div>
  );
};

export default VetSidebar;
