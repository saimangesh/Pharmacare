package edu.pharmacare.service;

import org.springframework.stereotype.Service;

import edu.pharmacare.model.CartDetails;
import edu.pharmacare.request.CartRequest;

@Service
public interface CartDetailsService {

	// add product
	public CartDetails addProduct(CartRequest cartRequest);
}
