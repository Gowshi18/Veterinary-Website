package com.example.veterinary.controller;

import com.example.veterinary.Entity.VetProfile;
import com.example.veterinary.service.VetProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/veterinarian")
@CrossOrigin
public class VetProfileController {

    @Autowired
    private VetProfileService vetProfileService;

    @GetMapping("/vet-profile")
    public ResponseEntity<VetProfile> getVetProfile(@RequestParam String email) {
        VetProfile vetProfile = vetProfileService.getVetProfile(email);
        if (vetProfile != null) {
            return ResponseEntity.ok(vetProfile);
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/all-vets")
    public ResponseEntity<List<VetProfile>> getAllVetProfiles() {
        return ResponseEntity.ok(vetProfileService.getAllVetProfiles());
    }

    @PostMapping("/vet-profile")
    public ResponseEntity<VetProfile> saveVetProfile(@RequestBody VetProfile vetProfile) {
        VetProfile savedProfile = vetProfileService.saveVetProfile(vetProfile);
        return ResponseEntity.ok(savedProfile);
    }

    @PostMapping("/upload-image")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String uploadDir = "C:/Users/HP/Desktop/Veterinary_Backend/Veterinary_Backend/uploads/";
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();
            String filePath = uploadDir + fileName;
            file.transferTo(new File(filePath));

            return ResponseEntity.ok("/uploads/" + fileName);
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Upload failed: " + e.getMessage());
        }
    }
}