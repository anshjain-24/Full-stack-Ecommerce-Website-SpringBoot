package com.elitebuy.service;

import com.elitebuy.model.User;

import com.elitebuy.Exception.*;

public interface UserService {
    public User findUserByID(Long userID) throws UserException;

    public User findUserProfileByJwt(String jwt) throws UserException;

}
