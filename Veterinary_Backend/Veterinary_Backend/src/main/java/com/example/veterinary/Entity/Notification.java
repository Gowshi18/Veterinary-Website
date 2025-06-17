package com.example.veterinary.Entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Table(name = "notifications")
@Data
public class Notification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;

    private String message;

    private LocalDate dateCreated;

    private boolean isread;

    public Notification() {
    }
    public Notification(String email, String message, LocalDate dateCreated, boolean isread) {
        this.email = email;
        this.message = message;
        this.dateCreated = dateCreated;
        this.isread = isread;
    }

    // Getters and setters
    public Long getId() { return id; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getMessage() { return message; }

    public void setMessage(String message) { this.message = message; }

    public LocalDate getDateCreated() { return dateCreated; }

    public void setDateCreated(LocalDate dateCreated) { this.dateCreated = dateCreated; }

    public boolean isRead() { return isread; }

    public void setRead(boolean read) { this.isread = read; }
}