package edu.pharmacare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import edu.pharmacare.model.Cart;

public interface CartRepository extends JpaRepository<Cart, Integer> {

	@Query(value = "SELECT c FROM Cart c WHERE c.user.id = :userId and c.active = true")
	public Cart findByUserCurrentCart(@Param("userId") Integer userId);

	@Query(value = "SELECT c FROM Cart c WHERE c.user.id = :userId and c.active = false")
	public List<Cart> findByUserHistoryCart(@Param("userId") Integer userId);
}
