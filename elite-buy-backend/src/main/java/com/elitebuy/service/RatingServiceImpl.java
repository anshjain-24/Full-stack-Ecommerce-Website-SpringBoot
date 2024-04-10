package com.elitebuy.service;

import com.elitebuy.Exception.ProductException;
import com.elitebuy.Request.RatingRequest;
import com.elitebuy.model.Product;
import com.elitebuy.model.Rating;
import com.elitebuy.model.User;
import com.elitebuy.Repository.RatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class RatingServiceImpl implements RatingService{

    @Autowired
    private RatingRepository ratingRepository;
    @Autowired
    private ProductService productService;

    public RatingServiceImpl(RatingRepository ratingRepository, ProductService productService) {
        this.ratingRepository = ratingRepository;
        this.productService = productService;
    }

    @Override
    public Rating createRating(RatingRequest req, User user) throws ProductException {
        Product product = productService.findProductById(req.getProductId());
        Rating rating = new Rating();
        rating.setProduct(product);
        rating.setRating(req.getRating());
        rating.setCreatedAt(LocalDateTime.now());
        rating.setUser(user);
        return ratingRepository.save(rating);
    }



    @Override
    public List<Rating> getProductRating(Long productId) {
        return ratingRepository.getAllProductRating(productId);
    }


    @Override
    public Double getRetingByUserByProduct(Long userId, Long productId) {
        Optional<Double> rating = ratingRepository.getRatingByUserAndProduct(userId, productId);
        return rating.orElse(null); // or throw an exception if needed
    }
}
