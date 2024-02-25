package edu.pharmacare.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PaymentHelp {
	private String UserEmail;
	private int CartId;
	private double Amount;
}
