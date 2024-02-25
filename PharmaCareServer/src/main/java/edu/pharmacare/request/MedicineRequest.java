package edu.pharmacare.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MedicineRequest {
	private String name;
	private String description;
	private String keyIngredients;
	private String uses;
	private String sideEffects;
	private String directionOfUse;
	private Double price;
	private String diseaseCategory;
}
