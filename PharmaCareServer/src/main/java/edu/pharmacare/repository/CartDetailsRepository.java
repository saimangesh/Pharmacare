package edu.pharmacare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import edu.pharmacare.model.Cart;
import edu.pharmacare.model.CartDetails;
import edu.pharmacare.model.Medicine;

public interface CartDetailsRepository extends JpaRepository<CartDetails, Integer> {
	public void deleteByProductsAndCart(Medicine product, Cart cart);

	public CartDetails findByProductsAndCart(Medicine product, Cart cart);

	public List<CartDetails> findAllByCart(Cart cart);
}
