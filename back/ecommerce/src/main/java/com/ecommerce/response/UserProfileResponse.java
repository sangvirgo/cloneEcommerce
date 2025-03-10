package com.ecommerce.response;

import com.ecommerce.DTO.CartDTO;
import com.ecommerce.model.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class UserProfileResponse {
    private Long id;
    private String email;
    private String firstName;
    private String lastName;
    private String mobile;
    private String role;
    private List<Address> address;
    private List<Rating> ratings;
    private List<PaymentInformation> paymentInformation;
    private List<Order> orders;
    private List<Review> reviews;
    private CartDTO cart;
    private LocalDateTime createdAt;
}

