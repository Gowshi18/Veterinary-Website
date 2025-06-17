package com.example.veterinary.service;

import com.example.veterinary.Entity.Pet;
import com.example.veterinary.Entity.UserProfile;
import com.example.veterinary.repository.PetRepository;
import com.example.veterinary.repository.UserProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Paths;
import java.util.List;
import java.util.UUID;

@Service
public class PetService {

    @Autowired
    private PetRepository petRepository;

    @Autowired
    private UserProfileRepository userProfileRepository;

    private final String uploadDir = "C:/Users/HP/Desktop/Veterinary_Backend/Veterinary_Backend/uploads/";

    public Pet savePet(
            String petName, String petType, String breed, String dob, String gender, double weight,
            String color, String medicalConditions, String allergies,
            MultipartFile petImage, String ownerEmail,String ownerName,String phone) throws IOException {

        // 1. Find user by email
        UserProfile userProfile = userProfileRepository.findByEmail(ownerEmail)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + ownerEmail));

        // 2. Create pet entity
        Pet pet = new Pet();
        pet.setPetName(petName);
        pet.setPetType(petType);
        pet.setBreed(breed);
        pet.setDob(dob);
        pet.setGender(gender);
        pet.setWeight(weight);
        pet.setColor(color);
        pet.setMedicalConditions(medicalConditions);
        pet.setAllergies(allergies);
        pet.setOwnerName(ownerName);
        pet.setPhone(phone);
        pet.setUserProfile(userProfile);

        // 3. Handle pet image
        if (petImage != null && !petImage.isEmpty()) {
            String originalFilename = petImage.getOriginalFilename();
            String fileExtension = originalFilename.substring(originalFilename.lastIndexOf("."));
            String uniqueFileName = UUID.randomUUID().toString() + fileExtension;

            File uploadFolder = new File(uploadDir);
            if (!uploadFolder.exists()) {
                uploadFolder.mkdirs();
            }

            File savedFile = new File(Paths.get(uploadDir, uniqueFileName).toString());
            petImage.transferTo(savedFile);

            // Save only the relative path
            pet.setPetImageName(uniqueFileName);
        }

        // 4. Save to DB
        return petRepository.save(pet);
    }

    public List<Pet> getPetsByOwnerEmail(String ownerEmail) {
        return petRepository.findByUserProfile_Email(ownerEmail);
    }

    public int petcount(){
        return petRepository.petcount();
    }
    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

}
