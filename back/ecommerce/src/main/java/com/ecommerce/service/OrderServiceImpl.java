package com.ecommerce.service;

import com.ecommerce.enums.OrderStatus;
import com.ecommerce.enums.PaymentStatus;
import com.ecommerce.exception.GlobalExceptionHandler;
import com.ecommerce.model.*;
import com.ecommerce.repository.CartRepository;
import com.ecommerce.repository.OrderRepository;
import com.ecommerce.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
public class OrderServiceImpl implements OrderService {

    private CartRepository cartRepository;
    private CartService cartService;
    private ProductService productService;
    private OrderRepository orderRepository;
    
    @Autowired
    private AddressRepository addressRepository;

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
    public Order placeOrder(Long addressId, User user) throws GlobalExceptionHandler {
        try {
            Cart cart = cartRepository.findByUserId(user.getId());
            if (cart == null || cart.getCartItems().isEmpty()) {
                throw new GlobalExceptionHandler("Giỏ hàng trống", "ORDER_ERROR");
            }
            Address originalAddress = user.getAddress().stream()
                    .filter(a -> a.getId()==addressId)
                    .findFirst()
                    .orElseThrow(() -> new GlobalExceptionHandler("Not found address", "ADDRESS_NOT_FOUND"));

            // Tính toán lại tổng giá trị giỏ hàng
            cart = cartService.findUserCart(user.getId());

            Order order = new Order();
            order.setUser(user);
            order.setOrderDate(LocalDateTime.now());

            // Tạo một bản sao HOÀN TOÀN MỚI của địa chỉ để tránh lỗi unique constraint
            Address shippingAddress = new Address();
            shippingAddress.setFirstName(originalAddress.getFirstName());
            shippingAddress.setLastName(originalAddress.getLastName());
            shippingAddress.setStreetAddress(originalAddress.getStreetAddress());
            shippingAddress.setCity(originalAddress.getCity());
            shippingAddress.setState(originalAddress.getState());
            shippingAddress.setZipCode(originalAddress.getZipCode());
            shippingAddress.setMobile(originalAddress.getMobile());
            shippingAddress.setUser(user);
            
            // Thêm một giá trị ngẫu nhiên cho đảm bảo tính duy nhất
            String uniqueSuffix = "-" + UUID.randomUUID().toString().substring(0, 8);
            shippingAddress.setStreetAddress(originalAddress.getStreetAddress() + uniqueSuffix);
            
            // Lưu địa chỉ mới vào cơ sở dữ liệu để có ID riêng
            Address savedAddress = addressRepository.save(shippingAddress);
            
            // Sử dụng địa chỉ đã lưu cho đơn hàng
            order.setShippingAddress(savedAddress);
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
        } catch (Exception e) {
            if (e instanceof GlobalExceptionHandler) {
                throw e;
            }
            throw new GlobalExceptionHandler("Lỗi khi tạo đơn hàng: " + e.getMessage(), "ORDER_ERROR");
        }
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
