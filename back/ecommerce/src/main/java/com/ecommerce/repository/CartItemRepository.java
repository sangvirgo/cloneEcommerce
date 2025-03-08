package com.ecommerce.repository;

import com.ecommerce.model.Cart;
import com.ecommerce.model.CartItem;
import com.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
    @Query("SELECT c FROM CartItem c WHERE c.cart.id = :cart AND c.user.id = :userId AND c.product.id = :product AND c.sizes = :sizes")
    public CartItem isCartItemExist(@Param("cart") Cart cart, @Param("product") Product product, @Param("sizes") String sizes, @Param("userId") Long userId);

    public void deleteCartItemById(Long id);
}
