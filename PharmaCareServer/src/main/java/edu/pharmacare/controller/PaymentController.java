package edu.pharmacare.controller;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.lang3.StringUtils;
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

import edu.pharmacare.model.Payment;
import edu.pharmacare.model.User;
import edu.pharmacare.model.constants.OrderStatus;
import edu.pharmacare.model.constants.UserRole;
import edu.pharmacare.request.PaymentHelp;
import edu.pharmacare.request.PaymentRequest;
import edu.pharmacare.service.PaymentService;
import edu.pharmacare.service.UserService;

@RestController
@CrossOrigin
@RequestMapping("/payment")
public class PaymentController {

	@Autowired
	private PaymentService paymentService;

	@Autowired
	private UserService userService;

	@GetMapping("/all")
	public ResponseEntity<List<Payment>> payments(Principal principal) {
		List<Payment> list = new ArrayList<>();
		String userEmail = principal.getName();
		if (StringUtils.isNotBlank(userEmail)) {
			User user = userService.findByEmail(userEmail);
			if (user != null) {
				Integer id = user.getId();
				UserRole userRole = user.getRole();
				if (userRole == null) {
					userRole = UserRole.USER;
				}
				if (UserRole.ADMIN.equals(userRole)) {
					list = paymentService.findAll();
				} else if (UserRole.DOCTOR.equals(userRole)) {
					list = paymentService.findAllByDoctor(id);
				} else if (UserRole.USER.equals(userRole)) {
					list = paymentService.findAllByUser(id);
				}
			}
		}
		return ResponseEntity.ok(list);
	}

	@GetMapping("/{id}")
	public ResponseEntity<Payment> paymentsById(@PathVariable Integer id) {
		return ResponseEntity.ok(paymentService.findById(id));
	}

	@PostMapping("/create")
	public ResponseEntity<Payment> createOrder(@RequestBody PaymentHelp request, Principal principal) throws Exception {
		String userEmail = principal.getName();
		request.setUserEmail(userEmail);
		Payment payment = this.paymentService.createOrder(request);
		return new ResponseEntity<>(payment, HttpStatusCode.valueOf(200));
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<Map> deleteOrder(@PathVariable Integer id, Principal principal) throws Exception {
		this.paymentService.deleteById(id);
		Map<String, Object> response = new HashMap<>();
		response.put("message", "Payment Deleted Successfully");
		return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
	}

	@PostMapping("/update")
	public ResponseEntity<Payment> updateOrder(@RequestBody PaymentRequest request, Principal principal)
			throws Exception {
		Integer id = request.getId();
		Payment payment = paymentService.findById(id);
		payment.setStatus(OrderStatus.valueOf(request.getStatus()));
		payment.setUpdatedTime(LocalDateTime.now());
		paymentService.save(payment);
		return new ResponseEntity<>(payment, HttpStatusCode.valueOf(200));
	}
}
