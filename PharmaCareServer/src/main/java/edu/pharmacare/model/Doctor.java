package edu.pharmacare.model;

import java.io.Serial;
import java.io.Serializable;
import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
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
@Table(name = "doctor")
public class Doctor implements Serializable {

	@Serial
	private static final long serialVersionUID = 1905122041950251207L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "name", unique = true)
	private String name;

	@Column(name = "qualification")
	private String qualification;

	@Column(name = "experience")
	private String experience;

	@Column(name = "specialization")
	private String specialization;

	@Column(name = "consultation_type")
	private String consultationType;

	@Column(name = "hospital_name")
	private String hospitalName;

	@Column(name = "created_at", updatable = false)
	private LocalDateTime createdTime;

	@Column(name = "updated_at")
	private LocalDateTime updatedTime;

}