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
@Table(name = "nutrition_data")
public class NutritionData implements Serializable {

	@Serial
	private static final long serialVersionUID = 1905122041950251207L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "food_item", unique = true)
	private String foodItem;

	@Column(name = "category")
	private String category;

	@Column(name = "overwiew", columnDefinition = "text")
	private String overwiew;

	@Column(name = "serving_size")
	private String servingSize;

	@Column(name = "calories")
	private String calories;

	@Column(name = "carbs")
	private String carbs;

	@Column(name = "protiens")
	private String protiens;

	@Column(name = "fats")
	private String fats;

	@Column(name = "dietary_fiber")
	private String dietaryFiber;

	@Column(name = "sugars")
	private String sugars;

	@Column(name = "created_at", updatable = false)
	private LocalDateTime createdTime;

	@Column(name = "updated_at")
	private LocalDateTime updatedTime;

}