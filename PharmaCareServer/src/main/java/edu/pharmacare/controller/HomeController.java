package edu.pharmacare.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.pharmacare.model.DietPlan;
import edu.pharmacare.model.NutritionData;
import edu.pharmacare.model.WellnessTip;
import edu.pharmacare.service.HomeService;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {
	private final HomeService homeService;

	@GetMapping("/nutritiondatas")
	public ResponseEntity<List<NutritionData>> nutritionDatas() {
		return ResponseEntity.ok(homeService.findAllNutritionDatas());
	}

	@GetMapping("/nutritiondata/{id}")
	public ResponseEntity<NutritionData> nutritionDataById(@PathVariable Integer id) {
		return ResponseEntity.ok(homeService.findByIdNutritionData(id));
	}

	@GetMapping("/dietplans")
	public ResponseEntity<List<DietPlan>> dietPlans() {
		return ResponseEntity.ok(homeService.findAllDietPlans());
	}

	@GetMapping("/dietplan/{id}")
	public ResponseEntity<DietPlan> dietPlanById(@PathVariable Integer id) {
		return ResponseEntity.ok(homeService.findByIdDietPlan(id));
	}

	@GetMapping("/wellnesstips")
	public ResponseEntity<List<WellnessTip>> wellnessTips() {
		return ResponseEntity.ok(homeService.findAllWellnessTips());
	}

	@GetMapping("/wellnesstip/{id}")
	public ResponseEntity<WellnessTip> wellnessTipById(@PathVariable Integer id) {
		return ResponseEntity.ok(homeService.findByIdWellnessTip(id));
	}

	@GetMapping
	public ResponseEntity<String> sayHello() {
		return ResponseEntity.ok("Hello Welcome to Pharmacare");
	}

	@GetMapping("/loadPharmacyData")
	public ResponseEntity<String> loadPharmacyData() {
		homeService.loadPharmacyData();
		return ResponseEntity.ok("Load Pharmacy Data");
	}

	@GetMapping("/loadNutritionData")
	public ResponseEntity<String> loadNutritionData() {
		homeService.loadNutritionData();
		return ResponseEntity.ok("Load Nutrition Data");
	}

}
