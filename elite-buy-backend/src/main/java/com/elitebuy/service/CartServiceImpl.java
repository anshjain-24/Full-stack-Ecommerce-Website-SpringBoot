package com.elitebuy.service;

import com.elitebuy.Exception.ProductException;
import com.elitebuy.Request.AddItemRequest;
import com.elitebuy.model.Cart;
import com.elitebuy.model.CartItem;
import com.elitebuy.model.Product;
import com.elitebuy.model.User;
import com.elitebuy.Repository.CartRepository;
import org.springframework.stereotype.Service;

@Service
public class CartServiceImpl implements CartService {


    private CartRepository cartRepository;
    private CartItemService cartItemService;

    private ProductService productService;

    public CartServiceImpl(CartRepository cartRepository, CartItemService cartItemService, ProductService productService) {
        this.cartRepository = cartRepository;
        this.cartItemService = cartItemService;
        this.productService = productService;
    }

    @Override
    public Cart createCart(User user) {

        Cart cart = new Cart();
        cart.setUser(user);

        return cartRepository.save(cart);
    }

    @Override
    public String addCartItem(Long userId, AddItemRequest req) throws ProductException {
        Cart cart = cartRepository.findByUserId(userId);
        Product product = productService.findProductById(req.getProductId());
        CartItem isPresent = cartItemService.isCartItemExist(cart, product, req.getSize(), userId);

        if (isPresent == null) {
            CartItem cartItem = new CartItem();
            cartItem.setProduct(product);
            cartItem.setCart(cart);
            System.out.println("req.getQuantity()   if prodcut is not in cart : "+req.getQuantity());
            cartItem.setQuantity(req.getQuantity()+1);
            cartItem.setUserId(userId);

            int price = req.getQuantity() * product.getDiscountedPrice();
            cartItem.setPrice(price);
            cartItem.setSize(req.getSize());

            CartItem createdCartItem = cartItemService.createCartItem(cartItem);
            cart.getCartItems().add(createdCartItem);

        } else {
            System.out.println("ispresent.getQuantity   if preduct is there : "+isPresent.getQuantity());
            //System.out.println("req.getQuantity()   if prodcut is in cart : "+req.getQuantity());
            isPresent.setQuantity(isPresent.getQuantity() + 1);
            System.out.println("after adding now,  : "+isPresent.getQuantity());
            try{
                cartItemService.updateItem(isPresent.getUserId(), isPresent.getId(), isPresent);
            }
            catch (Exception e){
                System.out.println(e);
            }
        }
        return "Item Added to Cart";
    }


    @Override
    public Cart findUserCart(Long userId) {

        Cart cart = cartRepository.findByUserId(userId);

        int totalPrice = 0;
        int totalDiscountedPrice = 0;
        int totalItem = 0;

        for (CartItem cartItem : cart.getCartItems()) {
            totalPrice = totalPrice + cartItem.getPrice();
            totalDiscountedPrice = totalDiscountedPrice + cartItem.getDiscountedPrice();
            totalItem = totalItem + cartItem.getQuantity();
        }

        cart.setTotalDiscountedPrice(totalDiscountedPrice);
        cart.setTotalItem(totalItem);
        cart.setTotalPrice(totalPrice);
        cart.setDiscount(totalPrice - totalDiscountedPrice);

        return cartRepository.save(cart);
    }
}
