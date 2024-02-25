package edu.pharmacare.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.pharmacare.model.Doctor;
import edu.pharmacare.service.DoctorService;

@RestController
@CrossOrigin
@RequestMapping("/chat")
public class ChatbotController {

	@Autowired
	private DoctorService doctorService;

	@GetMapping("/all")
	public ResponseEntity<List<Doctor>> doctors() {
		return ResponseEntity.ok(doctorService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Doctor> doctorsById(@PathVariable Integer id) {
		return ResponseEntity.ok(doctorService.findById(id));
	}

}
