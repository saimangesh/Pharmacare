package edu.pharmacare.service;

import java.util.List;

import edu.pharmacare.model.Appointment;
import edu.pharmacare.request.AppointmentRequest;

public interface AppointmentService {

	Appointment createAppointment(AppointmentRequest appointmentRequest);

	List<Appointment> findAll();

	Appointment findById(Integer id);

	void save(Appointment appointment);

	void saveAll(List<Appointment> appointments);

	void updateStatus(Integer appointmentId, String status);

	void deleteById(Integer id);

	List<Appointment> findAllByUser(Integer id);

	List<Appointment> findAllByDoctor(Integer id);
}
