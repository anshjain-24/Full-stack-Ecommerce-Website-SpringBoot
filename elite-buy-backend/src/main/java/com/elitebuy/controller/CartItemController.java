package com.elitebuy.controller;

import com.elitebuy.Exception.CartItemException;
import com.elitebuy.Exception.UserException;
import com.elitebuy.Response.ApiResponse;
import com.elitebuy.model.CartItem;
import com.elitebuy.model.User;
import com.elitebuy.service.CartItemService;
import com.elitebuy.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart_item")
public class CartItemController {

    @Autowired
    private CartItemService cartItemService;

    @Autowired
    private UserService userService;

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<ApiResponse> deleteCartItem(@PathVariable Long cartItemId,
                @RequestHeader("Authorization") String jwt) throws UserException, CartItemException{

        User user = userService.findUserProfileByJwt(jwt);
        cartItemService.removeCartIem(user.getId(), cartItemId);

        ApiResponse res = new ApiResponse();
        res.setMessage("Item Removed from Cart");
        res.setStatus(true);

        return new ResponseEntity<>(res, HttpStatus.OK);
    }

    @PutMapping("/{cartItemId}")
    public ResponseEntity<CartItem> updateCartItem(
            @RequestBody CartItem cartItem,
            @PathVariable Long cartItemId,
            @RequestHeader("Authorization") String jwt
    ) throws UserException,CartItemException{
        User user = userService.findUserProfileByJwt(jwt);
        CartItem updatedCartItem = cartItemService.updateItem(user.getId(),cartItemId,cartItem);

        return new ResponseEntity<>(updatedCartItem,HttpStatus.OK);
    }

}