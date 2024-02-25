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
@Table(name = "diet_plan")
public class DietPlan implements Serializable {

	@Serial
	private static final long serialVersionUID = 1905122041950251207L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "plan_name", unique = true)
	private String planName;

	@Column(name = "overwiew", columnDefinition = "text")
	private String overwiew;

	@Column(name = "target_audience")
	private String targetAudience;

	@Column(name = "duration")
	private String duration;

	@Column(name = "meal_frequency")
	private String mealFrequency;

	@Column(name = "daily _calorie_intake")
	private String dailyCalorieIntake;

	@Column(name = "macronutrient_distribution")
	private String macronutrientDistribution;

	@Column(name = "created_at", updatable = false)
	private LocalDateTime createdTime;

	@Column(name = "updated_at")
	private LocalDateTime updatedTime;

}