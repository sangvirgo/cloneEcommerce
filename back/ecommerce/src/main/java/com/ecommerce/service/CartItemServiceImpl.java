package com.ecommerce.service;

import com.ecommerce.exception.CartItemException;
import com.ecommerce.exception.GlobalExceptionHandler;
import com.ecommerce.exception.UserException;
import com.ecommerce.model.*;
import com.ecommerce.repository.CartItemRepository;
import com.ecommerce.repository.CartRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CartItemServiceImpl implements CartItemService {
    private CartItemRepository cartItemRepository;
    private UserService userService;
    private CartRepository cartRepository;

    public CartItemServiceImpl(CartItemRepository cartItemRepository, UserService userService, CartRepository cartRepository) {
        this.cartItemRepository = cartItemRepository;
        this.userService = userService;
        this.cartRepository = cartRepository;
    }

    @Override
    public CartItem createCartItem(CartItem cartItem) {
        // Kiểm tra số lượng
        if (cartItem.getQuantity() <= 0) {
            cartItem.setQuantity(1);
        }

        // Tính toán giá
        int price = cartItem.getProduct().getPrice() * cartItem.getQuantity();
        int discountedPrice = cartItem.getProduct().getDiscountedPrice() * cartItem.getQuantity();

        cartItem.setPrice(price);
        cartItem.setDiscountedPrice(discountedPrice);

        return cartItemRepository.save(cartItem);
    }

    @Override
    public CartItem updateCartItem(Long userId, Long cartItemId, CartItem cartItem) throws GlobalExceptionHandler {
        CartItem item = findCartItemById(cartItemId);
        User user = userService.findUserById(userId);

        if (item == null) {
            throw new GlobalExceptionHandler();
        }

        if (user == null) {
            throw new GlobalExceptionHandler();
        }

        // Kiểm tra quyền sở hữu
        if (!item.getUser().getId().equals(userId)) {
            throw new GlobalExceptionHandler();
        }

        // Cập nhật số lượng và giá
        item.setQuantity(cartItem.getQuantity());
        item.setPrice(item.getProduct().getPrice() * cartItem.getQuantity());
        item.setDiscountedPrice(item.getProduct().getDiscountedPrice() * cartItem.getQuantity());

        return cartItemRepository.save(item);
    }

    @Override
    public void deleteAllCartItems(Long cartId, Long userId) throws GlobalExceptionHandler {
        CartItem item = findCartItemById(cartId);
        User user = userService.findUserById(userId);

        if (item == null) {
            throw new GlobalExceptionHandler("Cart item not found with id: " + cartId);
        }

        if (user == null) {
            throw new GlobalExceptionHandler("User not found with id: " + userId);
        }

        if (!item.getUser().getId().equals(userId)) {
            throw new GlobalExceptionHandler("User not found with id: " + userId);
        }

        cartItemRepository.deleteById(cartId);
    }

    @Override
    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId) throws GlobalExceptionHandler {
        return cartItemRepository.isCartItemExist(cart, product, size, userId);
    }

    @Override
    public CartItem findCartItemById(Long cartItemId) throws GlobalExceptionHandler {
        Optional<CartItem> opt = cartItemRepository.findById(cartItemId);
        if (opt.isPresent()) {
            return opt.get();
        }
        throw new GlobalExceptionHandler("Cart item not found with id: " + cartItemId);
    }
}
