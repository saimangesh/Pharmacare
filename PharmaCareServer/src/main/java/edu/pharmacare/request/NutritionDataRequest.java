package edu.pharmacare.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NutritionDataRequest {
	private String foodItem;
	private String category;
	private String overwiew;
	private String servingSize;
	private String calories;
	private String carbs;
	private String protiens;
	private String fats;
	private String dietaryFiber;
	private String sugars;
}
