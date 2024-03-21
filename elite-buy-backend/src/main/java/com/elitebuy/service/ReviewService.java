package com.elitebuy.service;

import com.elitebuy.Exception.ProductException;
import com.elitebuy.Request.ReviewsRequest;
import com.elitebuy.model.Reviews;
import com.elitebuy.model.User;

import java.util.List;

public interface ReviewService {

    public Reviews createReview(ReviewsRequest req, User user) throws ProductException;
    public List<Reviews> getAllReview(Long productId);

}
