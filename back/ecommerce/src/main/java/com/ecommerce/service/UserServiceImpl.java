package com.ecommerce.service;

import com.ecommerce.config.JwtProvider;
import com.ecommerce.exception.UserException;
import com.ecommerce.model.User;
import com.ecommerce.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserServiceImpl implements UserService{
    private UserRepository userRepository;
    private JwtProvider jwtProvider;

    public UserServiceImpl(UserRepository userRepository, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public User findUserById(Long id) throws UserException {

        Optional<User> user = userRepository.findById(id);
        if(user.isPresent()){
            return user.get();
        }
        throw new UserException("User not found", "404");
    }

    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        String email= jwtProvider.getEmailFromToken(jwt);
        User user = userRepository.findByEmail(email);

        if(user==null){
            throw new UserException("User not found "+ email, "404");
        }
        return user;
    }
}
