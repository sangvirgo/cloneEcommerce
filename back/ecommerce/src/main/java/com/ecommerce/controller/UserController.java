package com.ecommerce.controller;

import com.ecommerce.DTO.*;
import com.ecommerce.exception.UserException;
import com.ecommerce.model.*;
import com.ecommerce.repository.UserRepository;
import com.ecommerce.response.UserProfileResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponse> getUserProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            if (authentication == null || authentication.getName() == null) {
                throw new UserException("Authentication failed", "AUTH_ERROR");
            }

            String email = authentication.getName();
            User user = userRepository.findByEmail(email);
            if (user == null) {
                throw new UserException("User not found", "USER_NOT_FOUND");
            }

            // Kiểm tra danh sách địa chỉ, nếu null thì tạo danh sách rỗng
            List<AddressDTO> addressDTOS = new ArrayList<>();
            if (user.getAddress() != null) {
                for (Address address : user.getAddress()) {
                    addressDTOS.add(new AddressDTO(address));
                }
            }

            // Kiểm tra danh sách đơn hàng
            List<OrderDTO> orderDTOS = new ArrayList<>();
            if (user.getOrders() != null) {
                for (Order order : user.getOrders()) {
                    orderDTOS.add(new OrderDTO(order));
                }
            }

            // Xử lý response
            UserProfileResponse profileResponse = new UserProfileResponse();
            profileResponse.setId(user.getId());
            profileResponse.setEmail(user.getEmail());
            profileResponse.setFirstName(user.getFirstName());
            profileResponse.setLastName(user.getLastName());
            profileResponse.setMobile(user.getMobile());
            profileResponse.setRole(user.getRole());
            profileResponse.setAddress(addressDTOS);
            profileResponse.setPaymentInformation(user.getPaymentInformation() != null ? user.getPaymentInformation() : new ArrayList<>());
            profileResponse.setRatings(user.getRatings() != null ? user.getRatings() : new ArrayList<>());
            profileResponse.setCart(user.getCart() != null ? new CartDTO(user.getCart()) : null);
            profileResponse.setCreatedAt(user.getCreatedAt());
            profileResponse.setOrders(orderDTOS);

            return ResponseEntity.ok(profileResponse);
        } catch (UserException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }


}
