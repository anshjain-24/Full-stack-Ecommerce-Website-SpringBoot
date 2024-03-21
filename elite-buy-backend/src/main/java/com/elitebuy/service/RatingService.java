package com.elitebuy.service;

import com.elitebuy.Exception.ProductException;
import com.elitebuy.Request.RatingRequest;
import com.elitebuy.model.Rating;
import com.elitebuy.model.User;

import java.util.List;

public interface RatingService {

    public Rating createRating(RatingRequest req, User user) throws ProductException;
    public List<Rating> getProductRating (Long productId);

}
