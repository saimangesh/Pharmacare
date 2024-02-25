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
@Table(name = "medicine")
public class Medicine implements Serializable {

	@Serial
	private static final long serialVersionUID = 1905122041950251207L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;

	@Column(name = "name", unique = true)
	private String name;

	@Column(name = "description")
	private String description;
	
	@Column(name = "image_url")
	private String imageUrl;

	@Column(name = "key_ingredients")
	private String keyIngredients;

	@Column(name = "uses")
	private String uses;

	@Column(name = "side_effects")
	private String sideEffects;

	@Column(name = "direction_of_use")
	private String directionOfUse;

	@Column(name = "price")
	private Double price;

	@Column(name = "disease_category")
	private String diseaseCategory;

	@Column(name = "created_at", updatable = false)
	private LocalDateTime createdTime;

	@Column(name = "updated_at")
	private LocalDateTime updatedTime;

}