import React, { useState } from 'react';
//import './VeterinarianAvailability.css'; // optional for nice UI
//import Sidebar from './Sidebar';

const veterinarians = [
  "Dr. Meera Suresh",
  "Dr. Rajesh Kumar",
  "Dr. Anjali Nair",
  "Dr. Vishal Reddy",
  "Dr. Pooja Sharma",
  "Dr. Arvind Swaminathan",
  "Dr. Sneha Iyer",
  "Dr. Karan Malhotra",
  "Dr. Priya Menon",
  "Dr. Aditya Singh"
];

// Dummy time slots for daily view
const timeSlots = ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

// Dummy weekly availability
const weeklyAvailability = {
  Monday: "9:00 AM - 5:00 PM",
  Tuesday: "9:00 AM - 5:00 PM",
  Wednesday: "9:00 AM - 5:00 PM",
  Thursday: "9:00 AM - 5:00 PM",
  Friday: "9:00 AM - 5:00 PM"
};

const VeterinarianAvailability = () => {
  const [selectedVet, setSelectedVet] = useState('All Veterinarians');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('Daily');

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
  };

  const handleDateChange = (days) => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + days);
    setSelectedDate(newDate);
  };

  const renderDailySlots = () => (
    <div className="p-3">
      <h5><i className="bi bi-calendar3"></i> {formatDate(selectedDate)}</h5>
      {veterinarians.filter(vet => selectedVet === 'All Veterinarians' || vet === selectedVet).map((vet, idx) => (
        <div key={idx} className="mt-4">
          <h6><i className="bi bi-person"></i> {vet}</h6>
          <div className="d-flex flex-wrap gap-2 mt-2">
            {timeSlots.map((slot, index) => (
              <button key={index} className="btn btn-outline-primary btn-sm">{slot}</button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const renderWeeklySlots = () => (
    <div className="table-responsive">
      <table className="table table-bordered mt-4">
        <thead className="table-light">
          <tr>
            <th>Veterinarian</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
          </tr>
        </thead>
        <tbody>
          {veterinarians.filter(vet => selectedVet === 'All Veterinarians' || vet === selectedVet).map((vet, idx) => (
            <tr key={idx}>
              <td>{vet}</td>
              {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].map((day, index) => (
                <td key={index}>
                  <div className="text-success">{weeklyAvailability[day]}</div>
                  <small className="text-muted">
                    {Math.random() > 0.5 ? 'Available' : 'Limited'}
                  </small>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    // <div className="container-fluid p-0 d-flex">
    //           <Sidebar />
    <div id="availability-section" className="container-fluid mt-4">
      <h2>Check Veterinarian Availability</h2>

      <div className="row mt-4">
        <div className="col-md-3">
          <label className="form-label">Select Veterinarian</label>
          <select className="form-select" value={selectedVet} onChange={(e) => setSelectedVet(e.target.value)}>
            <option>All Veterinarians</option>
            {veterinarians.map((vet, idx) => (
              <option key={idx}>{vet}</option>
            ))}
          </select>

          <label className="form-label mt-4">Select Date</label>
          <div className=" container-fluid d-flex align-items-center gap-2">
            <button className="btn btn-light" onClick={() => handleDateChange(-1)}>◀</button>
            <strong>{selectedDate.toDateString()}</strong>
            <button className="btn btn-light" onClick={() => handleDateChange(1)}>▶</button>
          </div>
        </div>

        <div className="col-md-9">
          <div className="d-flex justify-content-end mb-8">
            <button
              className={`btn me-2 ${viewMode === 'Daily' ? 'btn-primary' : 'btn-light'}`}
              onClick={() => setViewMode('Daily')}
            >
              Daily
            </button>
            <button
              className={`btn ${viewMode === 'Weekly' ? 'btn-primary' : 'btn-light'}`}
              onClick={() => setViewMode('Weekly')}
            >
              Weekly
            </button>
          </div>

          <div className="border rounded p-3">
            {viewMode === 'Daily' ? renderDailySlots() : renderWeeklySlots()}
          </div>
        </div>
      </div>
    </div>
   // </div>
  );
};

export default VeterinarianAvailability;
