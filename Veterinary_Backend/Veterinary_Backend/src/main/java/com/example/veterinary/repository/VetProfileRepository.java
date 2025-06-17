package com.example.veterinary.repository;

import com.example.veterinary.Entity.VetProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VetProfileRepository extends JpaRepository<VetProfile, Long> {
    VetProfile findByEmail(String email);
}
