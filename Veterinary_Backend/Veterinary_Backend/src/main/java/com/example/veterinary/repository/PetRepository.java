package com.example.veterinary.repository;

import com.example.veterinary.Entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    // Find pets by owner's email
    List<Pet> findByUserProfile_Email(String ownerEmail);

    // Count total pets
    @Query(nativeQuery = true, value = "SELECT COUNT(*) FROM Pet")
    int petcount();
}
