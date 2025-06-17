import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import axios from "axios";

const BookAppointment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { vet } = location.state || {};
  const ownerName = localStorage.getItem("name");
  const userEmail = localStorage.getItem("email");

  const [formData, setFormData] = useState({
    petName: "",
    petType: "Dog",
    date: "",
    time: "",
    ownerName: ownerName,
    userEmail: userEmail,
  });

  const [reason, setReason] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointment = {
      petName: formData.petName,
      petType: formData.petType,
      serviceType: "Veterinarian",
      date: formData.date,
      time: formData.time,
      vetName: vet?.name || null,
      vetSpecialization: vet?.specialization || null,
      clinicName: vet?.clinicName || null,
      reason: reason,
      ownerName: ownerName,
      userEmail: userEmail,
    };

    try {
      // Book the appointment
      await axios.post("http://localhost:8080/api/appointments", appointment);

      // 🔔 Send notification if date is today
      const today = new Date().toISOString().split("T")[0];
      if (formData.date === today) {
        await axios.post("http://localhost:8080/api/notifications/appointment-alert", {
          userEmail: formData.userEmail,
          date: new Date(formData.date).toISOString().split("T")[0],
          time: formData.time,
        });
      }

      // 🔄 Fetch latest notifications
      const response = await axios.get(`http://localhost:8080/api/notifications/${userEmail}`);
      setNotifications(response.data);

      setBookingSuccess(true);
      setTimeout(() => {
        navigate("/appointments");
      }, 2000);
    } catch (err) {
      console.error("Error booking appointment:", err);
    }
  };

  return (
    <div className="container-fluid p-0 d-flex">
      <Sidebar />
      <div className="container mt-5" style={{ marginLeft: "260px", maxWidth: "600px" }}>
        <h2 className="mb-3">Book Veterinarian Appointment</h2>

        {bookingSuccess ? (
          <div className="alert alert-success">
            Appointment booked successfully! Redirecting to appointments page...
          </div>
        ) : (
          <div className="card shadow p-4">
            {vet && (
              <>
                <h5 className="mb-3">Veterinarian Details</h5>
                <div className="mb-2">
                  <strong>Name:</strong> {vet.name}
                </div>
                <div className="mb-2">
                  <strong>Specialization:</strong> {vet.specialization}
                </div>
                <div className="mb-4">
                  <strong>Clinic:</strong> {vet.clinicName}
                </div>
              </>
            )}

            <h5 className="mb-3">Pet Appointment Form</h5>
            <form className="w-100" onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Pet Name</label>
                <input
                  type="text"
                  name="petName"
                  className="form-control"
                  required
                  value={formData.petName}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Pet Type</label>
                <select
                  name="petType"
                  className="form-select"
                  value={formData.petType}
                  onChange={handleChange}
                >
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                  <option value="Bird">Bird</option>
                  <option value="Rabbit">Rabbit</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Appointment Date</label>
                <input
                  type="date"
                  name="date"
                  className="form-control"
                  required
                  value={formData.date}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Appointment Time</label>
                <input
                  type="time"
                  name="time"
                  className="form-control"
                  required
                  value={formData.time}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-4">
                <label className="form-label">Reason for Visit</label>
                <textarea
                  className="form-control"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows="3"
                  required
                />
              </div>

              <div className="col-md-6 mb-4">
                <label htmlFor="ownerName" className="form-label">Owner Name</label>
                <input
                  type="text"
                  id="ownerName"
                  name="ownerName"
                  className="form-control"
                  value={formData.ownerName}
                  disabled
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Confirm Appointment
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;
