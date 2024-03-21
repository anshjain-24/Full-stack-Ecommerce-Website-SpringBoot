package com.elitebuy.service;

import com.elitebuy.Exception.CartItemException;
import com.elitebuy.Exception.UserException;
import com.elitebuy.model.Cart;
import com.elitebuy.model.CartItem;
import com.elitebuy.model.Product;

public interface CartItemService {

    public CartItem createCartItem(CartItem cartItem);

    public CartItem updateItem(Long userId,Long id, CartItem cartItem) throws CartItemException, UserException;

    public CartItem isCartItemExist(Cart cart, Product product, String size, Long userId);

    public void removeCartIem(Long userId, Long cartItemId) throws CartItemException,UserException;

    public  CartItem findCartItemById(Long cartItemId) throws CartItemException;

}
