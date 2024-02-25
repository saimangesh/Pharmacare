package edu.pharmacare.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.pharmacare.model.Doctor;
import edu.pharmacare.request.DoctorRequest;
import edu.pharmacare.request.DoctorUpdateRequest;
import edu.pharmacare.service.DoctorService;

@RestController
@CrossOrigin
@RequestMapping("/doctor")
public class DoctorController {

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

	@PostMapping("/create")
	public ResponseEntity<Doctor> createDoctor(@RequestBody DoctorRequest request, Principal principal)
			throws Exception {
		Doctor doctor = new Doctor();
		doctor.setCreatedTime(LocalDateTime.now());
		doctor.setUpdatedTime(LocalDateTime.now());
		doctorService.save(doctor);
		return new ResponseEntity<>(doctor, HttpStatusCode.valueOf(200));
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Map> deleteDoctor(@PathVariable Integer id, Principal principal) throws Exception {
		this.doctorService.deleteById(id);
		Map<String, Object> response = new HashMap<>();
		response.put("message", "Doctor Deleted Successfully");
		return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
	}

	@PostMapping("/update")
	public ResponseEntity<Doctor> updateDoctor(@RequestBody DoctorUpdateRequest request, Principal principal)
			throws Exception {
		Integer id = request.getId();
		Doctor doctor = doctorService.findById(id);
		doctor.setExperience(request.getExperience());
		doctor.setQualification(request.getQualification());
		doctor.setHospitalName(request.getHospitalName());
		doctor.setUpdatedTime(LocalDateTime.now());
		doctorService.save(doctor);
		return new ResponseEntity<>(doctor, HttpStatusCode.valueOf(200));
	}

}
