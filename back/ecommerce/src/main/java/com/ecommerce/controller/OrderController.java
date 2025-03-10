package com.ecommerce.controller;

import com.ecommerce.exception.GlobalExceptionHandler;
import com.ecommerce.model.*;
import com.ecommerce.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @PostMapping("/")
    public ResponseEntity<Order> createOrder(@RequestHeader("Authorization") String jwt, @RequestBody Address address) throws GlobalExceptionHandler {
        User user = userService.findUserProfileByJwt(jwt);
        Order order = orderService.createOrder(user.getId(), address);
        return new ResponseEntity<Order>(order, HttpStatus.CREATED);
    }

    @GetMapping("/user")
    public ResponseEntity<List<Order>> userOrderHistory(@RequestHeader("Authorization") String jwt) throws GlobalExceptionHandler {
        User user = userService.findUserProfileByJwt(jwt);
        List<Order> orders = orderService.userOrderHistory(user.getId());
        return new ResponseEntity<List<Order>>(orders, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> findOrderById(@PathVariable("id") Long orderId) throws GlobalExceptionHandler {
        Order order = orderService.findOrderById(orderId);
        return new ResponseEntity<Order>(order, HttpStatus.OK);
    }
}
