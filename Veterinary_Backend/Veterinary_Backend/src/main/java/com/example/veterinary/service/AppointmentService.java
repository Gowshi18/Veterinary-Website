package com.example.veterinary.service;

import com.example.veterinary.Entity.Appointment;
import com.example.veterinary.repository.AppointmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    private final AppointmentRepository repo;

    public AppointmentService(AppointmentRepository repo) {
        this.repo = repo;
    }

    public Appointment save(Appointment appointment) {
        return repo.save(appointment);
    }

    public List<Appointment> getAll() {
        return repo.findAll();
    }

    public int count(){
       return repo.datacount();
    }

    public Optional<Appointment> findById(Long id) {
        return repo.findById(id);
    }

    public List<Appointment> getAppointmentsByEmail(String email) {
        return repo.findByUserEmail(email);
    }

    public List<Appointment> findByVetName(String vetName) {
        return repo.findByVetName(vetName);
    }
//    public int vaccount(){
//        return repo.vaccinecount();
//    }
}
