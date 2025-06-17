import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const MedicalHistory = () => {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8080/api/medical-history")
      .then((res) => {
        setRecords(res.data);
      })
      .catch((err) => {
        console.error("Error fetching medical records:", err);
      });
  }, []);

  // Group records by pet name
  const groupedRecords = records.reduce((acc, record) => {
    const { petName } = record;
    if (!acc[petName]) acc[petName] = [];
    acc[petName].push(record);
    return acc;
  }, {});

  return (
    <div className="container-fluid p-0 d-flex">
      <Sidebar />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Pet Medical History</h2>
        {Object.keys(groupedRecords).map((petName) => (
          <div key={petName} className="mb-5">
            <h4 className="text-primary">{petName}'s Medical Records</h4>
            <table className="table table-bordered mt-3">
              <thead className="table-secondary">
                <tr>
                  <th>Date</th>
                  <th>Type</th>
                  <th>Details</th>
                </tr>
              </thead>
              <tbody>
                {groupedRecords[petName].map((record, index) => (
                  <tr key={index}>
                    <td>{record.date}</td>
                    <td>{record.serviceType}</td>
                    <td>
                      {record.serviceType === "Vaccination" && (
                        <div>
                          <strong>Vaccine:</strong> {record.vaccine}
                        </div>
                      )}
                      {record.serviceType === "Grooming" && (
                        <div>
                          <strong>Service:</strong> {record.service} <br />
                          <strong>Time:</strong> {record.time}
                        </div>
                      )}
                      {record.serviceType === "Veterinarian" && (
                        <div>
                          <strong>Doctor:</strong> {record.vetName} <br />
                          <strong>Reason:</strong> {record.reason}
                        </div>
                      )}
                      {record.serviceType === "Checkup" && (
                        <div>
                          <strong>Reason:</strong> {record.reason}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalHistory;
