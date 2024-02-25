package edu.pharmacare.service;

import java.util.List;

import edu.pharmacare.model.NutritionData;

public interface NutritionDataService {
	List<NutritionData> findAll();

	NutritionData findById(Integer id);

	void save(NutritionData nutritionData);

	void saveAll(List<NutritionData> nutritionDatas);
}
