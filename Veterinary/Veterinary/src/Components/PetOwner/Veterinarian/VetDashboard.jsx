import React, { useState, useEffect } from 'react';
import VetLayout from './VetLayout';

import VetSidebar from './VetSidebar';
import './VetTheme.css';
const VetDashboard = () => {
  const name=localStorage.getItem("name");
  const [dashboardData, setDashboardData] = useState({
    totalAppointments: 12,
    completed: 8,
    pending: 4,
    patients: 245,
    unreadMessages: 5,
    activity: '+24%',
  });

  const [upcomingAppointments, setUpcomingAppointments] = useState([
    {
      pet: 'Max',
      type: 'Dog',
      owner: 'John Doe',
      reason: 'Annual Checkup',
      time: '10:00 AM',
      breed: 'Golden Retriever',
      status: 'Confirmed',
    },
    {
      pet: 'Bella',
      type: 'Cat',
      owner: 'Sarah Johnson',
      reason: 'Vaccination',
      time: '11:30 AM',
      breed: 'Siamese',
      status: 'Confirmed',
    },
    {
      pet: 'Charlie',
      type: 'Dog',
      owner: 'Mike Wilson',
      reason: 'Skin Condition',
      time: '2:15 PM',
      breed: 'Beagle',
      status: 'Pending',
    },
  ]);

  const [recentAppointments, setRecentAppointments] = useState([
    {
      pet: 'Luna',
      type: 'Cat',
      owner: 'Emily Parker',
      reason: 'Dental Cleaning',
      time: 'Today, 9:00 AM',
      breed: 'Maine Coon',
      status: 'Completed',
    },
    {
      pet: 'Rocky',
      type: 'Dog',
      owner: 'David Miller',
      reason: 'Limping',
      time: 'Today, 8:15 AM',
      breed: 'German Shepherd',
      status: 'Completed',
    },
    {
      pet: 'Coco',
      type: 'Rabbit',
      owner: 'Jessica Lee',
      reason: 'Nail Trimming',
      time: 'Yesterday, 4:30 PM',
      breed: 'Holland Lop',
      status: 'Completed',
    },
  ]);

  return (
    <div className="container-fluid p-0 d-flex">
          <VetSidebar />
          <VetLayout />
    <div className="container-fluid p-4">
      <h3>Dashboard</h3>
      <p className="text-muted">Welcome back, {name}</p>

      <div className="row mb-4">
        <div className="col-md-4">
          <div className="card p-3">
            <h6>Total Appointments</h6>
            <h4>{dashboardData.totalAppointments}</h4>
            <small>Today</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h6>Completed</h6>
            <h4>{dashboardData.completed}</h4>
            <small>+2 from yesterday</small>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card p-3">
            <h6>Pending</h6>
            <h4>{dashboardData.pending}</h4>
            <small>Remaining today</small>
          </div>
        </div>

        <div className="col-md-4 mt-3">
          <div className="card p-3">
            <h6>Patients</h6>
            <h4>{dashboardData.patients}</h4>
            <small>Total registered</small>
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <div className="card p-3">
            <h6>Unread Messages</h6>
            <h4>{dashboardData.unreadMessages}</h4>
            <small>From pet owners</small>
          </div>
        </div>
        <div className="col-md-4 mt-3">
          <div className="card p-3">
            <h6>Activity</h6>
            <h4>{dashboardData.activity}</h4>
            <small>From last week</small>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="card p-3 mb-3">
            <h5>Upcoming Appointments</h5>
            <p className="text-muted">You have {upcomingAppointments.length} appointments scheduled for today.</p>
            {upcomingAppointments.map((a, index) => (
              <div key={index} className="border rounded p-2 mb-2">
                <strong>{a.pet} ({a.type})</strong><span className="badge bg-dark float-end">{a.status}</span>
                <div>Owner: {a.owner}</div>
                <div>Reason: {a.reason}</div>
                <div>
                  <span className="badge bg-light text-dark me-2">{a.time}</span>
                  <span className="badge bg-light text-dark">{a.breed}</span>
                </div>
              </div>
            ))}
            <button className="btn btn-dark w-100 mt-2">View All Appointments</button>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card p-3 mb-3">
            <h5>Recent Appointments</h5>
            <p className="text-muted">Recently completed appointments.</p>
            {recentAppointments.map((a, index) => (
              <div key={index} className="border rounded p-2 mb-2">
                <strong>{a.pet} ({a.type})</strong><span className="badge bg-secondary float-end">{a.status}</span>
                <div>Owner: {a.owner}</div>
                <div>Reason: {a.reason}</div>
                <div>
                  <span className="badge bg-light text-dark me-2">{a.time}</span>
                  <span className="badge bg-light text-dark">{a.breed}</span>
                </div>
              </div>
            ))}
            <button className="btn btn-light border w-100 mt-2">View Appointment History</button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default VetDashboard;
