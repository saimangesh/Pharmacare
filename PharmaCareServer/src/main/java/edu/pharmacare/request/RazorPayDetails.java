package edu.pharmacare.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
@AllArgsConstructor
public class RazorPayDetails {
	private String orderId;
	private Integer amount;
	private String currency;
	private String key;
}
