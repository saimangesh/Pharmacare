package edu.pharmacare.service;

import java.util.List;

import edu.pharmacare.model.Medicine;
import edu.pharmacare.request.MedicineRequest;
import edu.pharmacare.response.JwtAuthenticationResponse;

public interface MedicineService {
	JwtAuthenticationResponse signup(MedicineRequest request);

	List<Medicine> findAll();

	Medicine findById(Integer id);

	void save(Medicine medicine);

	void saveAll(List<Medicine> medicines);

	void deleteById(Integer id);
}
