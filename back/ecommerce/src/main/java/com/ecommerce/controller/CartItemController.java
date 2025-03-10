package com.ecommerce.controller;

import com.ecommerce.exception.CartItemException;
import com.ecommerce.model.CartItem;
import com.ecommerce.service.CartItemService;
import com.ecommerce.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart-item")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private UserService userService;

    @PostMapping("/add")
    public ResponseEntity<CartItem> addCartItem(@RequestHeader("Authorization") String jwt,
            @RequestBody @Valid CartItem cartItem) throws CartItemException {
        CartItem item = cartItemService.addCartItem(cartItem);
        return new ResponseEntity<>(item, HttpStatus.CREATED);
    }

    @PutMapping("/{cartItemId}/update")
    public ResponseEntity<CartItem> updateCartItem(@PathVariable Long cartItemId,
            @RequestBody @Valid CartItem cartItem) throws CartItemException {
        CartItem item = cartItemService.updateCartItem(cartItemId, cartItem);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }

    @DeleteMapping("/{cartItemId}/delete")
    public ResponseEntity<Void> deleteCartItem(@PathVariable Long cartItemId) throws CartItemException {
        cartItemService.deleteCartItem(cartItemId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/{cartItemId}")
    public ResponseEntity<CartItem> getCartItemById(@PathVariable Long cartItemId) throws CartItemException {
        CartItem item = cartItemService.getCartItemById(cartItemId);
        return new ResponseEntity<>(item, HttpStatus.OK);
    }
}
