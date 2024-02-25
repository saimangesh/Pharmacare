package edu.pharmacare.model.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class CartDto {

	private Integer Id;

	private UserDto user;

	private Double TotalAmount;

	private List<CartDetailsDto> cartDetalis;

}
