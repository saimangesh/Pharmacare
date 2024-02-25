package edu.pharmacare.servie.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import edu.pharmacare.model.NutritionData;
import edu.pharmacare.repository.NutritionDataRepository;
import edu.pharmacare.service.NutritionDataService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class NutritionDataServiceImpl implements NutritionDataService {
	private final NutritionDataRepository nutritionDataRepository;

	@Override
	public List<NutritionData> findAll() {
		return nutritionDataRepository.findAll();
	}

	@Override
	public void save(NutritionData nutritionData) {
		nutritionDataRepository.save(nutritionData);
	}

	@Override
	public void saveAll(List<NutritionData> nutritionDatas) {
		nutritionDataRepository.saveAll(nutritionDatas);
	}

	public NutritionData findById(Integer id) {
		Optional<NutritionData> optional = nutritionDataRepository.findById(id);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}
}
