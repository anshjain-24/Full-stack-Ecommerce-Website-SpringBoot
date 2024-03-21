package com.elitebuy.service;

import com.elitebuy.Exception.ProductException;
import com.elitebuy.Request.ReviewsRequest;
import com.elitebuy.model.Product;
import com.elitebuy.model.Reviews;
import com.elitebuy.model.User;
import com.elitebuy.repository.ProductRepository;
import com.elitebuy.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReviewsServiceImpl implements ReviewService{

    private ReviewRepository reviewRepository;
    private ProductService productService;
    private ProductRepository productRepository;

    public ReviewsServiceImpl(ReviewRepository reviewRepository, ProductService productService, ProductRepository productRepository) {
        this.reviewRepository = reviewRepository;
        this.productService = productService;
        this.productRepository = productRepository;
    }

    @Override
    public Reviews createReview(ReviewsRequest req, User user) throws ProductException {
        Product product = productService.findProductById(req.getProductId());

        Reviews reviews = new Reviews();
        reviews.setUser(user);
        reviews.setProduct(product);
        reviews.setReview(req.getReview());
        reviews.setCreatedAt(LocalDateTime.now());

        return reviewRepository.save(reviews);
    }

    @Override
    public List<Reviews> getAllReview(Long productId) {
        return reviewRepository.getAllProductsReview(productId);
    }
}
