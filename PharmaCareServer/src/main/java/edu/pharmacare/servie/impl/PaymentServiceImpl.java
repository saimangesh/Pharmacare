package edu.pharmacare.servie.impl;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.pharmacare.model.Cart;
import edu.pharmacare.model.Payment;
import edu.pharmacare.model.User;
import edu.pharmacare.model.constants.OrderStatus;
import edu.pharmacare.repository.CartRepository;
import edu.pharmacare.repository.PaymentRepository;
import edu.pharmacare.repository.UserRepository;
import edu.pharmacare.request.PaymentHelp;
import edu.pharmacare.service.PaymentService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {
	@Autowired
	private final PaymentRepository paymentRepository;

	@Autowired
	private final UserRepository userRepository;

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private UserRepository userRepo;

	@Override
	public List<Payment> findAll() {
		return paymentRepository.findAll();
	}

	@Override
	public List<Payment> findAllByUser(Integer id) {
		return paymentRepository.findAllByUser(id);
	}

	@Override
	public List<Payment> findAllByDoctor(Integer id) {
		return paymentRepository.findAllByDoctor(id);
	}

	@Override
	public void save(Payment payment) {
		paymentRepository.save(payment);
	}

	@Override
	public void saveAll(List<Payment> payments) {
		paymentRepository.saveAll(payments);
	}

	@Override
	public Payment findById(Integer id) {
		Optional<Payment> optional = paymentRepository.findById(id);
		if (optional.isPresent()) {
			return optional.get();
		}
		return null;
	}

	@Override
	public Payment createOrder(PaymentHelp cartHelp) throws Exception {
		User user = this.userRepo.findByEmail(cartHelp.getUserEmail());
		Cart cart = this.cartRepository.findByUserCurrentCart(user.getId());
		if (cart.getPhoto() == null) {
			throw new Exception("Please upload prescription !!!");
		}
		cart.setActive(false);

		Payment payment = new Payment();
		payment.setAmount(cartHelp.getAmount());
		payment.setStatus(OrderStatus.ORDERED);
		payment.setCurrency("USD");
		payment.setCart(cart);
		payment.setCreatedTime(LocalDateTime.now());
		payment.setUpdatedTime(LocalDateTime.now());

		paymentRepository.save(payment);
		return payment;
	}

	@Override
	public void updateStatus(Integer paymentId, String status) {
		paymentRepository.updateStatus(paymentId, status);
	}

	@Override
	public void deleteById(Integer id) {
		paymentRepository.deleteById(id);
	}

}
