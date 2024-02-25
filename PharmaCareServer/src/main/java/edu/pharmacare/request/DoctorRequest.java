package edu.pharmacare.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorRequest {
	private String name;
	private String qualification;
	private String specialization;
	private String consultationType;
	private String hospitalName;
}
