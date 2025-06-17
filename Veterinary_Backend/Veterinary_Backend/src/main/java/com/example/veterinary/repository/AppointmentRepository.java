package com.example.veterinary.repository;

import com.example.veterinary.Entity.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {


    List<Appointment> findByPetName(String petName);


    List<Appointment> findByDate(LocalDate date);

    List<Appointment> findByVetName(String vetName);

    // 🔹 Count all appointments
    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM Appointments a")
    int datacount();
    List<Appointment> findByUserEmail(String userEmail);

    // ❌ Uncomment and fix if you want to count vaccine appointments later
    // @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM Appointment a2 WHERE a2.service_type = 'Vaccination'")
    // int vaccinecount();
}
