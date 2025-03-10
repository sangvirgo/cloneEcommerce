package com.ecommerce.controller;

import com.ecommerce.DTO.CartDTO;
import com.ecommerce.exception.UserException;
import com.ecommerce.model.User;
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

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/profile")
    public ResponseEntity<UserProfileResponse> getUserProfile() {
        try {
            Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
            String email = authentication.getName();

            User user = userRepository.findByEmail(email);
            if (user == null) {
                throw new UserException("User not found", "USER_NOT_FOUND");
            }

            UserProfileResponse profileResponse = new UserProfileResponse();
            profileResponse.setId(user.getId());
            profileResponse.setEmail(user.getEmail());
            profileResponse.setFirstName(user.getFirstName());
            profileResponse.setLastName(user.getLastName());
            profileResponse.setMobile(user.getMobile());
            profileResponse.setRole(user.getRole());
            profileResponse.setAddress(user.getAddress());
            profileResponse.setPaymentInformation(user.getPaymentInformation());
            profileResponse.setRatings(user.getRatings());
            profileResponse.setCart(new CartDTO(user.getCart()));
            profileResponse.setCreatedAt(user.getCreatedAt());
            profileResponse.setOrders(user.getOrders());

            return new ResponseEntity<>(profileResponse, HttpStatus.OK);
        } catch (UserException e) {
            throw e;
        } catch (Exception e) {
            throw new UserException("Error fetching user profile", "PROFILE_ERROR");
        }
    }
}
