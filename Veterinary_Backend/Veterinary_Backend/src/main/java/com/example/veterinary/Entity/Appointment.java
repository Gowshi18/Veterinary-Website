package com.example.veterinary.Entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity(name="appointments")
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String petName;
    private String petType;

    @Column(name = "service_type")
    private String serviceType; // "Grooming" or "Vaccination"

    private String service;     // optional: for grooming
    private String vaccine;     // optional: for vaccination
    private LocalDate date;        // stored as String like "2025-05-20"
    private String time;

    // Veterinarian details
    private String vetName;
    private String vetSpecialization;
    private String clinicName;
    private String reason;

    private String ownerName;   // owner name
    private String phone;

    private String userEmail; // ✅ ADDED: for sending notifications

    public Appointment() {
    }

    public Appointment(Long id, String petName, String petType, String serviceType, String service, String vaccine,
                       LocalDate date, String time, String vetName, String vetSpecialization, String clinicName,
                       String reason, String ownerName, String phone, String userEmail) {
        this.id = id;
        this.petName = petName;
        this.petType = petType;
        this.serviceType = serviceType;
        this.service = service;
        this.vaccine = vaccine;
        this.date = date;
        this.time = time;
        this.vetName = vetName;
        this.vetSpecialization = vetSpecialization;
        this.clinicName = clinicName;
        this.reason = reason;
        this.ownerName = ownerName;
        this.phone = phone;
        this.userEmail = userEmail;
    }

    public Long getId() {
        return id;
    }

    public String getPetName() {
        return petName;
    }

    public void setPetName(String petName) {
        this.petName = petName;
    }

    public String getPetType() {
        return petType;
    }

    public void setPetType(String petType) {
        this.petType = petType;
    }

    public String getServiceType() {
        return serviceType;
    }

    public void setServiceType(String serviceType) {
        this.serviceType = serviceType;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getService() {
        return service;
    }

    public void setService(String service) {
        this.service = service;
    }

    public String getVaccine() {
        return vaccine;
    }

    public void setVaccine(String vaccine) {
        this.vaccine = vaccine;
    }



    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getVetName() {
        return vetName;
    }

    public void setVetName(String vetName) {
        this.vetName = vetName;
    }

    public String getVetSpecialization() {
        return vetSpecialization;
    }

    public void setVetSpecialization(String vetSpecialization) {
        this.vetSpecialization = vetSpecialization;
    }

    public String getClinicName() {
        return clinicName;
    }

    public void setClinicName(String clinicName) {
        this.clinicName = clinicName;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getUserEmail() { // ✅ Getter
        return userEmail;
    }

    public void setUserEmail(String userEmail) { // ✅ Setter
        this.userEmail = userEmail;
    }
}