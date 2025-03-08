package com.ecommerce.service;

import com.ecommerce.exception.CartItemException;
import com.ecommerce.exception.UserException;
import com.ecommerce.model.*;

import java.util.List;

public interface CartItemService {
    public CartItem createCartItem(CartItem cartItem);
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws CartItemException, UserException;
    public void deleteAllCartItems(Long cartId, Long userId) throws CartItemException, UserException;
    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId) throws CartItemException;
    public CartItem findCartItemById(Long cartItemId) throws CartItemException;
}
