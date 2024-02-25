package edu.pharmacare.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.pharmacare.model.Medicine;
import edu.pharmacare.request.MedicineRequest;
import edu.pharmacare.request.MedicineUpdateRequest;
import edu.pharmacare.service.MedicineService;

@RestController
@CrossOrigin
@RequestMapping("/medicine")
public class MedicineController {

	@Autowired
	private MedicineService medicineService;

	@GetMapping("/all")
	public ResponseEntity<List<Medicine>> medicines() {
		return ResponseEntity.ok(medicineService.findAll());
	}

	@GetMapping("/{id}")
	public ResponseEntity<Medicine> medicinesById(@PathVariable Integer id) {
		return ResponseEntity.ok(medicineService.findById(id));
	}

	@PostMapping("/create")
	public ResponseEntity<Medicine> createMedicine(@RequestBody MedicineRequest request, Principal principal)
			throws Exception {
		Medicine medicine = new Medicine();
		medicine.setCreatedTime(LocalDateTime.now());
		medicine.setUpdatedTime(LocalDateTime.now());
		medicineService.save(medicine);
		return new ResponseEntity<>(medicine, HttpStatusCode.valueOf(200));
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Map> deleteMedicine(@PathVariable Integer id, Principal principal) throws Exception {
		this.medicineService.deleteById(id);
		Map<String, Object> response = new HashMap<>();
		response.put("message", "Medicine Deleted Successfully");
		return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
	}

	@PostMapping("/update")
	public ResponseEntity<Medicine> updateMedicine(@RequestBody MedicineUpdateRequest request, Principal principal)
			throws Exception {
		Integer id = request.getId();
		Medicine medicine = medicineService.findById(id);
		medicine.setPrice(request.getPrice());
		medicine.setUpdatedTime(LocalDateTime.now());
		medicineService.save(medicine);
		return new ResponseEntity<>(medicine, HttpStatusCode.valueOf(200));
	}

}
