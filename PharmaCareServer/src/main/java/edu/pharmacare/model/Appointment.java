package edu.pharmacare.model;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

import edu.pharmacare.model.constants.AppointmentStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
@Entity
@Table(name = "appointment", uniqueConstraints = @UniqueConstraint(name = "user_id_doctor_id_appointment_date", columnNames = {
		"user_id", "doctor_id", "appointment_date" }))
public class Appointment implements Serializable {

	@Serial
	private static final long serialVersionUID = 1905122041950251207L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@ManyToOne
	@JoinColumn(name = "user_id", unique = false)
	private User user;

	@ManyToOne
	@JoinColumn(name = "doctor_id", unique = false)
	private Doctor doctor;

	@Column(name = "appointment_date", unique = false)
	private String appointmentDate;

	@Column(name = "consultation_type")
	private String consultationType;

	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private AppointmentStatus status;

	@Column(name = "created_at", updatable = false)
	private LocalDateTime createdTime;

	@Column(name = "updated_at")
	private LocalDateTime updatedTime;

}