package edu.pharmacare.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
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

import edu.pharmacare.model.Appointment;
import edu.pharmacare.model.User;
import edu.pharmacare.model.constants.AppointmentStatus;
import edu.pharmacare.model.constants.UserRole;
import edu.pharmacare.request.AppointmentRequest;
import edu.pharmacare.request.AppointmentUpdateRequest;
import edu.pharmacare.service.AppointmentService;
import edu.pharmacare.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/appointment")
public class AppointmentController {

	@Autowired
	private AppointmentService appointmentService;

	@Autowired
	private UserService userService;

	@GetMapping("/all")
	public ResponseEntity<List<Appointment>> appointments(Principal principal) {
		List<Appointment> list = new ArrayList<>();
		String userEmail = principal.getName();
		if (StringUtils.isNotBlank(userEmail)) {
			User user = userService.findByEmail(userEmail);
			if (user != null) {
				Integer id = user.getId();
				UserRole userRole = user.getRole();
				if (userRole == null) {
					userRole = UserRole.USER;
				}
				if (UserRole.ADMIN.equals(userRole)) {
					list = appointmentService.findAll();
				} else if (UserRole.DOCTOR.equals(userRole)) {
					list = appointmentService.findAllByDoctor(id);
				} else if (UserRole.USER.equals(userRole)) {
					list = appointmentService.findAllByUser(id);
				}
			}
		}
		return ResponseEntity.ok(list);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Appointment> appointmenstById(@PathVariable Integer id) {
		return ResponseEntity.ok(appointmentService.findById(id));
	}

	@PostMapping("/create")
	public ResponseEntity<Appointment> createAppointment(@RequestBody AppointmentRequest request, Principal principal)
			throws Exception {
		String userEmail = principal.getName();
		request.setUserEmail(userEmail);
		Appointment appointment = this.appointmentService.createAppointment(request);
		return new ResponseEntity<>(appointment, HttpStatusCode.valueOf(200));
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Map> deleteAppointment(@PathVariable Integer id, Principal principal) throws Exception {
		this.appointmentService.deleteById(id);
		Map<String, Object> response = new HashMap<>();
		response.put("message", "Appointment Deleted Successfully");
		return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
	}

	@PostMapping("/update")
	public ResponseEntity<Appointment> updateAppointment(@RequestBody AppointmentUpdateRequest request,
			Principal principal) throws Exception {
		Integer id = request.getId();
		Appointment appointment = appointmentService.findById(id);
		appointment.setStatus(AppointmentStatus.valueOf(request.getStatus()));
		appointment.setUpdatedTime(LocalDateTime.now());
		this.appointmentService.save(appointment);
		return new ResponseEntity<>(appointment, HttpStatusCode.valueOf(200));
	}

}
