package edu.pharmacare.service;

import edu.pharmacare.request.SignUpRequest;
import edu.pharmacare.request.SigninRequest;
import edu.pharmacare.response.JwtAuthenticationResponse;

public interface AuthenticationService {
	JwtAuthenticationResponse signup(SignUpRequest request);

	JwtAuthenticationResponse signin(SigninRequest request);
}
