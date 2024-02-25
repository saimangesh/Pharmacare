package edu.pharmacare.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DoctorUpdateRequest {
	private Integer id;
	private String experience;
	private String qualification;
	private String hospitalName;
}
