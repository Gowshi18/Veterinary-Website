package com.example.veterinary.repository;

import com.example.veterinary.Entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByEmailOrderByDateCreatedDesc(String email);

    List<Notification> findByEmail(String email);
}