package edu.pharmacare.model.dto;

import java.time.LocalDateTime;

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
public class DoctorDto {

	private Integer id;

	private String name;

	private String qualification;

	private String experience;

	private String specialization;

	private String consultationType;

	private String hospitalName;

	private LocalDateTime createdTime;

	private LocalDateTime updatedTime;

}