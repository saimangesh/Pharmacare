package edu.pharmacare.servie.impl;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.zip.DataFormatException;
import java.util.zip.Inflater;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import edu.pharmacare.model.Cart;
import edu.pharmacare.model.CartDetails;
import edu.pharmacare.model.Medicine;
import edu.pharmacare.model.User;
import edu.pharmacare.repository.CartDetailsRepository;
import edu.pharmacare.repository.CartRepository;
import edu.pharmacare.repository.MedicineRepository;
import edu.pharmacare.repository.UserRepository;
import edu.pharmacare.request.CartRequest;
import edu.pharmacare.service.CartService;

@Service
public class CartServiceImpl implements CartService {

	@Autowired
	private MedicineRepository medicineRepository;

	@Autowired
	private CartRepository cartRepository;

	@Autowired
	private UserRepository userRepo;

	@Autowired
	private CartDetailsRepository cartDetailsRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Cart CreateCart(CartRequest cartRequest) {
		return null;
	}

	@Override
	public Cart save(Cart cart) {
		cartRepository.save(cart);

		return cart;
	}

	@Override
	public Cart addProductToCart(CartRequest cartRequest) {
		int productId = cartRequest.getProductId();
		int quantity = cartRequest.getQuantity();
		String userEmail = cartRequest.getUserEmail();

		User user = this.userRepo.findByEmail(userEmail);
		Medicine product = this.medicineRepository.findById(productId).orElseThrow();
		Cart cart = this.cartRepository.findByUserCurrentCart(user.getId());

		// create a cart
		if (cart == null) {
			cart = new Cart();
			cart.setTotalAmount(0d);
			cart.setCount(0);
			cart.setUser(user);
			cart.setActive(true);
		}

		List<CartDetails> list = new ArrayList<>();
		if (cart.getId() != null && cart.getId() > 0) {
			list = cartDetailsRepository.findAllByCart(cart);
		}

		double amount = product.getPrice() * quantity;
		boolean exists = false;
		for (CartDetails details : list) {
			if (details.getProducts().getId().equals(productId)) {
				details.setQuantity(quantity);
				details.setAmount(amount);
				exists = true;
			}
			details.setCart(cart);
		}

		if (!exists) {
			CartDetails details = new CartDetails();
			details.setProducts(product);
			details.setQuantity(quantity);
			details.setAmount(amount);
			details.setCart(cart);
			list.add(details);
		}

		double totalAmount = list.stream().mapToDouble(x -> x.getAmount()).sum();
		cart.setTotalAmount(totalAmount);
		cart.setCartDetalis(list);
		cart.setCount(list.size());
		cart.setCreatedTime(LocalDateTime.now());
		cart.setUpdatedTime(LocalDateTime.now());

		cartRepository.save(cart);

		return cart;
	}

	@Override
	public Cart GetCart(String userEmail) {
		User user = this.userRepo.findByEmail(userEmail);
		Cart cart = this.cartRepository.findByUserCurrentCart(user.getId());
		return cart;
	}

	@Override
	public void RemoveById(Integer ProductId, String userEmail) {
		User user = this.userRepo.findByEmail(userEmail);

		Medicine product = this.medicineRepository.findById(ProductId).orElseThrow();
		Cart cart = this.cartRepository.findByUserCurrentCart(user.getId());

		CartDetails byProductsAndCart = this.cartDetailsRepository.findByProductsAndCart(product, cart);
		double amount = byProductsAndCart.getAmount();
		cart.setTotalAmount(cart.getTotalAmount() - amount);
		cart.setCount(cart.getCount() - 1);
		this.cartRepository.save(cart);

		this.cartDetailsRepository.delete(byProductsAndCart);
	}

	public int totalP(int t1, int total) {
		return total + t1;
	}

	public static byte[] decompressBytes(byte[] data) {
		Inflater inflater = new Inflater();
		inflater.setInput(data);
		ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
		byte[] buffer = new byte[1024];
		try {
			while (!inflater.finished()) {
				int count = inflater.inflate(buffer);
				outputStream.write(buffer, 0, count);
			}
			outputStream.close();
		} catch (IOException ioe) {
		} catch (DataFormatException e) {
		}
		return outputStream.toByteArray();
	}

	@Override
	public Cart GetCartById(Integer cartId, String userEmail) {
		User user = this.userRepo.findByEmail(userEmail);
		Cart cart = null;
		Optional<Cart> optional = this.cartRepository.findById(cartId);
		if (optional.isPresent()) {
			cart = optional.get();
		}
		return cart;
	}
}
