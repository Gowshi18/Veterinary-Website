package com.example.veterinary.service;

import com.example.veterinary.Entity.User;

import com.example.veterinary.dto.userequest;
import com.example.veterinary.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(userequest ur) {
        // Check if email already exists
        if (userRepository.existsByEmail(ur.getEmail())) {
            throw new IllegalArgumentException("Email already in use");
        }

        // Validate role
        if (!ur.getRole().equals("petOwner") && !ur.getRole().equals("vet")) {
            throw new IllegalArgumentException("Invalid role. Must be 'petOwner' or 'vet'");
        }

        // Validate clinic name for vets
        if (ur.getRole().equals("vet") && (ur.getClinicName() == null || ur.getClinicName().isBlank())) {
            throw new IllegalArgumentException("Clinic name is required for vets");
        }

        User user = new User();
        user.setFirstName(ur.getFirstName());
        user.setLastName(ur.getLastName());
        user.setEmail(ur.getEmail());
        user.setPassword(passwordEncoder.encode(ur.getPassword()));
        user.setRole(ur.getRole());
        user.setClinicName(ur.getClinicName());

        return userRepository.save(user);
    }

    public Optional<User> loginUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);
        if (userOptional.isPresent() &&
                passwordEncoder.matches(password, userOptional.get().getPassword())) {
            return userOptional;
        }
        return Optional.empty();
    }
}
