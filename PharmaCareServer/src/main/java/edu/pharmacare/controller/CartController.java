package edu.pharmacare.controller;

import java.io.IOException;
import java.security.Principal;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import edu.pharmacare.model.Cart;
import edu.pharmacare.request.CartRequest;
import edu.pharmacare.response.ApiResponse;
import edu.pharmacare.service.CartService;

@RestController
@CrossOrigin
@RequestMapping("/cart")
public class CartController {

	@Autowired
	private CartService cartService;

	@PostMapping("/addproduct")
	public ResponseEntity<Cart> addProduct(@RequestBody CartRequest request, Principal principal) {
		String userEmail = principal.getName();
		request.setUserEmail(userEmail);
		Cart cartDto = this.cartService.addProductToCart(request);
		return new ResponseEntity<>(cartDto, HttpStatusCode.valueOf(200));
	}

	@PostMapping("/uploadPrescription")
	public ResponseEntity<Cart> uploadPrescription(@RequestParam("file") MultipartFile file, Principal principal) {
		String userEmail = principal.getName();
		Cart cartDto = this.cartService.GetCart(userEmail);
		try {
			cartDto.setPhoto(file.getBytes());
			cartService.save(cartDto);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return new ResponseEntity<>(cartDto, HttpStatusCode.valueOf(200));
	}

	@GetMapping("/user")
	public ResponseEntity<Cart> GetCart(Principal principal) {
		String userEmail = principal.getName();
		Cart cartDto = this.cartService.GetCart(userEmail);
		return new ResponseEntity<>(cartDto, HttpStatusCode.valueOf(200));
	}

	@GetMapping("/{id}")
	public ResponseEntity<Cart> GetCart(@PathVariable Integer id, Principal principal) {
		String userEmail = principal.getName();
		Cart cartDto = this.cartService.GetCartById(id, userEmail);
		return new ResponseEntity<>(cartDto, HttpStatusCode.valueOf(200));
	}

	@DeleteMapping("/product/{productid}")
	public ResponseEntity<ApiResponse> DeleteItem(Principal principal, @PathVariable Integer productid) {
		String userEmail = principal.getName();
		this.cartService.RemoveById(productid, userEmail);
		return new ResponseEntity<>(new ApiResponse("remove"), HttpStatusCode.valueOf(200));
	}
}
