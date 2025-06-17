package com.example.veterinary.service;

import com.example.veterinary.Entity.UserProfile;
import com.example.veterinary.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository repository;

    public Optional<UserProfile> getProfileByEmail(String email) {
        return repository.findByEmail(email);
    }

    public UserProfile saveOrUpdateProfile(UserProfile profile) {
        Optional<UserProfile> existing = repository.findByEmail(profile.getEmail());
        if (existing.isPresent()) {
            profile.setId(existing.get().getId());
        }
        return repository.save(profile);
    }
}
