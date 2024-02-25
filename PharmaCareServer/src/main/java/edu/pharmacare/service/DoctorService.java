package edu.pharmacare.service;

import java.util.List;

import edu.pharmacare.model.Doctor;
import edu.pharmacare.request.DoctorRequest;
import edu.pharmacare.response.JwtAuthenticationResponse;

public interface DoctorService {
	JwtAuthenticationResponse signup(DoctorRequest request);

	List<Doctor> findAll();

	Doctor findById(Integer id);

	void save(Doctor doctor);

	void saveAll(List<Doctor> doctors);

	void deleteById(Integer id);
}
