package edu.pharmacare.service;

import java.util.List;

import edu.pharmacare.model.DietPlan;

public interface DietPlanService {

	List<DietPlan> findAll();

	DietPlan findById(Integer id);

	void save(DietPlan dietPlan);

	void saveAll(List<DietPlan> dietPlans);
}
