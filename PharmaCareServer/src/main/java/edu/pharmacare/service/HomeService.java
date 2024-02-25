package edu.pharmacare.service;

import java.util.List;

import edu.pharmacare.model.Appointment;
import edu.pharmacare.model.DietPlan;
import edu.pharmacare.model.NutritionData;
import edu.pharmacare.model.WellnessTip;

public interface HomeService {

	List<NutritionData> findAllNutritionDatas();

	NutritionData findByIdNutritionData(Integer id);

	List<DietPlan> findAllDietPlans();

	DietPlan findByIdDietPlan(Integer id);

	List<WellnessTip> findAllWellnessTips();

	WellnessTip findByIdWellnessTip(Integer id);

	List<Appointment> findAllAppointments();

	Appointment findByIdAppointments(Integer id);

	void loadPharmacyData();

	void loadNutritionData();
}
