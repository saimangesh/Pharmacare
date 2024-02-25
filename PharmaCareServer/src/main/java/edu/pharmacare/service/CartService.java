package edu.pharmacare.service;

import edu.pharmacare.model.Cart;
import edu.pharmacare.request.CartRequest;

public interface CartService {

	// Create
	Cart CreateCart(CartRequest cartRequest);

	// add Product To Cart
	Cart addProductToCart(CartRequest cartRequest);

	// Get
	Cart GetCart(String userEmail);

	// Get
	Cart GetCartById(Integer cartId, String userEmail);

	// delete product
	void RemoveById(Integer ProductId, String userEmail);

	Cart save(Cart cart);

	// delete

}
