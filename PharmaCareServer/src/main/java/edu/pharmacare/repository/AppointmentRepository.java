package edu.pharmacare.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import edu.pharmacare.model.Appointment;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

	@Modifying(clearAutomatically = true)
	@Query("UPDATE Appointment a SET a.status = :status WHERE a.id = :id")
	int updateStatus(@Param("id") int id, @Param("status") String status);

	@Query("SELECT a FROM Appointment a WHERE a.user.id = :id")
	List<Appointment> findAllByUser(Integer id);

	@Query("SELECT a FROM Appointment a WHERE a.doctor.id = :id")
	List<Appointment> findAllByDoctor(Integer id);
}
