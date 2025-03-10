package com.ecommerce.service;

import com.ecommerce.exception.CartItemException;
import com.ecommerce.exception.GlobalExceptionHandler;
import com.ecommerce.exception.ProductException;
import com.ecommerce.model.Cart;
import com.ecommerce.model.CartItem;
import com.ecommerce.model.Product;
import com.ecommerce.model.User;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.request.AddItemRequest;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {

    private CartRepository cartRepository;
    private CartItemService cartItemService;
    private ProductService productService;

    public CartServiceImpl(CartRepository cartRepository, CartItemService cartItemService, ProductService productService) {
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;
    }

    @Override
    public Cart createCart(User user) {
        Cart cart = new Cart();
        cart.setUser(user);
        return cartRepository.save(cart);
    }

    @Override
    public String addCartItem(Long userId, AddItemRequest req) throws GlobalExceptionHandler {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            throw new GlobalExceptionHandler();
        }

        Product product = productService.findProductById(req.getProductId());
        
        // Kiểm tra số lượng trong kho
        if (product.getQuantity() < req.getQuantity()) {
            throw new GlobalExceptionHandler();
        }

        CartItem isPresent = cartItemService.isCartItemExist(cart, product, req.getSize().get(0).getName(), userId);
        
        if (isPresent == null) {
            CartItem cartItem = new CartItem();
            cartItem.setCart(cart);
            cartItem.setProduct(product);
            cartItem.setSize(req.getSize().get(0).getName());
            cartItem.setQuantity(req.getQuantity());
            
            // Tính giá có tính đến giảm giá
            int price = product.getPrice() * cartItem.getQuantity();
            int discountedPrice = product.getDiscountedPrice() * cartItem.getQuantity();
            
            cartItem.setPrice(price);
            cartItem.setDiscountedPrice(discountedPrice);
            
            CartItem savedItem = cartItemService.createCartItem(cartItem);
            cart.getCartItems().add(savedItem);
            cartRepository.save(cart);
        } else {
            // Cập nhật số lượng nếu item đã tồn tại
            int newQuantity = isPresent.getQuantity() + req.getQuantity();
            if (product.getQuantity() < newQuantity) {
                throw new GlobalExceptionHandler();
            }
            isPresent.setQuantity(newQuantity);
            isPresent.setPrice(product.getPrice() * newQuantity);
            isPresent.setDiscountedPrice(product.getDiscountedPrice() * newQuantity);
            cartItemService.createCartItem(isPresent);
        }

        return "Item added to cart successfully";
    }

    @Override
    public Cart findUserCart(Long userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) {
            return null;
        }

        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int totalItems = 0;

        for (CartItem cartItem : cart.getCartItems()) {
            totalPrice += cartItem.getPrice();
            totalDiscountedPrice += cartItem.getDiscountedPrice();
            totalItems += cartItem.getQuantity();
        }

        cart.setTotalPrice(totalPrice);
        cart.setTotalDiscountedPrice(totalDiscountedPrice);
        cart.setTotalItems(totalItems);
        cart.setTotal(totalPrice - totalDiscountedPrice);

        return cartRepository.save(cart);
    }
}
