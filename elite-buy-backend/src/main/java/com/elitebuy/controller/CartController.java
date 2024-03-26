package com.elitebuy.controller;

import com.elitebuy.Exception.ProductException;
import com.elitebuy.Exception.UserException;
import com.elitebuy.Request.AddItemRequest;
import com.elitebuy.Response.ApiResponse;
import com.elitebuy.model.Cart;
import com.elitebuy.model.User;
import com.elitebuy.service.CartService;
import com.elitebuy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    @Autowired
    private CartService cartService;

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public ResponseEntity<Cart> findUserCart(@RequestHeader("Authorization") String jwt) throws UserException{

        User user = userService.findUserProfileByJwt(jwt);
        Cart cart = cartService.findUserCart(user.getId());

        return new ResponseEntity<Cart>(cart, HttpStatus.OK);
    }

    @PutMapping("/add")
    public ResponseEntity<ApiResponse> addItemToCart(@RequestBody AddItemRequest req,
                                                     @RequestHeader("Authorization") String jwt ) throws UserException, ProductException {
        User user = userService.findUserProfileByJwt(jwt);

        cartService.addCartItem(user.getId(), req);

        ApiResponse res = new ApiResponse();

        res.setMessage("item Added to cart");
        res.setStatus(true);

        return new ResponseEntity<>(res,HttpStatus.OK);

    }

}
