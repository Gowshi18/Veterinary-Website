import React from 'react';
import {BrowserRouter as Router, Routes,Route, } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './App.css';

import HomePage from './Components/PetOwner/HomePage';
import LoginPage from './Pages/LoginPage';

import Signup from './Pages/Signup';

import Dashboard from './Components/PetOwner/Dashboard';
import Profile from './Components/PetOwner/Profile';
import PetRegistrationForm from './Components/PetOwner/PetRegistrationFrom';
import Layout from './Components/PetOwner/Layout';
import SpaGrooming from './Components/PetOwner/SpaGrooming';
import EditProfile from './Components/PetOwner/EditProfile';
import Appointments from './Components/PetOwner/Appointments';
import Vaccinations from './Components/PetOwner/Vaccinations';
import { AppointmentsProvider } from "./Components/PetOwner/AppointmentsContext";
import BookAppointment from './Components/PetOwner/BookAppointment';
import Veterinarians from './Components/PetOwner/Veterinarians';
import VeterinarianAvailability from './Components/PetOwner/VeterinarianAvailability';
import VetDashboard from './Components/PetOwner/Veterinarian/VetDashboard';
import VetSidebar from './Components/PetOwner/Veterinarian/VetSidebar';
import VetAppointments from './Components/PetOwner/Veterinarian/VetAppointments';
import VetMessages from './Components/PetOwner/Veterinarian/VetMessages';
import Prescription from './Components/PetOwner/Veterinarian/Prescription';
import Messages from './Components/PetOwner/Messages';
import Patients from './Components/PetOwner/Veterinarian/Patients';
import HealthRecords from './Components/PetOwner/Veterinarian/HealthRecords';
import Emergency from './Components/PetOwner/Emergency';
import AppointmentForm from './Components/PetOwner/AppointmentForm';
import MedicalHistory from './Components/PetOwner/MedicalHistory';
import EditVetProfile from './Components/PetOwner/Veterinarian/EditVetProfile';
import VetProfile from './Components/PetOwner/Veterinarian/VetProfile';
import NotificationPage from './Components/PetOwner/NotificationPage';




function App() {
  return (
    <AppointmentsProvider>
    <Router>
    <Routes>
    <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/signup" element={<Signup/>} />
      
      <Route path="/Layout" element={<Layout />}/>
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/register-pet" element={<PetRegistrationForm  />} />
      <Route path="/edit-profile" element={<EditProfile />} />
      <Route path="/spa-grooming" element={<SpaGrooming />} />
      <Route path="/appointments" element={<Appointments />} />
      <Route path="/vaccinations" element={<Vaccinations />} />
      <Route path="/book-appointment" element={<BookAppointment />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/veterinarians" element ={<Veterinarians />} />
      <Route path="/vet-availability" element={<VeterinarianAvailability />} />
      <Route path="/vet-dashboard" element={<VetDashboard />} />
      <Route path="/vet-sidebar" element={<VetSidebar />} />
      <Route path="/vet-appointments" element={<VetAppointments />} />
      <Route path="/vet-messages" element={<VetMessages />} />
      <Route path="/prescriptions" element={<Prescription />} />
      <Route path="/patients" element={<Patients />} />
      <Route path="/records" element={<HealthRecords />} />
      <Route path="/emergency" element={<Emergency />} />
      <Route path="/appointment-form" element={<AppointmentForm />} />
      
      <Route path="/medical-history" element={<MedicalHistory />} />
      <Route path="/edit-vet-profile" element={<EditVetProfile />} />
      <Route path ="/vet-profile" element={<VetProfile />} />
      <Route path= "/notifications" element={<NotificationPage />} />
    </Routes>
    </Router>
    </AppointmentsProvider>

  );
}

export default App;
