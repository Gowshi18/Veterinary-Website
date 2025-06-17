package com.example.veterinary;

import com.example.veterinary.Entity.Notification;
import com.example.veterinary.repository.NotificationRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import java.time.LocalDate;

@SpringBootApplication
public class VeterinaryApplication {

	public static void main(String[] args) {
		SpringApplication.run(VeterinaryApplication.class, args);
	}


}
