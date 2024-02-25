package edu.pharmacare.model.dto;

import java.time.LocalDateTime;

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
public class MedicineDto {

	private Integer id;

	private String name;

	private String description;

	private String keyIngredients;

	private String uses;

	private String sideEffects;

	private String directionOfUse;

	private Double price;

	private String diseaseCategory;

	private LocalDateTime createdTime;

	private LocalDateTime updatedTime;

}