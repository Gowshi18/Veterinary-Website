package com.example.veterinary.controller;

import com.example.veterinary.Entity.Appointment;
import com.example.veterinary.service.AppointmentService;
import com.example.veterinary.service.PetService;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin // your React app URL
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private PetService petService;

    private final AppointmentService service;

    public AppointmentController(AppointmentService service) {
        this.service = service;
    }

    @GetMapping("/vet/{vetName}")
    public ResponseEntity<List<Appointment>> getAppointmentsByVetName(
            @PathVariable String vetName) {
        List<Appointment> appointments = service.findByVetName(vetName);
        return ResponseEntity.ok(appointments);
    }

    @PostMapping
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return service.save(appointment);
    }

    @GetMapping("/appointment/{email}")
    public List<Appointment> getAllAppointments() {
        return service.getAll();
    }

    @GetMapping("/count")
    public ResponseEntity<?> count(){
        JSONObject js = new JSONObject();
        js.put("count",service.count());
        js.put("petcount",petService.petcount());
//        js.put("vaccineCount",service.vaccount());
        return new ResponseEntity<>(js, HttpStatus.OK);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Appointment> getAppointmentById(@PathVariable Long id) {
        Optional<Appointment> appointment = service.findById(id);
        return appointment.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @GetMapping("/user")
    public ResponseEntity<List<Appointment>> getAppointmentsByUserEmail(@RequestParam String email) {
        List<Appointment> appointments = service.getAppointmentsByEmail(email);
        return new ResponseEntity<>(appointments, HttpStatus.OK);
    }


}
