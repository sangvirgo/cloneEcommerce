package com.ecommerce.service;

import com.ecommerce.enums.OrderStatus;
import com.ecommerce.enums.PaymentStatus;
import com.ecommerce.exception.GlobalExceptionHandler;
import com.ecommerce.model.*;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.OrderRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    private CartRepository cartRepository;
    private CartService cartService;
    private ProductService productService;
    private OrderRepository orderRepository;

    public OrderServiceImpl(CartRepository cartRepository, CartService cartService, 
                          ProductService productService, OrderRepository orderRepository) {
        this.cartRepository = cartRepository;
        this.cartService = cartService;
        this.productService = productService;
        this.orderRepository = orderRepository;
    }

    @Override
    public Order findOrderById(Long orderId) throws GlobalExceptionHandler {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new GlobalExceptionHandler("Không tìm thấy đơn hàng với ID: " + orderId, "ORDER_ERROR"));
    }

    @Override
    public List<Order> userOrderHistory(Long userId) throws GlobalExceptionHandler {
        List<Order> orders = orderRepository.findByUserId(userId);
        if (orders.isEmpty()) {
            throw new GlobalExceptionHandler("Không tìm thấy lịch sử đơn hàng cho người dùng: " + userId, "ORDER_ERROR");
        }
        return orders;
    }

    @Override
    @Transactional
    public Order placeOrder(Address address, User user) throws GlobalExceptionHandler {
        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart == null || cart.getCartItems().isEmpty()) {
            throw new GlobalExceptionHandler("Giỏ hàng trống", "ORDER_ERROR");
        }

        // Tính toán lại tổng giá trị giỏ hàng
        cart = cartService.findUserCart(user.getId());

        Order order = new Order();
        order.setUser(user);
        order.setOrderDate(LocalDateTime.now());

        // Thiết lập user cho address trước khi gán vào order
        address.setUser(user); // Thêm dòng này
        order.setShippingAddress(address);

        order.setOrderStatus(OrderStatus.PENDING);
        order.setTotalAmount(cart.getTotalAmount());
        order.setTotalItems(cart.getTotalItems());
        order.setPaymentStatus(PaymentStatus.PENDING);
        order.setDiscount(cart.getDiscount());

        // Cập nhật số lượng sản phẩm
        for (CartItem item : cart.getCartItems()) {
            Product product = item.getProduct();
            if (product.getQuantity() < item.getQuantity()) {
                throw new GlobalExceptionHandler("Sản phẩm " + product.getTitle() + " không đủ số lượng trong kho", "ORDER_ERROR");
            }
            product.setQuantity(product.getQuantity() - item.getQuantity());
            productService.updateProduct(product.getId(), product);
        }

        // Xóa giỏ hàng
        cart.getCartItems().clear();
        cartRepository.save(cart);

        return orderRepository.save(order);
    }

    @Override
    public Order confirmedOrder(Long orderId) throws GlobalExceptionHandler {
        Order order = findOrderById(orderId);
        if (order.getOrderStatus() != OrderStatus.PENDING) {
            throw new GlobalExceptionHandler("Đơn hàng không thể xác nhận ở trạng thái hiện tại", "ORDER_ERROR");
        }
        order.setOrderStatus(OrderStatus.CONFIRMED);
        return orderRepository.save(order);
    }

    @Override
    public Order shippedOrder(Long orderId) throws GlobalExceptionHandler {
        Order order = findOrderById(orderId);
        if (order.getOrderStatus() != OrderStatus.CONFIRMED) {
            throw new GlobalExceptionHandler("Đơn hàng phải được xác nhận trước khi gửi", "ORDER_ERROR");
        }
        order.setOrderStatus(OrderStatus.SHIPPED);
        return orderRepository.save(order);
    }

    @Override
    public Order deliveredOrder(Long orderId) throws GlobalExceptionHandler {
        Order order = findOrderById(orderId);
        if (order.getOrderStatus() != OrderStatus.SHIPPED) {
            throw new GlobalExceptionHandler("Đơn hàng phải được gửi trước khi giao", "ORDER_ERROR");
        }
        order.setOrderStatus(OrderStatus.DELIVERED);
        order.setPaymentStatus(PaymentStatus.COMPLETED);
        return orderRepository.save(order);
    }

    @Override
    public Order cancelOrder(Long orderId) throws GlobalExceptionHandler {
        Order order = findOrderById(orderId);
        if (order.getOrderStatus() == OrderStatus.DELIVERED) {
            throw new GlobalExceptionHandler("Không thể hủy đơn hàng đã giao", "ORDER_ERROR");
        }
        order.setOrderStatus(OrderStatus.CANCELLED);
        order.setPaymentStatus(PaymentStatus.REFUNDED);
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() throws GlobalExceptionHandler {
        List<Order> orders = orderRepository.findAll();
        if (orders.isEmpty()) {
            throw new GlobalExceptionHandler("Không có đơn hàng nào", "ORDER_ERROR");
        }
        return orders;
    }

    @Override
    public void deleteOrder(Long orderId) throws GlobalExceptionHandler {
        Order order = findOrderById(orderId);
        if (order.getOrderStatus() != OrderStatus.CANCELLED) {
            throw new GlobalExceptionHandler("Chỉ có thể xóa đơn hàng đã hủy", "ORDER_ERROR");
        }
        orderRepository.delete(order);
    }
}
