package edu.pharmacare.service;

import edu.pharmacare.request.RazorPayDetails;

public interface RazorPayService {

	public RazorPayDetails CreateOrder(Double amount);

}
