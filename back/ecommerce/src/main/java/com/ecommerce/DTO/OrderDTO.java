package com.ecommerce.DTO;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class OrderDTO {
    private Long id;
    private String status;
    private int totalAmount;
    private int totalDiscountedPrice;
    private int totalItems;
    private LocalDateTime orderDate;
    private LocalDateTime deliveryDate;
    private List<OrderItemDTO> orderItems;
    private AddressDTO shippingAddress;
}
