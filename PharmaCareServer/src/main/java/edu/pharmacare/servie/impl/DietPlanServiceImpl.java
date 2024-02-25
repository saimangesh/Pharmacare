package edu.pharmacare.servie.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import edu.pharmacare.model.DietPlan;
import edu.pharmacare.repository.DietPlanRepository;
import edu.pharmacare.service.DietPlanService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DietPlanServiceImpl implements DietPlanService {
	private final DietPlanRepository dietPlanRepository;

	@Override
	public List<DietPlan> findAll() {
		return dietPlanRepository.findAll();
	}

	@Override
	public void save(DietPlan dietPlan) {
		dietPlanRepository.save(dietPlan);
	}

	@Override
	public void saveAll(List<DietPlan> dietPlans) {
		dietPlanRepository.saveAll(dietPlans);
	}

	public DietPlan findById(Integer id) {
		Optional<DietPlan> optional = dietPlanRepository.findById(id);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}
}
