package edu.pharmacare.servie.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import edu.pharmacare.model.Doctor;
import edu.pharmacare.repository.DoctorRepository;
import edu.pharmacare.repository.UserRepository;
import edu.pharmacare.request.DoctorRequest;
import edu.pharmacare.response.JwtAuthenticationResponse;
import edu.pharmacare.service.DoctorService;
import edu.pharmacare.service.JwtService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DoctorServiceImpl implements DoctorService {
	private final DoctorRepository doctorRepository;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	@Override
	public JwtAuthenticationResponse signup(DoctorRequest request) {
		var doctor = Doctor.builder().name(request.getName()).qualification(request.getQualification())
				.specialization(request.getSpecialization()).consultationType(request.getConsultationType())
				.hospitalName(request.getHospitalName()).build();

		doctorRepository.save(doctor);
		var jwt = "doctor registration successful";
		return JwtAuthenticationResponse.builder().token(jwt).build();
	}

	@Override
	public void save(Doctor doctor) {
		doctorRepository.save(doctor);
	}

	@Override
	public void saveAll(List<Doctor> doctors) {
		doctorRepository.saveAll(doctors);
	}

	@Override
	public List<Doctor> findAll() {
		return doctorRepository.findAll();
	}

	@Override
	public Doctor findById(Integer id) {
		Optional<Doctor> optional = doctorRepository.findById(id);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	@Override
	public void deleteById(Integer id) {
		doctorRepository.deleteById(id);
	}
}
