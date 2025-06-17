package com.example.veterinary.scheduler;

import com.example.veterinary.Entity.Appointment;
import com.example.veterinary.repository.AppointmentRepository;
import com.example.veterinary.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
public class NotificationScheduler {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private NotificationService notificationService;

    // Runs every day at 8 AM
    @Scheduled(cron = "0 0 8 * * *")
    public void sendReminders() {
        LocalDate today = LocalDate.now();
        LocalDate twoDaysFromNow = today.plusDays(2);

        List<Appointment> todayAppointments = appointmentRepository.findByDate(today);
        List<Appointment> upcomingAppointments = appointmentRepository.findByDate(twoDaysFromNow);

        for (Appointment appt : todayAppointments) {
            notificationService.createNotification(
                    appt.getUserEmail(),
                    "Reminder: Your appointment is today for your pet " + appt.getPetName()
            );
        }

        for (Appointment appt : upcomingAppointments) {
            notificationService.createNotification(
                    appt.getUserEmail(),
                    "Reminder: Your appointment is in 2 days for your pet " + appt.getPetName()
            );
        }
    }
}
