package edu.pharmacare.servie.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import edu.pharmacare.model.Medicine;
import edu.pharmacare.repository.MedicineRepository;
import edu.pharmacare.repository.UserRepository;
import edu.pharmacare.request.MedicineRequest;
import edu.pharmacare.response.JwtAuthenticationResponse;
import edu.pharmacare.service.JwtService;
import edu.pharmacare.service.MedicineService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MedicineServiceImpl implements MedicineService {
	private final MedicineRepository medicineRepository;
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	@Override
	public JwtAuthenticationResponse signup(MedicineRequest request) {
		var medicine = Medicine.builder().name(request.getName()).description(request.getDescription())
				.keyIngredients(request.getKeyIngredients()).uses(request.getUses())
				.directionOfUse(request.getDirectionOfUse()).price(request.getPrice())
				.sideEffects(request.getSideEffects()).diseaseCategory(request.getDiseaseCategory()).build();

		medicineRepository.save(medicine);
		var jwt = "medicine registration successful";
		return JwtAuthenticationResponse.builder().token(jwt).build();
	}

	@Override
	public List<Medicine> findAll() {
		return medicineRepository.findAll();
	}

	@Override
	public void save(Medicine medicine) {
		medicineRepository.save(medicine);
	}

	@Override
	public void saveAll(List<Medicine> medicines) {
		medicineRepository.saveAll(medicines);
	}

	public Medicine findById(Integer id) {
		Optional<Medicine> optional = medicineRepository.findById(id);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	@Override
	public void deleteById(Integer id) {
		medicineRepository.deleteById(id);
	}
}
