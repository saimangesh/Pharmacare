package edu.pharmacare.servie.impl;

import org.springframework.beans.factory.annotation.Autowired;

import edu.pharmacare.model.CartDetails;
import edu.pharmacare.repository.CartRepository;
import edu.pharmacare.repository.UserRepository;
import edu.pharmacare.request.CartRequest;
import edu.pharmacare.service.CartDetailsService;

public class CartDetailsServiceImpl implements CartDetailsService {

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private CartRepository cartRepository;

	@Override
	public CartDetails addProduct(CartRequest cartRequest) {
		int productId = cartRequest.getProductId();
		int quantity = cartRequest.getQuantity();
		String userEmail = cartRequest.getUserEmail();

		// get user
		return null;
	}
}
