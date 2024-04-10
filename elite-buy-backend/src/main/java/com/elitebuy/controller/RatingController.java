package com.elitebuy.controller;

import com.elitebuy.Exception.ProductException;
import com.elitebuy.Exception.UserException;
import com.elitebuy.Request.RatingRequest;
import com.elitebuy.model.Rating;
import com.elitebuy.model.User;
import com.elitebuy.service.RatingService;
import com.elitebuy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rating")
public class RatingController {

    @Autowired
    private UserService userService;

    @Autowired
    private RatingService ratingService;

    @PostMapping("/create")
    public ResponseEntity<Rating> createRating(@RequestBody RatingRequest req,
                                               @RequestHeader("Authorization") String jwt) throws UserException, ProductException{
        User user = userService.findUserProfileByJwt(jwt);
        Rating rating = ratingService.createRating(req,user);
        return new ResponseEntity<Rating>(rating, HttpStatus.CREATED);
    }

    @GetMapping("/product/{productId}")
    public ResponseEntity<List<Rating>> getProductRating(@PathVariable Long productId,
                      @RequestHeader("Authorization") String jwt) throws UserException,ProductException{
        User user = userService.findUserProfileByJwt(jwt);
        List<Rating> ratings = ratingService.getProductRating(productId);

        return new ResponseEntity<>(ratings,HttpStatus.CREATED);
    }

    @GetMapping("/product-user/{productId}/{userId}")
    public ResponseEntity<Double> getProductRating(@PathVariable Long productId,
                                                        @PathVariable Long userId) throws UserException,ProductException{

        Double ratings = ratingService.getRetingByUserByProduct(userId,productId);

        return new ResponseEntity<>(ratings,HttpStatus.CREATED);
    }
}
