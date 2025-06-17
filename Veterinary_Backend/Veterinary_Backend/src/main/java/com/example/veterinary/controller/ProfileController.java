package com.example.veterinary.controller;

import com.example.veterinary.Entity.UserProfile;
import com.example.veterinary.repository.UserProfileRepository;
import com.example.veterinary.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin
@RestController
@RequestMapping("/api/profile")
public class ProfileController {

    @Autowired
    private UserProfileService service;

    // GET profile by email
    @GetMapping
    public ResponseEntity<UserProfile> getProfile(@RequestParam String email) {
        return service.getProfileByEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.ok(new UserProfile())); // return empty JSON with 200 status
    }
    @Autowired
    private UserProfileRepository userProfileRepository;

    @GetMapping("/all")
    public List<UserProfile> getAllUserProfiles() {
        return userProfileRepository.findAll();
    }

    // POST or update profile
    @PostMapping
    public ResponseEntity<UserProfile> saveProfile(@RequestBody UserProfile profile) {
        UserProfile savedProfile = service.saveOrUpdateProfile(profile);
        return ResponseEntity.ok(savedProfile);
    }
    @PutMapping("/update")
    public ResponseEntity<UserProfile> updateProfile(@RequestBody UserProfile profile) {
        UserProfile updated = service.saveOrUpdateProfile(profile);
        return ResponseEntity.ok(updated);
    }
}
