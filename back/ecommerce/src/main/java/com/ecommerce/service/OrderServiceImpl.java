package com.ecommerce.service;

import com.ecommerce.exception.OrderException;
import com.ecommerce.model.Order;
import com.ecommerce.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderServiceImpl implements OrderService{

    private CartRepository cartRepository;
    private CartService cartItemService;
    private ProductService productService;

    public OrderServiceImpl(CartRepository cartRepository, CartService cartItemService, ProductService productService) {
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;
    }

    @Override
    public Order findOrderById(Long orderId) throws OrderException {
        return null;
    }

    @Override
    public List<Order> userOrderHistory(Long orderId) throws OrderException {
        return List.of();
    }

    @Override
    public Order placeOrder(Order order) throws OrderException {
        return null;
    }

    @Override
    public Order confirmedOrder(Long orderId) throws OrderException {
        return null;
    }

    @Override
    public Order shippedOrder(Long orderId) throws OrderException {
        return null;
    }

    @Override
    public Order deliveredOrder(Long orderId) throws OrderException {
        return null;
    }

    @Override
    public Order cancelOrder(Long orderId) throws OrderException {
        return null;
    }

    @Override
    public List<Order> getAllOrders() throws OrderException {
        return List.of();
    }

    @Override
    public void deleteOrder(Long orderId) throws OrderException {

    }
}
