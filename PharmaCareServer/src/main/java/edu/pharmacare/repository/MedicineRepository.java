package edu.pharmacare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.pharmacare.model.Medicine;

@Repository
public interface MedicineRepository extends JpaRepository<Medicine, Integer> {
}
