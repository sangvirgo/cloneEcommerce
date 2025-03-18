package com.ecommerce.config;

import com.ecommerce.model.OAuth2UserInfo;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User user = super.loadUser(userRequest);
        
        // Lấy thông tin từ OAuth2 provider
        Map<String, Object> attributes = user.getAttributes();
        String provider = userRequest.getClientRegistration().getRegistrationId();
        
        OAuth2UserInfo userInfo = new OAuth2UserInfo(
            attributes.get("sub").toString(),
            attributes.get("name").toString(),
            attributes.get("email").toString(),
            attributes.get("picture").toString(),
            provider
        );
        
        // TODO: Lưu hoặc cập nhật thông tin người dùng vào database
        
        return user;
    }
} 