package edu.pharmacare.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentRequest {
	private String userEmail;
	private Integer doctorId;
	private String consultationType;
	private String appointmentDate;
	private String status;
}
