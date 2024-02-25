package edu.pharmacare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.pharmacare.model.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Integer> {

	@Modifying(clearAutomatically = true)
	@Query("UPDATE Payment a SET a.status = :status WHERE a.id = :id")
	int updateStatus(@Param("id") int id, @Param("status") String status);

	@Query("SELECT a FROM Payment a WHERE a.cart.user.id = :id")
	List<Payment> findAllByUser(Integer id);

	@Query("SELECT a FROM Payment a WHERE a.cart.user.id = :id")
	List<Payment> findAllByDoctor(Integer id);
}
