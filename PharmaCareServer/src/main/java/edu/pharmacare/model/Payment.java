package edu.pharmacare.model;

import java.time.LocalDateTime;

import edu.pharmacare.model.constants.OrderStatus;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Payment {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer Id;

	private Double amount;

	private String currency;

	@Enumerated(EnumType.STRING)
	@Column(name = "status")
	private OrderStatus status;

	@OneToOne
	@JoinColumn(name = "cart_id")
	private Cart cart;

	@Column(name = "created_at", updatable = false)
	private LocalDateTime createdTime;

	@Column(name = "updated_at")
	private LocalDateTime updatedTime;
}
