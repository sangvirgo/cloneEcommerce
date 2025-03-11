package com.ecommerce.DTO;

import com.ecommerce.model.Order;
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

    public OrderDTO(Order order) {
        this.id = order.getId();
        this.status = order.getStatus();
        this.totalAmount = order.getTotalAmount();
        this.totalDiscountedPrice = order.getTotalDiscountedPrice();
        this.totalItems = order.getTotalItems();
        this.orderDate = order.getOrderDate();
        this.deliveryDate = order.getDeliveryDate();
        this.shippingAddress = new AddressDTO(order.getShippingAddress());
    }
}
