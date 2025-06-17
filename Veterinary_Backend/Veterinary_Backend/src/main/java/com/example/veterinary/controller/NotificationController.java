package com.example.veterinary.controller;

import com.example.veterinary.Entity.Notification;
import com.example.veterinary.repository.NotificationRepository;
import com.example.veterinary.service.NotificationService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@CrossOrigin(origins = "http://localhost:5173")
public class NotificationController {

    @Autowired
    private NotificationRepository notificationRepository;
    @Autowired private NotificationService notificationService;

    // GET all notifications for a specific user by email
    @GetMapping("/{email}")
    public ResponseEntity<List<Notification>> getNotifications(@PathVariable String email) {
        return ResponseEntity.ok(notificationRepository.findByEmailOrderByDateCreatedDesc(email));
    }

    // Mark a notification as read
    @PostMapping("/mark-read/{id}")
    public ResponseEntity<Void> markAsRead(@PathVariable Long id) {
        notificationRepository.findById(id).ifPresent(notification -> {
            notification.setRead(true);
            notificationRepository.save(notification);
        });
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Notification>> getNotificationsByEmail(
            @RequestParam String email) {
        List<Notification> notifications = notificationService.findByEmail(email);
        return ResponseEntity.ok(notifications);
    }
    // Create a new notification manually
    @PostMapping
    public ResponseEntity<Notification> createNotification(@RequestBody Notification notification) {
        notification.setDateCreated(LocalDate.now());
        return ResponseEntity.ok(notificationRepository.save(notification));
    }

    // Get all notifications (admin/debug)
//    @GetMapping
//    public ResponseEntity<List<Notification>> getAllNotifications() {
//        return ResponseEntity.ok(notificationRepository.findAll());
//    }

    // Create notification automatically when booking an appointment
    @PostMapping("/appointment-alert")
    public ResponseEntity<?> createAppointmentNotification(@RequestBody AppointmentNotificationRequest request) {
        try {
            LocalDate appointmentDate = LocalDate.parse(request.getDate());

            if (appointmentDate.isEqual(LocalDate.now())) {
                Notification notification = new Notification();
                notification.setEmail(request.getUserEmail());
                notification.setMessage("Appointment booked for today at " + request.getTime());
                notification.setDateCreated(LocalDate.now());
                notification.setRead(false);
                return ResponseEntity.ok(notificationRepository.save(notification));
            }
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error processing notification: " + e.getMessage());
        }
    }

    // DTO for appointment notification request
    @Data
    public static class AppointmentNotificationRequest {
        private String userEmail;
        private String date;  // As string to handle frontend format
        private String time;

        public String getUserEmail() {
            return userEmail;
        }

        public void setUserEmail(String userEmail) {
            this.userEmail = userEmail;
        }

        public String getDate() {
            return date;
        }

        public void setDate(String date) {
            this.date = date;
        }

        public String getTime() {
            return time;
        }

        public void setTime(String time) {
            this.time = time;
        }
    }
}