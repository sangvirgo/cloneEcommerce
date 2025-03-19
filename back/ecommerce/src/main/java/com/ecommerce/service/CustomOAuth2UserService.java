package com.ecommerce.service;

import com.ecommerce.model.User;
import com.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.UUID;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    
    private static final Logger logger = LoggerFactory.getLogger(CustomOAuth2UserService.class);
    
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    
    @Autowired
    public CustomOAuth2UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        logger.debug("OAuth2UserRequest: {}", userRequest);
        OAuth2User oAuth2User = super.loadUser(userRequest);
        
        try {
            logger.debug("OAuth2User loaded successfully: {}", oAuth2User);
            return processOAuth2User(oAuth2User, userRequest);
        } catch (Exception ex) {
            logger.error("Error processing OAuth2User: {}", ex.getMessage(), ex);
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex);
        }
    }
    
    private OAuth2User processOAuth2User(OAuth2User oAuth2User, OAuth2UserRequest userRequest) {
        // Lấy email từ thông tin người dùng Google
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String picture = oAuth2User.getAttribute("picture");
        String providerId = oAuth2User.getAttribute("sub");
        
        if (email == null) {
            logger.error("Email không tìm thấy từ OAuth2 provider");
            throw new RuntimeException("Email không tìm thấy từ OAuth2 provider");
        }
        
        logger.debug("Processing OAuth2User with email: {}", email);
        
        // Kiểm tra xem người dùng đã tồn tại trong database chưa
        User user = userRepository.findByEmail(email);
        
        if (user == null) {
            logger.info("Creating new user from OAuth2 login with email: {}", email);
            
            // Tạo người dùng mới
            user = createUserFromOAuth2(email, name, picture, providerId, userRequest.getClientRegistration().getRegistrationId());
            
            // Lưu vào database
            user = userRepository.save(user);
            logger.info("New user created with ID: {}", user.getId());
        } else {
            logger.info("User already exists with email: {}", email);
            
            // Cập nhật thông tin OAuth2 nếu cần
            if (user.getOauthProvider() == null) {
                user.setOauthProvider(userRequest.getClientRegistration().getRegistrationId());
                user.setOauthProviderId(providerId);
                user.setImageUrl(picture);
                userRepository.save(user);
                logger.info("Updated OAuth2 information for existing user: {}", email);
            }
        }
        
        return oAuth2User;
    }
    
    private User createUserFromOAuth2(String email, String name, String picture, String providerId, String provider) {
        User user = new User();
        user.setEmail(email);
        
        // Xử lý tên đầy đủ thành firstName và lastName
        if (name != null) {
            String[] nameParts = name.split("\\s+");
            if (nameParts.length > 1) {
                user.setFirstName(nameParts[0]);
                user.setLastName(name.substring(nameParts[0].length()).trim());
            } else {
                user.setFirstName(name);
                user.setLastName("");
            }
        } else {
            user.setFirstName("User");
            user.setLastName(email.split("@")[0]);
        }
        
        // Tạo mật khẩu ngẫu nhiên (người dùng sẽ không dùng mật khẩu này vì đăng nhập qua OAuth2)
        String randomPassword = UUID.randomUUID().toString();
        user.setPassword(passwordEncoder.encode(randomPassword));
        
        // Đặt role mặc định là ROLE_CUSTOMER
        user.setRole("ROLE_CUSTOMER");
        
        // Lưu thông tin OAuth2
        user.setOauthProvider(provider);
        user.setOauthProviderId(providerId);
        user.setImageUrl(picture);
        
        return user;
    }
} 