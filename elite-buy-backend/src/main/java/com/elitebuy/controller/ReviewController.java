package com.elitebuy.controller;

import com.elitebuy.Exception.ProductException;
import com.elitebuy.Exception.UserException;
import com.elitebuy.Request.ReviewsRequest;
import com.elitebuy.model.Reviews;
import com.elitebuy.model.User;
import com.elitebuy.service.ReviewService;
import com.elitebuy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity<Reviews> createReview(@RequestBody ReviewsRequest req,
               @RequestHeader("Authorization") String jwt) throws UserException, ProductException{
        User user = userService.findUserProfileByJwt(jwt);
        Reviews reviews = reviewService.createReview(req,user);
        return new ResponseEntity<>(reviews, HttpStatus.CREATED);

    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Reviews>> getProductReview(@PathVariable Long productId) throws UserException,ProductException{
        List<Reviews> reviews = reviewService.getAllReview(productId);
        return new ResponseEntity<>(reviews,HttpStatus.CREATED);
    }

}
