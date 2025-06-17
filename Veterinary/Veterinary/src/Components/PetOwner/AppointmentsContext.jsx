import React, { createContext, useState, useContext } from "react";

const AppointmentsContext = createContext();

export const useAppointments = () => useContext(AppointmentsContext);

export const AppointmentsProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(() => {
    const storedAppointments = JSON.parse(localStorage.getItem('appointments')) || [];
    return storedAppointments;
  });

  const addAppointment = (appointment) => {
    setAppointments(prev => {
      const updated = [...prev, appointment];
      localStorage.setItem('appointments', JSON.stringify(updated)); // 🆕 Save new appointments also to localStorage
      return updated;
    });
  };

  // 🆕 Function to categorize appointments
  const categorizeAppointments = () => {
    const groomingAppointments = appointments.filter(a => a.serviceType === "Grooming");
    const vaccinationAppointments = appointments.filter(a => a.serviceType === "Vaccination");

    return { groomingAppointments, vaccinationAppointments };
  };

  return (
    <AppointmentsContext.Provider value={{ appointments, addAppointment, categorizeAppointments }}>
      {children}
    </AppointmentsContext.Provider>
  );
};
