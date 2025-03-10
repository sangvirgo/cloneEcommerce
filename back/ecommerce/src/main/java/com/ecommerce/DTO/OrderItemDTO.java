package com.ecommerce.DTO;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class OrderItemDTO {
    private Long id;
    private Long productId;
    private String productTitle;
    private String productImage;
    private int quantity;
    private String size;
    private int price;
    private int discountedPrice;
    private LocalDateTime deliveryDate;
} 