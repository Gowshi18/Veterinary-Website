import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";

const AppointmentForm = () => {
  const email = localStorage.getItem("email");
  const name = localStorage.getItem("name");

  const [form, setForm] = useState({
    date: "",
    ownerName: name || "",
    petName: "",
    petType: "",
    reason: "",
    service: "",
    serviceType: "",
    time: "",
    userEmail: email || "",
    vaccine: "",
    vetName: ""
  });

  const [message, setMessage] = useState({ text: "", type: "" });
  const [vets, setVets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        if (email) {
          const profileResponse = await axios.get(
            `http://localhost:8080/api/user/profile?email=${email}`
          );
          const { name } = profileResponse.data;
          setForm((prev) => ({
            ...prev,
            ownerName: name || "",
            userEmail: email
          }));
        }

        const vetsResponse = await axios.get(
          "http://localhost:8080/api/veterinarian/all-vets"
        );
        setVets(vetsResponse.data);
      } catch (err) {
        console.error("Failed to fetch data:", err);
        // setMessage({
        //   text: "Failed to load initial data. Please refresh the page.",
        //   type: "danger"
        // });
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ text: "", type: "" });

    try {
      // Validate form
      if (!form.date || !form.time || !form.petName || !form.petType || !form.reason || !form.serviceType || !form.vetName) {
        throw new Error("Please fill in all required fields");
      }

      // Check if date is in the past
      const selectedDate = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        throw new Error("Appointment date cannot be in the past");
      }

      // Book appointment
      await axios.post("http://localhost:8080/api/appointments", form);

      // Check if appointment is for today
      const todayISO = new Date().toISOString().split("T")[0];
      if (form.date === todayISO) {
        await axios.post("http://localhost:8080/api/notifications/appointment-alert", {
          userEmail: form.userEmail,
          date: form.date,
          time: form.time
        });
      }

      setMessage({
        text: "Appointment booked successfully!",
        type: "success"
      });

      // Reset form
      setForm(prev => ({
        ...prev,
        date: "",
        petName: "",
        petType: "",
        reason: "",
        service: "",
        serviceType: "",
        time: "",
        vaccine: "",
        vetName: ""
      }));
    } catch (err) {
      console.error(err);
      setMessage({
        text: err.response?.data?.message || err.message || "Error booking appointment",
        type: "danger"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container-fluid p-0 d-flex">
        <Sidebar />
        <div className="container mt-4 d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid p-0 d-flex">
      <Sidebar />
      <div className="container mt-4">
        <h2 className="text-center mb-4">Book Appointment</h2>
        <div className="row justify-content-center">
          <div className="col-md-8">
            {message.text && (
              <div className={`alert alert-${message.type} text-center`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">Date <span className="text-danger">*</span></label>
                  <input
                    type="date"
                    name="date"
                    className="form-control"
                    value={form.date}
                    onChange={handleChange}
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Time <span className="text-danger">*</span></label>
                  <input
                    type="time"
                    name="time"
                    className="form-control"
                    value={form.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">Pet Name <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    name="petName"
                    className="form-control"
                    value={form.petName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label className="form-label">Pet Type <span className="text-danger">*</span></label>
                  <input
                    type="text"
                    name="petType"
                    className="form-control"
                    value={form.petType}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">Service Type <span className="text-danger">*</span></label>
                  <select
                    name="serviceType"
                    className="form-select"
                    value={form.serviceType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Grooming">Grooming</option>
                    <option value="Vaccination">Vaccination</option>
                    <option value="Veterinarian">Veterinarian</option>
                  </select>
                </div>
              </div>

              {form.serviceType === "Vaccination" && (
                <div className="mb-3">
                  <label className="form-label">Vaccine</label>
                  <input
                    type="text"
                    name="vaccine"
                    className="form-control"
                    value={form.vaccine}
                    onChange={handleChange}
                  />
                </div>
              )}

              <div className="mb-3">
                <label className="form-label">Reason <span className="text-danger">*</span></label>
                <textarea
                  name="reason"
                  className="form-control"
                  rows="3"
                  value={form.reason}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Veterinarian <span className="text-danger">*</span></label>
                <select
                  name="vetName"
                  className="form-select"
                  value={form.vetName}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Veterinarian</option>
                  {vets.length > 0 ? (
                    vets.map((vet) => (
                      <option key={vet.id} value={vet.name}>
                        {vet.name}
                      </option>
                    ))
                  ) : (
                    <>
                      <option value="Dr. Rajesh Kumar">Dr. Rajesh Kumar</option>
                      <option value="Dr. Meera Suresh">Dr. Meera Suresh</option>
                      <option value="Dr. Sneha Iyer">Dr. Sneha Iyer</option>
                      <option value="Dr. Karan Malhotra">Dr. Karan Malhotra</option>
                      <option value="Dr. Priya Menon">Dr. Priya Menon</option>
                      <option value="Dr. Aditya Singh">Dr. Aditya Singh</option>
                      <option value="Dr. Anjali Nair">Dr. Anjali Nair</option>
                      <option value="Dr. Vishal Reddy">Dr. Vishal Reddy</option>
                      <option value="Dr. Pooja Sharma">Dr. Pooja Sharma</option>
                      <option value="Dr. Arvind Swaminathan">Dr. Arvind Swaminathan</option>
                      <option value="Dr. Neha Verma">Dr. Neha Verma</option>
                    </>
                  )}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Owner Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="ownerName"
                  value={form.ownerName}
                  readOnly
                />
              </div>

              <div className="row">
                <div className="mb-3 col-md-6">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    name="userEmail"
                    value={form.userEmail}
                    readOnly
                  />
                </div>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      Booking...
                    </>
                  ) : (
                    "Book Appointment"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentForm;
