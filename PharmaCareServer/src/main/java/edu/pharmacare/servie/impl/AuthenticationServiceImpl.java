package edu.pharmacare.servie.impl;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import edu.pharmacare.model.User;
import edu.pharmacare.model.constants.UserRole;
import edu.pharmacare.repository.UserRepository;
import edu.pharmacare.request.SignUpRequest;
import edu.pharmacare.request.SigninRequest;
import edu.pharmacare.response.JwtAuthenticationResponse;
import edu.pharmacare.service.AuthenticationService;
import edu.pharmacare.service.JwtService;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthenticationServiceImpl implements AuthenticationService {
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final JwtService jwtService;
	private final AuthenticationManager authenticationManager;

	@Override
	public JwtAuthenticationResponse signup(SignUpRequest request) {
		var user = User.builder().name(request.getName()).userName(request.getUserName()).email(request.getEmail())
				.password(passwordEncoder.encode(request.getPassword())).mobile(request.getMobile())
				.billingAddress(request.getBillingAddress()).shippingAddress(request.getShippingAddress())
				.dateOfBirth(request.getDateOfBirth()).medicalHistory(request.getMedicalHistory())
				.allergies(request.getAllergies()).role(UserRole.USER).build();
		userRepository.save(user);
		var jwt = jwtService.generateToken(user);
		return JwtAuthenticationResponse.builder().user(user).token(jwt).build();
	}

	@Override
	public JwtAuthenticationResponse signin(SigninRequest request) {
		authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		var user = userRepository.findByEmail(request.getEmail());
		var jwt = jwtService.generateToken(user);
		return JwtAuthenticationResponse.builder().user(user).token(jwt).build();
	}
}
