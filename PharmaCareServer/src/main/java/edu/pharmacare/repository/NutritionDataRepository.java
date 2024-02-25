package edu.pharmacare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.pharmacare.model.NutritionData;

@Repository
public interface NutritionDataRepository extends JpaRepository<NutritionData, Integer> {
}
