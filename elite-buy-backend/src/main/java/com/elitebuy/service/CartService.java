package com.elitebuy.service;

import com.elitebuy.Exception.ProductException;
import com.elitebuy.Request.AddItemRequest;
import com.elitebuy.model.*;

public interface CartService {

    public Cart createCart(User user);

    public String addCartItem(Long userId, AddItemRequest req) throws ProductException;

    public Cart findUserCart (Long userId);

}
