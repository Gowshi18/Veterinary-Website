package com.example.veterinary.controller;

import com.example.veterinary.Entity.Appointment;
import com.example.veterinary.service.MedicalHistoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/medical-history")
@CrossOrigin // adjust if needed
public class MedicalHistoryController {

    @Autowired
    private MedicalHistoryService medicalHistoryService;

    // 🔹 Get all medical records
    @GetMapping
    public List<Appointment> getAllHistory() {
        return medicalHistoryService.getAllMedicalHistory();
    }

    // 🔹 Get medical history by pet name
    @GetMapping("/{petName}")
    public List<Appointment> getHistoryByPet(@PathVariable String petName) {
        return medicalHistoryService.getMedicalHistoryByPetName(petName);
    }
}

