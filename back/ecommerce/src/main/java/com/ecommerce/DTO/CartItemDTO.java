package com.ecommerce.DTO;

import lombok.Data;

@Data
public class CartItemDTO {
    private Long id;
    private ProductDTO product;
    private String size;
    private int quantity;
    private int price;
    private int discountedPrice;
}