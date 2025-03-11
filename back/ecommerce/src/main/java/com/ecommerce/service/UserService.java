package com.ecommerce.service;

import com.ecommerce.DTO.UserDTO;
import com.ecommerce.exception.UserException;
import com.ecommerce.model.User;

public interface UserService {

    public User findUserById(Long id) throws UserException;

    public UserDTO findUserProfileByJwt(String jwt) throws UserException;

    public User findUserByJwt(String jwt) throws UserException;
}
