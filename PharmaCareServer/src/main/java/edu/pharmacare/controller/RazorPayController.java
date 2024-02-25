package edu.pharmacare.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import edu.pharmacare.request.RazorPayDetails;
import edu.pharmacare.service.RazorPayService;

@CrossOrigin
@RestController
@RequestMapping("/razorPay")
public class RazorPayController {

	@Autowired
	private RazorPayService razorPayService;

	@GetMapping("/{amount}")
	public ResponseEntity<RazorPayDetails> CreatePayment(@PathVariable Double amount) {
		RazorPayDetails razorPayDetails = this.razorPayService.CreateOrder(amount);
		return new ResponseEntity<>(razorPayDetails, HttpStatusCode.valueOf(200));
	}

}
