import React, { useState, useEffect } from "react";
import { Button, Badge, Form } from "react-bootstrap";
import { BsCalendar, BsClipboard } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";
import RecordsModal from "./RecordsModal";
import ScheduleModal from "./ScheduleModal";
import VetLayout from "./VetLayout";
import axios from "axios";

const StatusBadge = ({ status }) => (
  <Badge bg="dark" className="position-absolute top-0 end-0 m-2">
    {status}
  </Badge>
);

const Patients = () => {
  const [patients, setPatients] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showRecords, setShowRecords] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/pets/all");
      const data = response.data;

      const formattedPatients = data.map((pet) => ({
        id: pet.id,
        name: pet.petName,
        species: `${pet.petType}, ${pet.breed}`,
        age: calculateAge(pet.dob),
        owner: pet.ownerName || "Unknown",
        phone: pet.phone || "N/A",
        status: "Healthy", // default or fetch from backend if you store it
        lastVisit: "-", // replace with actual data if you store it
        nextAppt: "-", // replace with actual data if you store it
        image: pet.petImageName
          ? `http://localhost:8080/uploads/${pet.petImageName}`
          : "/default-pet.png",
      }));

      setPatients(formattedPatients);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  const calculateAge = (dob) => {
    if (!dob) return "Unknown";
    const birthDate = new Date(dob);
    const ageDiffMs = Date.now() - birthDate.getTime();
    const ageDate = new Date(ageDiffMs);
    const years = ageDate.getUTCFullYear() - 1970;
    return `${years} year${years > 1 ? "s" : ""}`;
  };

  const handleOpenSchedule = (pet) => {
    setSelectedPet(pet);
    setShowSchedule(true);
  };

  const handleOpenRecords = (pet) => {
    setSelectedPet(pet);
    setShowRecords(true);
  };

  const ListItem = ({ patient }) => (
    <div className="d-flex justify-content-between align-items-center border-bottom p-3 position-relative">
      <div className="d-flex align-items-center">
        <img
          src={patient.image}
          className="rounded-circle me-3"
          alt="avatar"
          width="50"
          height="50"
        />
        <div>
          <h6 className="mb-0">{patient.name}</h6>
          <small>{patient.species}</small>
          <br />
          <small>Age: {patient.age}</small>
        </div>
      </div>
      <div>
        <strong>Owner:</strong> {patient.owner}
        <br />
        <small>{patient.phone}</small>
      </div>
      {/* <div>
        <div>Last Visit: {patient.lastVisit}</div>
        <div>Next Appt: {patient.nextAppt}</div>
      </div> */}
      <StatusBadge status={patient.status} />
      <div className="d-flex flex-column ms-3">
        <Button
          variant="outline-dark"
          size="sm"
          className="mb-2"
          onClick={() => handleOpenRecords(patient)}
          style={{ padding: "1px 5px" }}
        >
          <BsClipboard style={{ fontSize: "14px" }} />
        </Button>
        <Button
          variant="outline-dark"
          size="sm"
          onClick={() => handleOpenSchedule(patient)}
          style={{ padding: "1px 5px" }}
        >
          <BsCalendar style={{ fontSize: "14px" }} />
        </Button>
      </div>
    </div>
  );

  return (
    <div className="container-fluid p-0 d-flex">
      <VetLayout />
      <div className="container mt-4">
        <h3>Pet Patients</h3>
        <p className="text-muted">View and manage all your pet patients.</p>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <Form.Control
            type="text"
            placeholder="Search by pet name, owner, or breed..."
            className="w-50"
          />
          <Button variant="outline-secondary" className="ms-2">
            Filter
          </Button>
        </div>

        <div className="border rounded bg-white">
          {patients.map((patient, idx) => (
            <ListItem patient={patient} key={idx} />
          ))}
        </div>

        {selectedPet && (
          <>
            <RecordsModal
              show={showRecords}
              handleClose={() => setShowRecords(false)}
              pet={selectedPet}
            />
            <ScheduleModal
              show={showSchedule}
              handleClose={() => setShowSchedule(false)}
              petName={selectedPet.name}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Patients;
