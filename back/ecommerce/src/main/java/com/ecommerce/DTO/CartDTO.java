package com.ecommerce.DTO;

import com.ecommerce.model.Cart;
import lombok.Data;

@Data
public class CartDTO {
    private Long id;
    private int totalPrice;
    private Integer totalItems;
    private Integer totalDiscountedPrice;
    private int total;

    public CartDTO(Cart cart) {
        this.id = cart.getId();
        this.totalPrice = cart.getTotalPrice();
        this.totalItems = cart.getTotalItems();
        this.totalDiscountedPrice = cart.getTotalDiscountedPrice();
        this.total = cart.getTotal();
    }
}
