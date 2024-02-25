package edu.pharmacare.servie.impl;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;

import edu.pharmacare.request.RazorPayDetails;
import edu.pharmacare.service.RazorPayService;

@Service
public class RazorPayServiceImpl implements RazorPayService {

	@Value("${razorpay.key_id}")
	private String KEY;

	@Value("${razorpay.key_secret}")
	private String SECRET_KEY;

	private final String CURRENCY = "INR";

	@Override
	public RazorPayDetails CreateOrder(Double amount) {
		try {
			JSONObject jsonObject = new JSONObject();
			jsonObject.put("amount", amount * 100.0);
			jsonObject.put("currency", CURRENCY);
			System.out.println(jsonObject);

			RazorpayClient razorpayClient = new RazorpayClient(KEY, SECRET_KEY);

			Order order = razorpayClient.orders.create(jsonObject);

			return prepatreTransaction(order);

		} catch (Exception e) {
			System.out.println(e);
		}
		return null;
	}

	private RazorPayDetails prepatreTransaction(Order order) {
		String orderId = order.get("id");
		Integer amount = order.get("amount");
		String currency = order.get("currency");

		RazorPayDetails paymentDetails = new RazorPayDetails(orderId, amount, currency, KEY);
		return paymentDetails;
	}
}
