package edu.pharmacare.model.dto;

import edu.pharmacare.model.Cart;
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
public class CartDetailsDto {
	private int CartDetailsId;

	private MedicineDto products;

	private Integer Quantity;

	private Double Amount;

	private Cart cart;
}
