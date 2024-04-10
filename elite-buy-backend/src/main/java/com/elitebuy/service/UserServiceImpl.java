package com.elitebuy.service;

import com.elitebuy.Exception.UserException;
import com.elitebuy.Repository.CartRepository;
import com.elitebuy.Repository.OrderRepository;
import com.elitebuy.configuration.JwtProvider;
import com.elitebuy.model.Order;
import com.elitebuy.model.User;
import com.elitebuy.Repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private UserRepository userRepository;

    @Autowired
    private CartRepository cartRepository;
    @Autowired
    private OrderRepository orderRepository;

    private JwtProvider jwtProvider;

    public UserServiceImpl(UserRepository userRepository, JwtProvider jwtProvider) {
        this.userRepository = userRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public User findUserByID(Long userID) throws UserException {
        Optional<User> user = userRepository.findById(userID);
        if(user.isPresent()){
            return user.get();
        }
        throw new UserException("User not found with this is : "+ userID);
    }


    @Override
    public User findUserProfileByJwt(String jwt) throws UserException {
        String email = jwtProvider.getEmailFromToken(jwt);
        User user = userRepository.findByEmail(email);

        if(user==null){
            throw new UserException("User not found with email : "+email);
        }
        return user;
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public void deleteUser(Long userId) throws UserException{
        User user = findUserByID(userId);
        cartRepository.deleteByUserId(userId);
        orderRepository.deleteByUserId(userId);
        userRepository.deleteById(userId);
    }
}
