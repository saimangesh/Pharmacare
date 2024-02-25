package edu.pharmacare.servie.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import edu.pharmacare.model.Appointment;
import edu.pharmacare.model.Doctor;
import edu.pharmacare.model.User;
import edu.pharmacare.model.constants.AppointmentStatus;
import edu.pharmacare.repository.AppointmentRepository;
import edu.pharmacare.repository.UserRepository;
import edu.pharmacare.request.AppointmentRequest;
import edu.pharmacare.service.AppointmentService;
import edu.pharmacare.service.DoctorService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AppointmentServiceImpl implements AppointmentService {
	private final AppointmentRepository appointmentRepository;
	private final UserRepository userRepo;
	private final DoctorService doctorService;

	@Override
	public void save(Appointment appointment) {
		appointmentRepository.save(appointment);
	}

	@Override
	public void saveAll(List<Appointment> appointments) {
		appointmentRepository.saveAll(appointments);
	}

	@Override
	public List<Appointment> findAll() {
		return appointmentRepository.findAll();
	}

	@Override
	public Appointment findById(Integer id) {
		Optional<Appointment> optional = appointmentRepository.findById(id);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}
	
	@Override
	public List<Appointment> findAllByUser(Integer id) {
		return appointmentRepository.findAllByUser(id);
	}
	
	@Override
	public List<Appointment> findAllByDoctor(Integer id) {
		return appointmentRepository.findAllByDoctor(id);
	}

	@Override
	public Appointment createAppointment(AppointmentRequest appointmentRequest) {
		String userEmail = appointmentRequest.getUserEmail();
		int doctorId = appointmentRequest.getDoctorId();
		String consultationType = appointmentRequest.getConsultationType();
		String appointmentDate = appointmentRequest.getAppointmentDate();
		String status = appointmentRequest.getStatus();

		User user = this.userRepo.findByEmail(userEmail);
		Doctor doctor = this.doctorService.findById(doctorId);

		Appointment appointment = new Appointment();
		appointment.setUser(user);
		appointment.setDoctor(doctor);
		appointment.setConsultationType(consultationType);
		appointment.setAppointmentDate(appointmentDate);
		appointment.setStatus(AppointmentStatus.valueOf(status));
		appointment.setCreatedTime(LocalDateTime.now());
		appointment.setUpdatedTime(LocalDateTime.now());

		appointmentRepository.save(appointment);

		return appointment;
	}

	@Override
	public void updateStatus(Integer appointmentId, String status) {
		appointmentRepository.updateStatus(appointmentId, status);
	}

	@Override
	public void deleteById(Integer id) {
		appointmentRepository.deleteById(id);
	}
}
