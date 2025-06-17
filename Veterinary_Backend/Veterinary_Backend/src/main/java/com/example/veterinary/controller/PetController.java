package com.example.veterinary.controller;

import com.example.veterinary.Entity.Pet;
import com.example.veterinary.service.PetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/pets")
@CrossOrigin(origins = "http://localhost:5173") // Make sure this matches your frontend port
public class PetController {

    @Autowired
    private PetService petService;

    // ✅ Register new pet with optional image
    @PostMapping(value = "/register-pet", consumes = "multipart/form-data")
    public ResponseEntity<Pet> registerPet(
            @RequestParam("petName") String petName,
            @RequestParam("petType") String petType,
            @RequestParam("breed") String breed,
            @RequestParam("dob") String dob,
            @RequestParam("gender") String gender,
            @RequestParam("weight") double weight,
            @RequestParam("color") String color,
            @RequestParam(value = "medicalConditions", required = false) String medicalConditions,
            @RequestParam(value = "allergies", required = false) String allergies,
            @RequestParam(value = "petImage", required = false) MultipartFile petImage,
            @RequestParam("ownerEmail") String ownerEmail,
             @RequestParam("ownerName") String ownerName,
            @RequestParam("phone") String phone

    ) {
        try {
            Pet savedPet = petService.savePet(
                    petName, petType, breed, dob, gender, weight,
                    color, medicalConditions, allergies, petImage, ownerEmail,ownerName,phone
            );
            return new ResponseEntity<>(savedPet, HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // ✅ Fetch pets by owner email
    @GetMapping
    public ResponseEntity<List<Pet>> getPetsByOwnerEmail(@RequestParam String ownerEmail) {
        try {
            List<Pet> pets = petService.getPetsByOwnerEmail(ownerEmail);
            return new ResponseEntity<>(pets, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/all")
    public ResponseEntity<List<Pet>> getAllPets() {
        try {
            List<Pet> pets = petService.getAllPets();
            return new ResponseEntity<>(pets, HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


}
