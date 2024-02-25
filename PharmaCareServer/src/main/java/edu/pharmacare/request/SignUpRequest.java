package edu.pharmacare.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SignUpRequest {
	private String name;
	private String email;
	private String userName;
	private String password;
	private String dateOfBirth;
	private String mobile;
	private String shippingAddress;
	private String billingAddress;
	private String medicalHistory;
	private String allergies;
}
