package edu.pharmacare.service;

import java.util.List;

import edu.pharmacare.model.Payment;
import edu.pharmacare.request.PaymentHelp;

public interface PaymentService {

	Payment createOrder(PaymentHelp cartHelp) throws Exception;

	List<Payment> findAll();

	Payment findById(Integer id);

	void save(Payment doctor);

	void saveAll(List<Payment> doctors);

	void updateStatus(Integer paymentId, String status);

	void deleteById(Integer id);

	List<Payment> findAllByUser(Integer id);

	List<Payment> findAllByDoctor(Integer id);

}
