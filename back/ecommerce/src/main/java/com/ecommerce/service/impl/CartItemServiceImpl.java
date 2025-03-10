package com.ecommerce.service.impl;

import com.ecommerce.exception.CartItemException;
import com.ecommerce.exception.GlobalExceptionHandler;
import com.ecommerce.model.Cart;
import com.ecommerce.model.CartItem;
import com.ecommerce.model.Product;
import com.ecommerce.repository.CartItemRepository;
import com.ecommerce.service.CartItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CartItemServiceImpl implements CartItemService {

    @Autowired
    private CartItemRepository cartItemRepository;

    @Override
    public CartItem addCartItem(CartItem cartItem) throws CartItemException {
        try {
            return cartItemRepository.save(cartItem);
        } catch (Exception e) {
            throw new CartItemException("Error adding cart item: " + e.getMessage(), "CART_ITEM_ADD_ERROR");
        }
    }

    @Override
    public CartItem updateCartItem(Long cartItemId, CartItem cartItem) throws CartItemException {
        CartItem existingItem = getCartItemById(cartItemId);
        try {
            cartItem.setId(cartItemId);
            return cartItemRepository.save(cartItem);
        } catch (Exception e) {
            throw new CartItemException("Error updating cart item: " + e.getMessage(), "CART_ITEM_UPDATE_ERROR");
        }
    }

    @Override
    public void deleteCartItem(Long cartItemId) throws CartItemException {
        try {
            cartItemRepository.deleteById(cartItemId);
        } catch (Exception e) {
            throw new CartItemException("Error deleting cart item: " + e.getMessage(), "CART_ITEM_DELETE_ERROR");
        }
    }

    @Override
    public CartItem getCartItemById(Long cartItemId) throws CartItemException {
        return cartItemRepository.findById(cartItemId)
                .orElseThrow(() -> new CartItemException("Cart item not found with id: " + cartItemId, "CART_ITEM_NOT_FOUND"));
    }

    @Override
    public boolean isCartItemExist(Long cartId, Long productId, String size) throws CartItemException {
        return cartItemRepository.existsByCartIdAndProductIdAndSize(cartId, productId, size);
    }

    @Override
    public CartItem createCartItem(CartItem cartItem) {
        return cartItemRepository.save(cartItem);
    }

    @Override
    public CartItem updateCartItem(Long userId, Long id, CartItem cartItem) throws GlobalExceptionHandler {
        try {
            CartItem existingItem = getCartItemById(id);
            cartItem.setId(id);
            return cartItemRepository.save(cartItem);
        } catch (CartItemException e) {
            throw new GlobalExceptionHandler(e.getMessage(), e.getCode());
        } catch (Exception e) {
            throw new GlobalExceptionHandler("Error updating cart item: " + e.getMessage());
        }
    }

    @Override
    public void deleteAllCartItems(Long cartId, Long userId) throws GlobalExceptionHandler {
        try {
            cartItemRepository.deleteByCartId(cartId);
        } catch (Exception e) {
            throw new GlobalExceptionHandler("Error deleting all cart items: " + e.getMessage());
        }
    }

    @Override
    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId) throws GlobalExceptionHandler {
        try {
            return cartItemRepository.isCartItemExist(cart, product, size, userId);
        } catch (Exception e) {
            throw new GlobalExceptionHandler("Error checking cart item existence: " + e.getMessage());
        }
    }

    @Override
    public CartItem findCartItemById(Long cartItemId) throws GlobalExceptionHandler {
        try {
            return getCartItemById(cartItemId);
        } catch (CartItemException e) {
            throw new GlobalExceptionHandler(e.getMessage(), e.getCode());
        }
    }
} 