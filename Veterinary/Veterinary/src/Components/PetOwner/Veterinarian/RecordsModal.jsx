import React from "react";
import { Modal, Button } from "react-bootstrap";

const RecordsModal = ({ show, handleClose, pet }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{pet.name}'s Records</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ul>
          <li><strong>Last Visit:</strong> {pet.lastVisit}</li>
          <li><strong>Vaccinations:</strong> Rabies, Distemper</li>
          <li><strong>Allergies:</strong> None</li>
          <li><strong>Notes:</strong> Regular checkup</li>
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RecordsModal;
