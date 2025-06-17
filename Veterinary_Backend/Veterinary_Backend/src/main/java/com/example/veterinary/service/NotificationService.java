package com.example.veterinary.service;

import com.example.veterinary.Entity.Notification;
import com.example.veterinary.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public void createNotification(String email, String message) {
        Notification notification = new Notification(email, message, LocalDate.now(), false);
        notificationRepository.save(notification);
    }


        private final NotificationRepository repository;

        public NotificationService(NotificationRepository repository) {
            this.repository = repository;
        }

        public List<Notification> findByEmail(String email) {
            return repository.findByEmail(email);
        }

}