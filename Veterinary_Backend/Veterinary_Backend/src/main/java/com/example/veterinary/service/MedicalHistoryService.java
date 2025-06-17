package com.example.veterinary.service;

import com.example.veterinary.Entity.Appointment;
import com.example.veterinary.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MedicalHistoryService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    public List<Appointment> getAllMedicalHistory() {
        return appointmentRepository.findAll();
    }

    public List<Appointment> getMedicalHistoryByPetName(String petName) {
        return appointmentRepository.findByPetName(petName);
    }
}
