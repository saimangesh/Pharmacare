package edu.pharmacare.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class CartRequest {
    private String UserEmail;
    private int ProductId;
    private int Quantity;
}
