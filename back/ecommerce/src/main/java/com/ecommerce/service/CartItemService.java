package com.ecommerce.service;

import com.ecommerce.exception.CartItemException;
import com.ecommerce.exception.GlobalExceptionHandler;
import com.ecommerce.exception.UserException;
import com.ecommerce.model.*;

import java.util.List;

public interface CartItemService {
    public CartItem createCartItem(CartItem cartItem);
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws GlobalExceptionHandler;
    public void deleteAllCartItems(Long cartId, Long userId) throws GlobalExceptionHandler;
    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId) throws GlobalExceptionHandler;
    public CartItem findCartItemById(Long cartItemId) throws GlobalExceptionHandler;
    CartItem addCartItem(CartItem cartItem) throws CartItemException;
    CartItem updateCartItem(Long cartItemId, CartItem cartItem) throws CartItemException;
    void deleteCartItem(Long cartItemId) throws CartItemException;
    CartItem getCartItemById(Long cartItemId) throws CartItemException;
    boolean isCartItemExist(Long cartId, Long productId, String size) throws CartItemException;
}
