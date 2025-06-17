import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './Sidebar';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import Rabies from "../../assets/Rabies.jpg";
import DHPP from "../../assets/Dhpp.jfif";
import Leptospirosis from "../../assets/Leptospirosis.jfif";
import Bordetella from "../../assets/Bordetella.jfif";
import CanineInfluenza from "../../assets/CanineInfluenza.jfif";
import Lyme from "../../assets/Lyme.jfif";
import CoronaVirus from "../../assets/CoronaVirus.jfif";
import ParvovirusBooster from "../../assets/ParvovirusBooster.jfif";
import HepatitisBooster from "../../assets/HepatitisBooster.jfif";
import PuppySeriesCombo from "../../assets/PuppySeriesCombo.jfif";

import FVRCP from "../../assets/FVRCP.jfif";
import FelineLeukemia from "../../assets/FelineLeukemia.jfif";
import FelineImmunodeficiency from "../../assets/FelineImmunodeficiency.jfif";
import ChlamydiaVaccine from "../../assets/ChlamydiaVaccine.jfif";
import CalicivirusBooster from "../../assets/CalicivirusBooster.jfif";
import PanleukopeniaBooster from "../../assets/PanleukopeniaBooster.jfif";
import FelinePneumonitis from "../../assets/FelinePneumonitis.jfif";
import RingwormVaccine from "../../assets/RingwormVaccine.jpg";
import KittenCombo from "../../assets/KittenCombo.jfif";

import Polyomavirus from "../../assets/Polyomavirus.jfif";
import Psittacosis from "../../assets/Psittacosis.jfif";
import PoxvirusVaccine from "../../assets/PoxvirusVaccine.jfif";
import NewcastleDisease from "../../assets/NewcastleDisease.jfif";
import AvianInfluenza from "../../assets/AvianInfluenza.jfif";
import Aspergillosis from "../../assets/Aspergillosis.jfif";
import Candidiasis from "../../assets/Candidiasis.jfif";
import MycobacteriumAvium from "../../assets/MycobacteriumAvium.jfif";
import BirdHepatitis from "../../assets/BirdHepatitis.jfif";
import ExoticBirdBooster from "../../assets/ExoticBirdBooster.jfif";

import Myxomatosis from "../../assets/Myxomatosis.jfif";
import RHDV1 from "../../assets/(RHDV1).jfif";
import RHDV2 from "../../assets/(RHDV2).jfif";
import PasteurellaVaccine from "../../assets/PasteurellaVaccine.jfif";
import EcuniculiVaccine from "../../assets/EcuniculiVaccine.jfif";
import TularemiaVaccine from "../../assets/TularemiaVaccine.jfif";
import Clostridiumspiroforme from "../../assets/Clostridiumspiroforme.jfif";
import CoccidiosisVaccine from "../../assets/CoccidiosisVaccine.jfif";
import FurMitePrevention from "../../assets/FurMitePrevention.jfif";
import RabbitComboBooster from "../../assets/RabbitComboBooster.jfif";


const allVaccinations = [
  // === DOGS ===
  {
    name: "Rabies Vaccine",
    description: "Protects against the deadly rabies virus.",
    frequency: "Annual",
    petType: "Dog",
    image: Rabies,
    recommended: true,
  },
  {
    name: "DHPP",
    description: "Protects from Distemper, Hepatitis, Parainfluenza, Parvovirus.",
    frequency: "Every 3 years",
    petType: "Dog",
    image: DHPP,
    recommended: true,
  },
  {
    name: "Leptospirosis",
    description: "Prevents bacterial disease that can affect kidneys and liver.",
    frequency: "Annual",
    petType: "Dog",
    image: Leptospirosis,
    recommended: false,
  },
  {
    name: "Bordetella",
    description: "Protects against kennel cough.",
    frequency: "Annual",
    petType: "Dog",
    image: Bordetella,
    recommended: true,
  },
  {
    name: "Canine Influenza",
    description: "Guards against dog flu strains H3N2 and H3N8.",
    frequency: "Annual",
    petType: "Dog",
    image: CanineInfluenza,
    recommended: false,
  },
  {
    name: "Lyme Disease",
    description: "Prevents tick-borne Lyme disease.",
    frequency: "Annual",
    petType: "Dog",
    image: Lyme,
    recommended: true,
  },
  {
    name: "Corona Virus Vaccine",
    description: "Prevents coronavirus in dogs (not COVID-19).",
    frequency: "Annual",
    petType: "Dog",
    image: CoronaVirus,
    recommended: false,
  },
  {
    name: "Parvovirus Booster",
    description: "Additional protection against Parvo.",
    frequency: "Annual",
    petType: "Dog",
    image: ParvovirusBooster,
    recommended: false,
  },
  {
    name: "Hepatitis Booster",
    description: "Boosts immunity against hepatitis.",
    frequency: "Every 3 years",
    petType: "Dog",
    image: HepatitisBooster,
    recommended: false,
  },
  {
    name: "Puppy Series Combo",
    description: "For puppies: core combo protection.",
    frequency: "Series (6-16 weeks)",
    petType: "Dog",
    image: PuppySeriesCombo,
    recommended: true,
  },

  // === CATS ===
  {
    name: "FVRCP",
    description: "Protects against Rhinotracheitis, Calicivirus, Panleukopenia.",
    frequency: "Every 3 years",
    petType: "Cat",
    image: FVRCP,
    recommended: true,
  },
  {
    name: "Rabies (Feline)",
    description: "Protects cats from rabies virus.",
    frequency: "Annual",
    petType: "Cat",
    image: Rabies,
    recommended: true,
  },
  {
    name: "Feline Leukemia (FeLV)",
    description: "Prevents feline leukemia virus infection.",
    frequency: "Annual",
    petType: "Cat",
    image: FelineLeukemia,
    recommended: true,
  },
  {
    name: "Feline Immunodeficiency",
    description: "Protection against FIV.",
    frequency: "Annual",
    petType: "Cat",
    image: FelineImmunodeficiency,
    recommended: false,
  },
  {
    name: "Chlamydia Vaccine",
    description: "Prevents feline chlamydia infections.",
    frequency: "Every 3 years",
    petType: "Cat",
    image: ChlamydiaVaccine,
    recommended: false,
  },
  {
    name: "Calicivirus Booster",
    description: "Boosts immunity against calicivirus.",
    frequency: "Annual",
    petType: "Cat",
    image: CalicivirusBooster,
    recommended: false,
  },
  {
    name: "Panleukopenia Booster",
    description: "Reinforces defense against feline distemper.",
    frequency: "Annual",
    petType: "Cat",
    image: PanleukopeniaBooster,
    recommended: false,
  },
  {
    name: "Feline Pneumonitis",
    description: "Protects from respiratory infections.",
    frequency: "Annual",
    petType: "Cat",
    image: FelinePneumonitis,
    recommended: false,
  },
  {
    name: "Ringworm Vaccine",
    description: "Prevents fungal ringworm in high-risk areas.",
    frequency: "Annual",
    petType: "Cat",
    image: RingwormVaccine,
    recommended: false,
  },
  {
    name: "Kitten Combo",
    description: "Core vaccinations for kittens.",
    frequency: "Series (6-16 weeks)",
    petType: "Cat",
    image: KittenCombo,
    recommended: true,
  },

  // === BIRDS ===
  {
    name: "Polyomavirus",
    description: "Protects against polyomavirus in young birds.",
    frequency: "Annual",
    petType: "Bird",
    image: Polyomavirus,
    recommended: true,
  },
  {
    name: "Psittacosis",
    description: "Prevents Chlamydia psittaci infection.",
    frequency: "Every 2 years",
    petType: "Bird",
    image: Psittacosis,
    recommended: true,
  },
  {
    name: "Poxvirus Vaccine",
    description: "Prevents avian pox in birds.",
    frequency: "Every 3 years",
    petType: "Bird",
    image: PoxvirusVaccine,
    recommended: false,
  },
  {
    name: "Newcastle Disease",
    description: "Prevents serious respiratory disease.",
    frequency: "Annual",
    petType: "Bird",
    image: NewcastleDisease,
    recommended: false,
  },
  {
    name: "Avian Influenza",
    description: "Guards birds against flu strains.",
    frequency: "Every 2 years",
    petType: "Bird",
    image: AvianInfluenza,
    recommended: false,
  },
  {
    name: "Aspergillosis",
    description: "Prevents fungal respiratory issues.",
    frequency: "Annual",
    petType: "Bird",
    image: Aspergillosis,
    recommended: false,
  },
  {
    name: "Candidiasis",
    description: "Protects against yeast infections.",
    frequency: "Annual",
    petType: "Bird",
    image: Candidiasis,
    recommended: false,
  },
  {
    name: "Mycobacterium Avium",
    description: "Guards birds from avian tuberculosis.",
    frequency: "Every 3 years",
    petType: "Bird",
    image: MycobacteriumAvium,
    recommended: false,
  },
  {
    name: "Bird Hepatitis",
    description: "Prevents avian liver diseases.",
    frequency: "Annual",
    petType: "Bird",
    image: BirdHepatitis,
    recommended: false,
  },
  {
    name: "Exotic Bird Booster",
    description: "Combo vaccine for exotic pet birds.",
    frequency: "Annual",
    petType: "Bird",
    image: ExoticBirdBooster,
    recommended: true,
  },

  // === RABBITS ===
  {
    name: "Myxomatosis",
    description: "Protects against Myxomatosis virus.",
    frequency: "Annual",
    petType: "Rabbit",
    image: Myxomatosis,
    recommended: true,
  },
  {
    name: "Rabbit Hemorrhagic Disease (RHDV1)",
    description: "Guards against deadly viral disease RHDV1.",
    frequency: "Annual",
    petType: "Rabbit",
    image: (RHDV1),
    recommended: true,
  },
  {
    name: "Rabbit Hemorrhagic Disease (RHDV2)",
    description: "Protects from the newer strain RHDV2.",
    frequency: "Annual",
    petType: "Rabbit",
    image: (RHDV2),
    recommended: true,
  },
  {
    name: "Pasteurella Vaccine",
    description: "Prevents respiratory infections.",
    frequency: "Annual",
    petType: "Rabbit",
    image: PasteurellaVaccine,
    recommended: false,
  },
  {
    name: "E. cuniculi Vaccine",
    description: "Prevents Encephalitozoon cuniculi infection.",
    frequency: "Annual",
    petType: "Rabbit",
    image: EcuniculiVaccine,
    recommended: false,
  },
  {
    name: "Tularemia Vaccine",
    description: "Guards against rabbit fever (Francisella tularensis).",
    frequency: "Annual",
    petType: "Rabbit",
    image: TularemiaVaccine,
    recommended: false,
  },
  {
    name: "Clostridium spiroforme",
    description: "Prevents enterotoxemia in rabbits.",
    frequency: "Annual",
    petType: "Rabbit",
    image: Clostridiumspiroforme,
    recommended: false,
  },
  {
    name: "Coccidiosis Vaccine",
    description: "Prevents intestinal parasite infections.",
    frequency: "Annual",
    petType: "Rabbit",
    image: CoccidiosisVaccine,
    recommended: false,
  },
  {
    name: "Fur Mite Prevention",
    description: "Protects against fur mites.",
    frequency: "Annual",
    petType: "Rabbit",
    image: FurMitePrevention,
    recommended: false,
  },
  {
    name: "Rabbit Combo Booster",
    description: "Combined Myxo & RHD vaccine.",
    frequency: "Annual",
    petType: "Rabbit",
    image: RabbitComboBooster,
    recommended: true,
  }
];


const vetName = ['Dr. Vishal Reddy', 'Dr. Patel', 'Dr. Rajesh Kumar', 'Dr. Pooja Sharma'];

const Vaccinations = () => {
  const [selectedPetType, setSelectedPetType] = useState('Dog');
  const [showModal, setShowModal] = useState(false);
  const [selectedVaccine, setSelectedVaccine] = useState(null);
  const name = localStorage.getItem("name");
  const userEmail = localStorage.getItem("email");
  const [formData, setFormData] = useState({
    petName: '',
    date: '',
    time: '',
    vetName: '',
    ownerName: name,
    userEmail: userEmail,
    
  });

  const filteredVaccinations = allVaccinations.filter(
    (vaccine) => vaccine.petType === selectedPetType
  );

  const navigate = useNavigate();

  const handleScheduleClick = (vaccine) => {
    setSelectedVaccine(vaccine);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const appointment = {
      petName: formData.petName,
      date: formData.date,
      time: formData.time,
      vetName: formData.vetName,
      vaccine: selectedVaccine.name,
      petType: selectedVaccine.petType,
      serviceType: "Vaccination",
      reason: "vaccine",
      ownerName: name,
    userEmail: userEmail,
      
    };

    try {
      // Make an API call to save the appointment to the backend
      const response = await fetch('http://localhost:8080/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointment),
        
      });
      const today = new Date().toISOString().split("T")[0];
      if (formData.date === today) {
        await axios.post("http://localhost:8080/api/notifications/appointment-alert", {
          userEmail: formData.userEmail,
          date: today,
          time: formData.time,
        });
      }

      if (response.ok) {
        const newAppointment = await response.json();
        setShowModal(false);
        setFormData({ petName: '', date: '', time: '', vetName: '', });
        // addAppointment(newAppointment); // Uncomment this if using state/context
        navigate("/appointments"); // Navigate to the appointments page
      } else {
        console.error('Failed to schedule appointment');
      }
      await axios.get(
        `http://localhost:8080/api/notifications/${formData.userEmail}`
      );
      setNotifications(response.data);
    } catch (error) {
      console.error('Error while submitting the appointment', error);
    }
  };

  return (
    <div className="container-fluid p-0 d-flex">
          <Sidebar />
    <div className="container mt-5 ">
      <h2 className="text-center fw-bold">Pet Vaccination Services</h2>
      <p className="text-center text-muted">Select a pet type to view relevant vaccinations</p>

      <div className="d-flex justify-content-center mb-5">
        <select
          className="form-select w-50"
          value={selectedPetType}
          onChange={(e) => setSelectedPetType(e.target.value)}
        >
          <option value="Dog">Dogs</option>
          <option value="Cat">Cats</option>
          <option value="Bird">Birds</option>
          <option value="Rabbit">Rabbits</option>
        </select>
      </div>

      <div className="row">
        {filteredVaccinations.map((vaccine, index) => (
          <div className="col-md-4 d-flex justify-content-center mb-4" key={index}>
            <div className="card h-85 shadow-sm p-2" style={{ maxWidth: '18rem', width: '100%', margin: '5px' }}>
              {vaccine.image && (
                <img
                src={vaccine.image}
                className="card-img-top"
                alt={vaccine.name}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              
              )}
              <div className="card-body">
                <h5 className="card-title d-flex justify-content-between align-items-center">
                  {vaccine.name}
                  {vaccine.recommended && (
                    <span className="badge bg-success">Recommended</span>
                  )}
                </h5>
                <p className="card-text">{vaccine.description}</p>
                <p className="card-text"><strong>Frequency:</strong> {vaccine.frequency}</p>
                <p className="card-text"><strong>Pet Type:</strong> {vaccine.petType}</p>
                <button
                  className="btn btn-dark w-100 mt-2"
                  onClick={() => handleScheduleClick(vaccine)}
                >
                  Schedule Vaccination
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <form className="modal-content" onSubmit={handleFormSubmit}>
              <div className="modal-header">
                <h5 className="modal-title">Schedule Vaccination</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-1">
                  <label className="form-label">Pet Name</label>
                  <input
                    type="text"
                    name="petName"
                    className="form-control"
                    required
                    value={formData.petName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label">Pet Type</label>
                  <input
                    type="text"
                    className="form-control"
                    value={selectedVaccine.petType}
                    readOnly
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label">Date</label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    required
                    value={formData.date}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label">Time</label>
                  <input
                    type="time"
                    name="time"
                    className="form-control"
                    required
                    value={formData.time}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-1">
                  <label className="form-label">Select vetName</label>
                  <select
                    name="vetName"
                    className="form-select"
                    required
                    value={formData.vetName}
                    onChange={handleInputChange}
                  >
                    <option value="">Select vetName</option>
                    {vetName.map((doc, idx) => (
                      <option key={idx} value={doc}>{doc}</option>
                    ))}
                  </select>
                </div>
                <div className="col-md-6">
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
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Confirm Appointment</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default Vaccinations;
