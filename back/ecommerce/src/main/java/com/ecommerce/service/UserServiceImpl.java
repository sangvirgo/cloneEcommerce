package com.ecommerce.service;

import com.ecommerce.DTO.UserDTO;
import com.ecommerce.config.JwtProvider;
import com.ecommerce.exception.GlobalExceptionHandler;
import com.ecommerce.model.User;
import com.ecommerce.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {
    private UserRepository userRepository;
    private JwtProvider jwtProvider;

    public UserServiceImpl(UserRepository userRepository, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public User findUserById(Long id) throws GlobalExceptionHandler {
        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            return user.get();
        }
        throw new GlobalExceptionHandler("User not found", "USER_NOT_FOUND");
    }

    @Override
    public UserDTO findUserProfileByJwt(String jwt) throws GlobalExceptionHandler {
        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7); // Remove "Bearer " prefix
        }
        String email = jwtProvider.getEmailFromToken(jwt);
        User user = userRepository.findByEmail(email);

        if(user == null) {
            throw new GlobalExceptionHandler("User not found " + email, "USER_NOT_FOUND");
        }
        return new UserDTO(user);
    }

    @Override
    public User findUserByJwt(String jwt) throws GlobalExceptionHandler {
        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7); // Remove "Bearer " prefix
        }
        String email = jwtProvider.getEmailFromToken(jwt);
        User user = userRepository.findByEmail(email);

        if(user == null) {
            throw new GlobalExceptionHandler("User not found " + email, "USER_NOT_FOUND");
        }
        return user;
    }
}
