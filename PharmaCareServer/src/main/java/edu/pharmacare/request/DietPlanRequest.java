package edu.pharmacare.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DietPlanRequest {
	private String plaName;
	private String overwiew;
	private String targetAudience;
	private String duration;
	private String mealFrequency;
	private String dailyCalorieIntake;
	private String macronutrientDistribution;
}
