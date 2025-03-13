package com.ecommerce.controller;

import com.ecommerce.DTO.OrderDTO;
import com.ecommerce.exception.GlobalExceptionHandler;
import com.ecommerce.model.*;
import com.ecommerce.service.*;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<OrderDTO> createOrder(@RequestHeader("Authorization") String jwt, @Valid @RequestBody Address address) throws GlobalExceptionHandler {
        User user = userService.findUserByJwt(jwt);
        Order order = orderService.placeOrder(address, user);
        OrderDTO orderDTO = new OrderDTO(order);
        return new ResponseEntity<>(orderDTO, HttpStatus.CREATED);
    }

    @GetMapping("/user")
    public ResponseEntity<List<OrderDTO>> userOrderHistory(@RequestHeader("Authorization") String jwt) throws GlobalExceptionHandler {
        User user = userService.findUserByJwt(jwt);
        List<Order> orders = orderService.userOrderHistory(user.getId());
        List<OrderDTO> orderDTOs = new ArrayList<>();
        for (Order order : orders) {
            orderDTOs.add(new OrderDTO(order));
        }
        return new ResponseEntity<>(orderDTOs, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> findOrderById(@PathVariable("id") Long orderId) throws GlobalExceptionHandler {
        Order order = orderService.findOrderById(orderId);
        return new ResponseEntity<>(order, HttpStatus.OK);
    }
}
