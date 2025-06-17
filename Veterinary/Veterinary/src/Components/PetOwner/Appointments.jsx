import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import axios from "axios";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const email = localStorage.getItem("email");

  useEffect(() => {
    axios.get(`http://localhost:8080/api/appointments/user`, {
      params: {
        email: email
      }
    })
      .then(res => {
        // Ensure the response data is an array, otherwise set to empty array
        const data = Array.isArray(res.data) ? res.data : [];
        setAppointments(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error:", err);
        setError("Failed to fetch appointments");
        setLoading(false);
      });
  }, [email]);

  if (loading) {
    return (
      <div className="container-fluid p-0 d-flex">
        <Sidebar />
        <div className="container mt-5">
          <h4>Loading appointments...</h4>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid p-0 d-flex">
        <Sidebar />
        <div className="container mt-5">
          <h4 className="text-danger">{error}</h4>
        </div>
      </div>
    );
  }

  // Filter appointments by service type
  const groomingAppointments = appointments.filter(app => app.serviceType === "Grooming");
  const vaccinationAppointments = appointments.filter(app => app.serviceType === "Vaccination");
  const veterinarianAppointments = appointments.filter(app => app.serviceType === "Veterinarian");

  if (appointments.length === 0) {
    return (
      <div className="container-fluid p-0 d-flex">
        <Sidebar />
        <div className="container mt-5">
          <h4>No appointment data found.</h4>
        </div>
      </div>
    );
  }

  const renderAppointmentCard = (appointment, index) => {
    const imageUrl =
      appointment.serviceType === "Grooming"
        ? "https://www.barksidelodge.com/wp-content/uploads/Depositphotos_358834140_xl-2015-scaled.jpg"
        : appointment.serviceType === "Vaccination"
        ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxfLSig7WQbRUEQuGP4JLeomk0UTKUEOjwAQ&s"
        : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQCHjrMLB4SsiD2lMaODrtuCJ54oeJgTOey0nguUp9Y6XzG6tNnRx_h4Na1iwbb165pUkU&usqp=CAU";

    return (
      <div className="card mb-4 shadow-sm" key={index}>
        <div className="row g-0 align-items-center">
          {/* Image on the left */}
          <div className="col-md-3 d-flex justify-content-center align-items-center p-1">
            <img
              src={imageUrl}
              alt="Appointment"
              className="img-fluid rounded-circle border shadow"
              style={{ width: "150px", height: "150px", objectFit: "cover" }}
            />
          </div>

          {/* Center section with details */}
          <div className="col-md-5">
            <div className="card-body">
              <h5 className="card-title">{appointment.serviceType} Appointment</h5>
              <p><strong>Pet Name:</strong> {appointment.petName}</p>
              <p><strong>Pet Type:</strong> {appointment.petType}</p>
              {appointment.service && <p><strong>Service:</strong> {appointment.service}</p>}
              {appointment.vaccine && <p><strong>Vaccine:</strong> {appointment.vaccine}</p>}
              {appointment.vetName && (
                <>
                  <p><strong>Veterinarian:</strong> {appointment.vetName}</p>
                  {appointment.vetSpecialization && <p><strong>Specialization:</strong> {appointment.vetSpecialization}</p>}
                  {appointment.clinicName && <p><strong>Clinic:</strong> {appointment.clinicName}</p>}
                  {appointment.reason && <p><strong>Reason:</strong> {appointment.reason}</p>}
                </>
              )}
            </div>
          </div>

          {/* Date & Time on the right */}
          <div className="col-md-3 text-end pe-2">
            <div className="card-body">
              <p className="mb-2"><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Time:</strong> {appointment.time}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container-fluid p-0 d-flex">
      <Sidebar />
      <div className="container mt-4">
        <h2 className="mb-4 text-center">Upcoming Appointments</h2>

        {/* Grooming Appointments Section */}
        {groomingAppointments.length > 0 && (
          <div>
            <h3 className="mb-3">Grooming Appointments</h3>
            {groomingAppointments.map(renderAppointmentCard)}
          </div>
        )}

        {/* Vaccination Appointments Section */}
        {vaccinationAppointments.length > 0 && (
          <div>
            <h3 className="mb-3">Vaccination Appointments</h3>
            {vaccinationAppointments.map(renderAppointmentCard)}
          </div>
        )}

        {/* Veterinarian Appointments Section */}
        {veterinarianAppointments.length > 0 && (
          <div>
            <h3 className="mb-3">Veterinarian Appointments</h3>
            {veterinarianAppointments.map(renderAppointmentCard)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;