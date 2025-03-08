package com.ecommerce.service;

import com.ecommerce.exception.OrderException;
import com.ecommerce.model.Order;

import java.util.List;

public interface OrderService {
    public Order findOrderById(Long orderId) throws OrderException;
    public List<Order> userOrderHistory(Long orderId) throws OrderException;
    public Order placeOrder(Order order) throws OrderException;
    public Order confirmedOrder(Long orderId) throws OrderException;
    public Order shippedOrder(Long orderId) throws OrderException;
    public Order deliveredOrder(Long orderId) throws OrderException;
    public Order cancelOrder(Long orderId) throws OrderException;
    public List<Order> getAllOrders() throws OrderException;
    public void deleteOrder(Long orderId) throws OrderException;

}
