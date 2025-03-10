package com.ecommerce.controller;

import com.ecommerce.exception.GlobalExceptionHandler;
import com.ecommerce.model.Cart;
import com.ecommerce.model.User;
import com.ecommerce.request.AddItemRequest;
import com.ecommerce.response.ApiResponse;
import com.ecommerce.service.CartService;
import com.ecommerce.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {
    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt) throws GlobalExceptionHandler {
        User user = userService.findUserProfileByJwt(jwt);
        Cart cart = cartService.findUserCart(user.getId());
        return new ResponseEntity<Cart>(cart, HttpStatus.OK);
    }

    @PutMapping("/add")
    public ResponseEntity<ApiResponse> addItemToCart(@RequestHeader("Authorization") String jwt, @RequestBody AddItemRequest addItemRequest) throws GlobalExceptionHandler {
        User user=userService.findUserProfileByJwt(jwt);
        cartService.addCartItem(user.getId(), addItemRequest);

        ApiResponse res=new ApiResponse();
        res.setMessage("Item added to cart successfully");
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    

}
