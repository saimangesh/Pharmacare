package edu.pharmacare.request;

import edu.pharmacare.model.constants.UserRole;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserRequest {
	private Integer id;
	private String name;
	private String username;
	private String dateOfBirth;
	private String mobile;
	private String shippingAddress;
	private String billingAddress;
	private String medicalHistory;
	private String allergies;
	@Enumerated(EnumType.STRING)
	private UserRole role;
}
