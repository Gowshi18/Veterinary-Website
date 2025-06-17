import React, { useState, useEffect } from "react";
import {
  Button,
  Dropdown,
  Form,
  InputGroup,
  Modal,
} from "react-bootstrap";
import {
  BsPlusLg,
  BsFilter,
  BsThreeDotsVertical,
} from "react-icons/bs";
import axios from "axios";
import VetLayout from "./VetLayout";

const NewRecordModal = ({ show, onHide }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>New Health Record</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Add health record form fields here */}
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const HealthRecords = () => {
  const [records, setRecords] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchHealthRecords();
  }, []);

  const fetchHealthRecords = async () => {
    try {
      const ownerEmail = localStorage.getItem("email");

      if (!ownerEmail) {
        console.error("No owner email found in localStorage.");
        return;
      }

      const response = await axios.get(`http://localhost:8080/api/pets/all`);
      const data = response.data;

      const formatted = data.map((pet) => ({
        id: pet.id,
        petName: pet.petName,
        species: `${pet.petType}, ${pet.breed}`,
        owner: pet.ownerName || "Unknown",
        summary: "Routine checkup - all normal", // Placeholder
        date: "May 13, 2025", // Placeholder
        vet: "Dr. Smith", // Placeholder
        documents: 1, // Placeholder
        type: "Examination", // Placeholder
        image: pet.petImageName
          ? `http://localhost:8080/uploads/${pet.petImageName}`
          : "/default-pet.jpg", // fallback to default image
      }));

      setRecords(formatted);
    } catch (err) {
      console.error("Error fetching pet records:", err);
    }
  };

  return (
    <div className="container-fluid p-0 d-flex">
      <VetLayout />
      <div className="container-fluid my-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            <h2 className="fw-bold">Health Records</h2>
            <p className="text-muted mb-0">Manage and view all pet health records</p>
          </div>
          <Button variant="dark" onClick={() => setShowModal(true)}>
            <BsPlusLg className="me-2" /> New Record
          </Button>
        </div>

        <div className="bg-white p-4 rounded shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 className="fw-bold mb-1">Health Records</h5>
              <p className="text-muted mb-0">View and manage all pet health records.</p>
            </div>
            <div className="d-flex gap-2">
              <InputGroup>
                <Form.Control placeholder="Search records by pet, owner, or keywords..." />
              </InputGroup>
              <Button variant="light">
                <BsFilter className="me-1" /> Filter
              </Button>
            </div>
          </div>

          <div className="text-muted mb-2">{records.length} records</div>

          <div className="border rounded">
            {records.map((record) => (
              <div
                key={record.id}
                className="d-flex justify-content-between align-items-center border-bottom p-3"
              >
                <div className="d-flex align-items-center w-25">
                  <img
                    src={record.image}
                    alt={record.petName}
                    className="rounded-circle me-3"
                    style={{ width: 50, height: 50, objectFit: "cover" }}
                  />
                  <div>
                    <h6 className="mb-0">{record.petName}</h6>
                    <small>{record.species}</small><br />
                    <small>Owner: {record.owner}</small>
                  </div>
                </div>
                <div className="w-50">
                  <strong>Summary:</strong>
                  <div className="text-muted small">{record.summary}</div>
                </div>
                <div className="text-end w-25">
                  <div className="small"><strong>Date:</strong> {record.date}</div>
                  <div className="small"><strong>Vet:</strong> {record.vet}</div>
                  <div className="small"><strong>Docs:</strong> {record.documents}</div>
                  <span className="badge bg-light text-dark border fw-normal mt-2">
                    {record.type}
                  </span>
                </div>
                <div className="ms-3">
                  <Dropdown>
                    <Dropdown.Toggle variant="light" size="sm">
                      <BsThreeDotsVertical />
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>View</Dropdown.Item>
                      <Dropdown.Item>Edit</Dropdown.Item>
                      <Dropdown.Item>Delete</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </div>
            ))}
          </div>
        </div>

        <NewRecordModal show={showModal} onHide={() => setShowModal(false)} />
      </div>
    </div>
  );
};

export default HealthRecords;
