package com.example.veterinary.service;

import com.example.veterinary.Entity.VetProfile;
import com.example.veterinary.repository.VetProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VetProfileService {

    @Autowired
    private VetProfileRepository vetProfileRepository;

    // Fetch vet profile by email
    public VetProfile getVetProfile(String email) {
        return vetProfileRepository.findByEmail(email);
    }

    // Save or update vet profile
    public VetProfile saveVetProfile(VetProfile vetProfile) {
        return vetProfileRepository.save(vetProfile);
    }
    public List<VetProfile> getAllVetProfiles() {
        return vetProfileRepository.findAll();
    }

}
