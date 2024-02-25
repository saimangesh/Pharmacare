package edu.pharmacare.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import edu.pharmacare.model.DietPlan;

@Repository
public interface DietPlanRepository extends JpaRepository<DietPlan, Integer> {
}
