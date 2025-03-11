package com.ecommerce.service;

import com.ecommerce.enums.OrderStatus;
import com.ecommerce.enums.PaymentStatus;
import com.ecommerce.exception.OrderException;
import com.ecommerce.model.*;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.OrderRepository;
import org.springframework.stereotype.Service;

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
    public Order findOrderById(Long orderId) throws OrderException {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new OrderException("Không tìm thấy đơn hàng với ID: " + orderId));
    }

    @Override
    public List<Order> userOrderHistory(Long userId) throws OrderException {
        List<Order> orders = orderRepository.findByUserId(userId);
        if (orders.isEmpty()) {
            throw new OrderException("Không tìm thấy lịch sử đơn hàng cho người dùng: " + userId);
        }
        return orders;
    }

    @Override
    public Order placeOrder(Address address, User user) throws OrderException {
        Cart cart = cartRepository.findByUserId(user.getId());
        if (cart == null || cart.getCartItems().isEmpty()) {
            throw new OrderException("Giỏ hàng trống");
        }

        try {
            // Tính toán lại tổng giá trị giỏ hàng
            cart = cartService.findUserCart(user.getId());
            
            Order order = new Order();
            order.setUser(user);
            order.setOrderDate(LocalDateTime.now());
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
                    throw new OrderException("Sản phẩm " + product.getTitle() + " không đủ số lượng trong kho");
                }
                product.setQuantity(product.getQuantity() - item.getQuantity());
                productService.updateProduct(product.getId(), product);
            }

            // Xóa giỏ hàng
            cart.getCartItems().clear();
            cartRepository.save(cart);

            return orderRepository.save(order);
        } catch (Exception e) {
            throw new OrderException("Lỗi khi đặt hàng: " + e.getMessage());
        }
    }

    @Override
    public Order confirmedOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        if (order.getOrderStatus() != OrderStatus.PENDING) {
            throw new OrderException("Đơn hàng không thể xác nhận ở trạng thái hiện tại");
        }
        order.setOrderStatus(OrderStatus.CONFIRMED);
        return orderRepository.save(order);
    }

    @Override
    public Order shippedOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        if (order.getOrderStatus() != OrderStatus.CONFIRMED) {
            throw new OrderException("Đơn hàng phải được xác nhận trước khi gửi");
        }
        order.setOrderStatus(OrderStatus.SHIPPED);
        return orderRepository.save(order);
    }

    @Override
    public Order deliveredOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        if (order.getOrderStatus() != OrderStatus.SHIPPED) {
            throw new OrderException("Đơn hàng phải được gửi trước khi giao");
        }
        order.setOrderStatus(OrderStatus.DELIVERED);
        order.setPaymentStatus(PaymentStatus.COMPLETED);
        return orderRepository.save(order);
    }

    @Override
    public Order cancelOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        if (order.getOrderStatus() == OrderStatus.DELIVERED) {
            throw new OrderException("Không thể hủy đơn hàng đã giao");
        }
        order.setOrderStatus(OrderStatus.CANCELLED);
        order.setPaymentStatus(PaymentStatus.REFUNDED);
        return orderRepository.save(order);
    }

    @Override
    public List<Order> getAllOrders() throws OrderException {
        List<Order> orders = orderRepository.findAll();
        if (orders.isEmpty()) {
            throw new OrderException("Không có đơn hàng nào");
        }
        return orders;
    }

    @Override
    public void deleteOrder(Long orderId) throws OrderException {
        Order order = findOrderById(orderId);
        if (order.getOrderStatus() != OrderStatus.CANCELLED) {
            throw new OrderException("Chỉ có thể xóa đơn hàng đã hủy");
        }
        orderRepository.delete(order);
    }
}
